// assets/js/main.js

document.addEventListener("DOMContentLoaded", () => {

  // Utility to load HTML into a container
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

        if (selector === "#site-footer") {
          document.querySelectorAll(`${selector} a`).forEach(link => {
            link.addEventListener("click", () => {
              sessionStorage.setItem("scrollPos", window.scrollY);
            });
          });
        }
      }

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  // =====================
  // Load Navbar and Footer
  // =====================
  const navbarLoaded = loadHTML("components/navbar.html", "#site-navbar", true);
  const footerLoaded = loadHTML("components/footer.html", "#site-footer", true);

  // Restore scroll position
  const scrollPos = sessionStorage.getItem("scrollPos");
  if (scrollPos) {
    window.scrollTo(0, parseInt(scrollPos));
    sessionStorage.removeItem("scrollPos");
  }

  // =====================
  // Navbar & Search Functionality
  // =====================
  navbarLoaded.then(() => {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    const searchWrapper = document.querySelector(".search-wrapper");
    const searchInput = searchWrapper?.querySelector("input");
    const searchBtn = searchWrapper?.querySelector("button");

    // Hamburger toggle
    if (menuToggle && navLinks) {
      menuToggle.addEventListener("click", () => {
        menuToggle.classList.toggle("open");
        navLinks.classList.toggle("active");
      });
    }

    // Search toggle
    if (searchWrapper && searchInput && searchBtn) {
      searchBtn.addEventListener("click", () => {
        searchWrapper.classList.toggle("active");
        if (searchWrapper.classList.contains("active")) searchInput.focus();
      });

      // Enter key triggers search
      searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          const query = searchInput.value.trim();
          if (query) window.location.href = `/search.html?q=${encodeURIComponent(query)}`;
        }
      });
    }
  });

  // =====================
  // Load Post Cards
  // =====================
  const featuredContainer = document.getElementById("featured-posts-container");
  const latestContainer = document.getElementById("latest-posts-container");

  const loadPostCards = async (container, count) => {
    if (!container) return;
    for (let i = 0; i < count; i++) {
      const res = await fetch("components/post-card.html");
      const html = await res.text();
      container.insertAdjacentHTML("beforeend", html);
    }
  };

  loadPostCards(featuredContainer, 3); // Featured posts
  loadPostCards(latestContainer, 4);   // Latest posts

  // =====================
  // Load Sponsored Ads Carousel
  // =====================
  loadHTML("components/ad-carousel.html", "#ad-carousel-container").then(() => {
    const slides = document.querySelectorAll(".ad-slide");
    const prevBtn = document.querySelector(".ad-prev");
    const nextBtn = document.querySelector(".ad-next");
    let currentAd = 0;

    const showAd = (index) => {
      slides.forEach((slide, i) => slide.classList.toggle("active", i === index));
    };

    if (prevBtn && nextBtn && slides.length) {
      prevBtn.addEventListener("click", () => {
        currentAd = (currentAd - 1 + slides.length) % slides.length;
        showAd(currentAd);
      });
      nextBtn.addEventListener("click", () => {
        currentAd = (currentAd + 1) % slides.length;
        showAd(currentAd);
      });

      // Auto-slide every 5s
      setInterval(() => {
        currentAd = (currentAd + 1) % slides.length;
        showAd(currentAd);
      }, 5000);
    }
  });

  // =====================
  // Hero Slider
  // =====================
  const slides = document.querySelectorAll(".hero-slider .slide");
  const nextBtn = document.querySelector(".hero-slider .next");
  const prevBtn = document.querySelector(".hero-slider .prev");
  const slider = document.querySelector(".hero-slider");

  if (slides.length && nextBtn && prevBtn) {
    let currentSlide = 0;

    const showSlide = (index) => {
      slides.forEach((slide, i) => slide.classList.toggle("active", i === index));
    };

    nextBtn.addEventListener("click", () => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    });

    prevBtn.addEventListener("click", () => {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
    });

    let autoSlide = setInterval(() => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }, 5000);

    slider.addEventListener("mouseover", () => clearInterval(autoSlide));
    slider.addEventListener("mouseleave", () => {
      autoSlide = setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
      }, 5000);
    });
  }

});
