// assets/js/hero-slider.js

document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slide");
  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");
  const slider = document.querySelector(".hero-slider");

  // Exit safely if no slides found
  if (!slides.length || !nextBtn || !prevBtn) return;

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

  // Event listeners for navigation buttons
  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);

  // Auto-slide every 5 seconds
  let autoSlide = setInterval(nextSlide, 5000);

  // Pause when hovered
  if (slider) {
    slider.addEventListener("mouseover", () => clearInterval(autoSlide));
    slider.addEventListener("mouseleave", () => {
      autoSlide = setInterval(nextSlide, 5000);
    });
  }

  console.log("✅ Hero Slider initialized successfully");
});
