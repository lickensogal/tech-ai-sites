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
