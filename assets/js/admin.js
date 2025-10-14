// === Sidebar Toggle (Mobile Responsive) ===
const sidebar = document.querySelector(".admin-sidebar");
const toggleBtn = document.createElement("button");
toggleBtn.classList.add("sidebar-toggle");
toggleBtn.innerHTML = "☰";
document.body.insertBefore(toggleBtn, document.body.firstChild);

toggleBtn.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});

// === Highlight Active Menu ===
const links = document.querySelectorAll(".admin-sidebar a");
links.forEach(link => {
  if (link.href === window.location.href) {
    link.classList.add("active");
  } else {
    link.classList.remove("active");
  }
});

// === Reusable Admin Toast ===
function showToast(message, type = "success") {
  const toast = document.createElement("div");
  toast.className = `admin-toast ${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}
