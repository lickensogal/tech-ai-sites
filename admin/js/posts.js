// Firebase references
const db = firebase.firestore();
const tbody = document.getElementById('posts-tbody');

// Fetch posts from Firestore
async function loadPosts() {
  const snapshot = await db.collection('posts').orderBy('publishDate', 'desc').get();
  tbody.innerHTML = '';
  snapshot.forEach(doc => {
    const post = doc.data();
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${post.title}</td>
      <td>${post.mainCategory}</td>
      <td>${post.subCategory}</td>
      <td>${post.featured ? 'Yes' : 'No'}</td>
      <td>${new Date(post.publishDate.seconds * 1000).toLocaleDateString()}</td>
      <td>
        <button class="action-btn edit-btn" data-id="${doc.id}">Edit</button>
        <button class="action-btn delete-btn" data-id="${doc.id}">Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
  attachPostEvents();
}

// Attach Edit/Delete events
function attachPostEvents() {
  // Delete post
  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('data-id');
      if(confirm('Are you sure you want to delete this post?')) {
        await db.collection('posts').doc(id).delete();
        loadPosts();
      }
    });
  });

  // Edit post
  document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      // Redirect to Add/Edit page with post ID
      window.location.href = `add-post.html?id=${id}`;
    });
  });
}

// Initial load
loadPosts();
