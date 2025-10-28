document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".menu-toggle"); // updated to match your HTML
  const navMenu = document.querySelector(".nav-links");
  const dropdownToggles = document.querySelectorAll(".dropdown > a");

  // Mobile menu toggle
  if (navToggle) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      navToggle.classList.toggle("open");
    });
  }

  // Dropdown toggle for mobile
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener("click", e => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        const dropdownMenu = toggle.nextElementSibling;
        dropdownMenu.classList.toggle("show");
      }
    });
  });

  // Sticky header effect
  window.addEventListener("scroll", () => {
    const header = document.querySelector("header") || document.querySelector(".navbar");
    if (header) {
      header.classList.toggle("sticky", window.scrollY > 50);
    }
  });

  // Global search functionality
  const searchWrapper = document.getElementById("search-wrapper");
  const searchToggle = document.getElementById("search-toggle");
  const searchInput = searchWrapper ? searchWrapper.querySelector("input") : null;

  if (searchToggle && searchWrapper && searchInput) {
    // Toggle search input visibility
    searchToggle.addEventListener("click", () => {
      searchWrapper.classList.toggle("active");
      if (searchWrapper.classList.contains("active")) searchInput.focus();
    });

    // Redirect to search results on Enter
    searchInput.addEventListener("keypress", e => {
      if (e.key === "Enter") {
        const query = searchInput.value.trim();
        if (query) {
          window.location.href = `/search.html?q=${encodeURIComponent(query)}`;
        }
      }
    });
  }
});
