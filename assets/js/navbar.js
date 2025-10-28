document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const dropdownToggles = document.querySelectorAll(".dropdown > a");
  const searchWrapper = document.querySelector(".search-wrapper");
  const input = searchWrapper?.querySelector("input");
  const button = searchWrapper?.querySelector("button");

  // --- Mobile Menu Toggle ---
  navToggle?.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    navToggle.classList.toggle("open");
  });

  // --- Dropdown Toggle on Mobile ---
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener("click", e => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        const dropdownMenu = toggle.nextElementSibling;
        dropdownMenu.classList.toggle("show");
      }
    });
  });

  // --- Search Expand / Collapse ---
  button?.addEventListener("click", () => {
    searchWrapper.classList.toggle("active");
    if (searchWrapper.classList.contains("active")) input.focus();
  });

  input?.addEventListener("keypress", e => {
    if (e.key === "Enter") {
      const query = input.value.trim();
      if (query) window.location.href = `/search.html?q=${encodeURIComponent(query)}`;
    }
  });

  // --- Close mobile menu if clicked outside ---
  document.addEventListener("click", e => {
    if (
      window.innerWidth <= 768 &&
      !navLinks.contains(e.target) &&
      !navToggle.contains(e.target)
    ) {
      navLinks.classList.remove("active");
      navToggle.classList.remove("open");
      dropdownToggles.forEach(toggle => {
        toggle.nextElementSibling.classList.remove("show");
      });
    }
  });
});
