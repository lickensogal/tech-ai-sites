// assets/js/main.js

document.addEventListener("DOMContentLoaded", () => {
  // Utility to load HTML into an element
  const loadHTML = async (url, selector) => {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Failed to load ${url}`);
      const html = await res.text();
      document.querySelector(selector).innerHTML = html;

      // If this is the footer, fix relative links
      if (selector === "#site-footer") {
        const pathParts = window.location.pathname.split("/").filter(Boolean);
        const basePath = pathParts.length > 1 ? "../".repeat(pathParts.length - 1) : "";

        document.querySelectorAll("#site-footer a").forEach(link => {
          let href = link.getAttribute("href");
          if (href.startsWith("../")) {
            link.href = basePath + href.replace(/^(\.\.\/)+/, "");
          }
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Load navbar and footer
  loadHTML("components/navbar.html", "#site-navbar");
  loadHTML("components/footer.html", "#site-footer");

  // Load post-cards for featured posts
  const featuredContainer = document.getElementById("featured-posts-container");
  const latestContainer = document.getElementById("latest-posts-container");

  const postCount = 3; // Featured posts
  const latestCount = 4; // Latest posts

  const loadPostCards = async (container, count) => {
    for (let i = 0; i < count; i++) {
      const res = await fetch("components/post-card.html");
      const html = await res.text();
      container.insertAdjacentHTML("beforeend", html);
    }
  };

  loadPostCards(featuredContainer, postCount);
  loadPostCards(latestContainer, latestCount);

  // Load ad carousel
  loadHTML("components/ad-carousel.html", "#ad-carousel-container");

  // === Hero Slider ===
  const slides = document.querySelectorAll(".slide");
  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");
  const slider = document.querySelector(".hero-slider");

  if (slides.length && nextBtn && prevBtn) {
    let currentSlide = 0;

    const nextSlide = () => {
      slides[currentSlide].classList.remove("active");
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add("active");
    };

    const prevSlide = () => {
      slides[currentSlide].classList.remove("active");
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      slides[currentSlide].classList.add("active");
    };

    nextBtn.addEventListener("click", nextSlide);
    prevBtn.addEventListener("click", prevSlide);

    let autoSlide = setInterval(nextSlide, 5000);

    if (slider) {
      slider.addEventListener("mouseover", () => clearInterval(autoSlide));
      slider.addEventListener("mouseleave", () => {
        autoSlide = setInterval(nextSlide, 5000);
      });
    }

    console.log("✅ Hero Slider initialized successfully");
  }
});
