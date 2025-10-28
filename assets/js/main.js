// assets/js/main.js

document.addEventListener("DOMContentLoaded", () => {
  // Utility to load HTML into an element
  const loadHTML = async (url, selector, fixLinks = false) => {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Failed to load ${url}`);
      const html = await res.text();
      document.querySelector(selector).innerHTML = html;

      if (fixLinks) {
        const pathParts = window.location.pathname.split("/").filter(Boolean);
        const basePath = pathParts.length > 1 ? "../".repeat(pathParts.length - 1) : "";

        document.querySelectorAll(`${selector} a`).forEach(link => {
          let href = link.getAttribute("href");
          if (href.startsWith("../")) {
            link.href = basePath + href.replace(/^(\.\.\/)+/, "");
          }
        });

        // Remember scroll position when clicking footer links
        if (selector === "#site-footer") {
          document.querySelectorAll(`${selector} a`).forEach(link => {
            link.addEventListener("click", () => {
              sessionStorage.setItem("scrollPos", window.scrollY);
            });
          });
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Load navbar and footer with link fixing
  loadHTML("components/navbar.html", "#site-navbar", true);
  loadHTML("components/footer.html", "#site-footer", true);

  // Restore scroll position after page load
  const scrollPos = sessionStorage.getItem("scrollPos");
  if (scrollPos) {
    window.scrollTo(0, parseInt(scrollPos));
    sessionStorage.removeItem("scrollPos");
  }

  // Load post-cards for featured and latest posts
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

  if (featuredContainer) loadPostCards(featuredContainer, postCount);
  if (latestContainer) loadPostCards(latestContainer, latestCount);

  // Load ad carousel
  loadHTML("components/ad-carousel.html", "#ad-carousel-container");

  // Hero Slider
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

  // === Global Search Handler ===
  const handleSearch = () => {
    const searchWrappers = document.querySelectorAll(".search-wrapper");
    searchWrappers.forEach(wrapper => {
      const input = wrapper.querySelector("input");
      const button = wrapper.querySelector("button");

      if (button && input) {
        const performSearch = () => {
          const query = input.value.trim();
          if (query) {
            window.location.href = `/search.html?q=${encodeURIComponent(query)}`;
          }
        };

        button.addEventListener("click", performSearch);
        input.addEventListener("keypress", (e) => {
          if (e.key === "Enter") performSearch();
        });
      }
    });
  };

  // Delay search init to ensure navbar is loaded dynamically
  setTimeout(handleSearch, 500);
});
