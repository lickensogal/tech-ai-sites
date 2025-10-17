// assets/js/main.js

document.addEventListener("DOMContentLoaded", () => {
  // Utility to load HTML into an element and fix relative paths if needed
  const loadHTML = async (url, selector, fixLinks = false) => {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Failed to load ${url}`);
      const html = await res.text();
      document.querySelector(selector).innerHTML = html;

      // Fix relative links dynamically for navbar or footer
      if (fixLinks) {
        const pathParts = window.location.pathname.split("/").filter(Boolean);
        const basePath = pathParts.length > 1 ? "../".repeat(pathParts.length - 1) : "";

        document.querySelectorAll(`${selector} a`).forEach(link => {
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

  // Load navbar and footer with link fixes
  loadHTML("components/navbar.html", "#site-navbar", true);
  loadHTML("components/footer.html", "#site-footer", true);

  // Load post-cards for featured and latest posts
  const featuredContainer = document.getElementById("featured-posts-container");
  const latestContainer = document.getElementById("latest-posts-container");

  const loadPostCards = async (container, count) => {
    for (let i = 0; i < count; i++) {
      const res = await fetch("components/post-card.html");
      const html = await res.text();
      container.insertAdjacentHTML("beforeend", html);
    }
  };

  loadPostCards(featuredContainer, 3); // Featured posts
  loadPostCards(latestContainer, 4);   // Latest posts

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

    slider.addEventListener("mouseover", () => clearInterval(autoSlide));
    slider.addEventListener("mouseleave", () => {
      autoSlide = setInterval(nextSlide, 5000);
    });

    console.log("✅ Hero Slider initialized successfully");
  }
});
