// assets/js/navbar.js
document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const dropdownToggles = document.querySelectorAll(".dropdown > a");
  const searchWrappers = document.querySelectorAll(".search-wrapper");
  const header = document.querySelector(".navbar");

  // --- Mobile Menu Toggle ---
  if (navToggle) {
    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      navToggle.classList.toggle("open");
    });
  }

  // --- Dropdown toggle on mobile ---
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener("click", e => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        const dropdownMenu = toggle.nextElementSibling;
        dropdownMenu.classList.toggle("show");
      }
    });
  });

  // --- Sticky Navbar on scroll ---
  window.addEventListener("scroll", () => {
    if (header) {
      header.classList.toggle("scrolled", window.scrollY > 50);
    }
  });

  // --- Search Expand / Collapse ---
  searchWrappers.forEach(wrapper => {
    const input = wrapper.querySelector("input");
    const button = wrapper.querySelector("button");

    button.addEventListener("click", () => {
      wrapper.classList.toggle("active");
      if (wrapper.classList.contains("active")) {
        input.focus();
      }
    });

    // Trigger search on Enter key
    input.addEventListener("keypress", e => {
      if (e.key === "Enter") {
        const query = input.value.trim();
        if (query) {
          window.location.href = `/search.html?q=${encodeURIComponent(query)}`;
        }
      }
    });
  });

  // --- Global Search Button Click ---
  searchWrappers.forEach(wrapper => {
    const input = wrapper.querySelector("input");
    const button = wrapper.querySelector("button");

    button.addEventListener("click", () => {
      const query = input.value.trim();
      if (query) {
        window.location.href = `/search.html?q=${encodeURIComponent(query)}`;
      }
    });
  });
});
