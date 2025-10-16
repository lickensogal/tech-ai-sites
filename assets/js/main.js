// assets/js/main.js

document.addEventListener("DOMContentLoaded", () => {
  // Helper to load HTML components
  async function loadComponent(selector, url) {
    const container = document.querySelector(selector);
    if (!container) return;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Failed to load ${url}`);
      const html = await res.text();
      container.innerHTML = html;
    } catch (err) {
      console.error(err);
    }
  }

  // Load navbar and footer
  loadComponent("header", "/components/navbar.html");
  loadComponent("footer", "/components/footer.html");

  // =======================
  // Hero Slider Initialization
  // =======================
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

    // Auto-slide every 5s
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
