const db = firebase.firestore();

document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Fetch total posts
    const postsSnapshot = await db.collection('posts').get();
    const totalPosts = postsSnapshot.size;

    // Fetch total ads
    const adsSnapshot = await db.collection('ads').get();
    const totalAds = adsSnapshot.size;

    // Fetch total subscribers
    const subscribersSnapshot = await db.collection('subscribers').get();
    const totalSubscribers = subscribersSnapshot.size;

    // Fetch total visitors (example: from a 'visits' collection)
    const visitsSnapshot = await db.collection('visits').get();
    let totalVisitors = 0;
    visitsSnapshot.forEach(doc => {
      const data = doc.data();
      totalVisitors += data.visits || 0;
    });

    // Update dashboard
    document.getElementById('total-posts').textContent = totalPosts;
    document.getElementById('total-ads').textContent = totalAds;
    document.getElementById('total-visitors').textContent = totalVisitors;
    document.getElementById('total-subscribers').textContent = totalSubscribers;

  } catch (error) {
    console.error("Error fetching dashboard data:", error);
  }
});
