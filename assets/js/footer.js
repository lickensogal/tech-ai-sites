// /assets/js/footer.js
async function loadFooter() {
  try {
    // Calculate correct base path depending on depth
    const pathParts = window.location.pathname.split("/").filter(Boolean);
    const depth = pathParts.length - 1;
    const basePath = "../".repeat(depth);

    // Load footer HTML
    const res = await fetch(basePath + "components/footer.html");
    if (!res.ok) throw new Error("Failed to load footer");
    const html = await res.text();

    // Insert footer
    const footer = document.getElementById("site-footer");
    if (footer) footer.innerHTML = html;

    // Fix relative links inside footer
    document.querySelectorAll("#site-footer a").forEach(link => {
      let href = link.getAttribute("href");
      if (href && href.startsWith("../")) {
        link.href = basePath + href.replace(/^(\.\.\/)+/, "");
      }
    });

    console.log("✅ Footer loaded successfully from:", basePath);
  } catch (err) {
    console.error("❌ Footer load failed:", err);
  }
}

document.addEventListener("DOMContentLoaded", loadFooter);
