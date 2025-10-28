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

  // Load navbar and footer
  loadHTML("components/navbar.html", "#site-navbar", true);
  loadHTML("components/footer.html", "#site-footer", true);

  // Restore scroll position
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

  loadPostCards(featuredContainer, postCount);
  loadPostCards(latestContainer, latestCount);

  // Load Sponsored Ads Carousel dynamically
  const adContainer = document.getElementById("ad-carousel-container");
  if (adContainer) {
    fetch("components/ad-carousel.html")
      .then(res => res.text())
      .then(html => {
        adContainer.innerHTML = html;

        // Initialize ad carousel
        const slides = adContainer.querySelectorAll(".ad-slide");
        const prevBtn = adContainer.querySelector(".ad-prev");
        const nextBtn = adContainer.querySelector(".ad-next");
        let currentIndex = 0;

        const showSlide = index => {
          slides.forEach((slide, i) => slide.classList.toggle("active", i === index));
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
      })
      .catch(err => console.error("Failed to load ad carousel:", err));
  }

  // Hero Slider
  const slides = document.querySelectorAll(".hero-slider .slide");
  const nextBtn = document.querySelector(".hero-slider .next");
  const prevBtn = document.querySelector(".hero-slider .prev");

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

    const slider = document.querySelector(".hero-slider");
    slider.addEventListener("mouseover", () => clearInterval(autoSlide));
    slider.addEventListener("mouseleave", () => { autoSlide = setInterval(nextSlide, 5000); });
  }

  // Search Handler
  const handleSearch = () => {
    document.querySelectorAll(".search-wrapper").forEach(wrapper => {
      const input = wrapper.querySelector("input");
      const button = wrapper.querySelector("button");

      if (button && input) {
        button.addEventListener("click", () => {
          const query = input.value.trim();
          if (query) window.location.href = `/search.html?q=${encodeURIComponent(query)}`;
        });

        input.addEventListener("keypress", e => {
          if (e.key === "Enter") {
            const query = input.value.trim();
            if (query) window.location.href = `/search.html?q=${encodeURIComponent(query)}`;
          }
        });
      }
    });
  };
  setTimeout(handleSearch, 500);
});
