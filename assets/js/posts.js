// assets/js/posts.js
import { getData } from "../../firebase/firestore.js";
import { logPageView } from "../../firebase/analytics.js";

document.addEventListener("DOMContentLoaded", async () => {
  logPageView("Posts Page");

  const postsContainer = document.querySelector(".posts-container");
  const category = document.body.dataset.category; // set in each category page

  try {
    const posts = await getData("posts");
    const filtered = posts.filter(p => p.category === category);
    const sorted = filtered.sort((a, b) => b.date - a.date);

    renderPosts(sorted);
  } catch (error) {
    console.error("Error loading posts:", error);
  }
});

function renderPosts(posts) {
  const container = document.querySelector(".posts-container");
  if (!container) return;

  container.innerHTML = posts
    .map(
      post => `
      <article class="post-card">
        <img src="${post.thumbnail}" alt="${post.title}" class="post-thumb">
        <div class="post-info">
          <h3>${post.title}</h3>
          <p>${post.excerpt || post.content.slice(0, 150)}...</p>
          <a href="/pages/post.html?id=${post.id}" class="read-more">Continue Reading →</a>
        </div>
      </article>
    `
    )
    .join("");
               }
