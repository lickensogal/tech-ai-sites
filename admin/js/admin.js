// ===== Admin Login & Page Protection =====

// Predefined admin credentials
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123"; // Change to a strong password

// Check if current page is login page
const isLoginPage = window.location.pathname.includes("login.html");

// ===== LOGIN PAGE HANDLER =====
if (isLoginPage) {
  const loginForm = document.getElementById("login-form");
  const errorMsg = document.getElementById("login-error");

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const termsChecked = document.getElementById("terms").checked;

    if (!termsChecked) {
      errorMsg.textContent = "You must agree to the Terms of Service.";
      return;
    }

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // Set session storage to allow access
      sessionStorage.setItem("adminAuth", "true");
      window.location.href = "index.html"; // Redirect to dashboard
    } else {
      errorMsg.textContent = "Invalid username or password.";
    }
  });
}

// ===== ADMIN PAGE PROTECTION =====
if (!isLoginPage) {
  if (sessionStorage.getItem("adminAuth") !== "true") {
    window.location.href = "login.html"; // redirect to login if not authorized
  }
}

// ===== LOGOUT FUNCTION =====
function adminLogout() {
  sessionStorage.removeItem("adminAuth");
  window.location.href = "login.html";
}

// Optional: if you have a logout button
const logoutBtn = document.getElementById("logout-btn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", adminLogout);
}
