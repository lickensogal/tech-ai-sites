// Sponsored Ads Carousel
let adSlides = document.querySelectorAll('.ad-slide');
let currentAd = 0;
let adInterval;

// Function to show a slide
const showAd = (index) => {
  adSlides.forEach(slide => slide.classList.remove('active'));
  adSlides[index].classList.add('active');
};

// Next/Prev Functions
const nextAd = () => {
  currentAd = (currentAd + 1) % adSlides.length;
  showAd(currentAd);
};

const prevAd = () => {
  currentAd = (currentAd - 1 + adSlides.length) % adSlides.length;
  showAd(currentAd);
};

// Event Listeners
document.querySelector('.ad-next').addEventListener('click', nextAd);
document.querySelector('.ad-prev').addEventListener('click', prevAd);

// Auto slide every 7 seconds
adInterval = setInterval(nextAd, 7000);
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".ad-slide");
  const prevBtn = document.querySelector(".ad-prev");
  const nextBtn = document.querySelector(".ad-next");
  let currentIndex = 0;

  const showSlide = index => {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });
  };

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  });

  // Auto-slide every 5 seconds
  setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }, 5000);
});

// Pause on hover
const carousel = document.querySelector('.ad-carousel');
carousel.addEventListener('mouseenter', () => clearInterval(adInterval));
carousel.addEventListener('mouseleave', () => adInterval = setInterval(nextAd, 7000));

// Analytics: Track clicks
adSlides.forEach(slide => {
  slide.querySelector('a').addEventListener('click', () => {
    console.log('Ad clicked:', slide.querySelector('img').alt);
    // You can send this data to Firebase analytics
  });
});

