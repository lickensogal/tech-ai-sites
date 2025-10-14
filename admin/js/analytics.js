const db = firebase.firestore();

const totalVisitsEl = document.getElementById("totalVisits");
const uniqueVisitorsEl = document.getElementById("uniqueVisitors");
const sessionTimeEl = document.getElementById("sessionTime");
const topPageEl = document.getElementById("topPage");

const trafficCtx = document.getElementById("trafficChart").getContext("2d");
const categoryCtx = document.getElementById("categoryChart").getContext("2d");

let trafficChart, categoryChart;

// Fetch analytics data from Firestore
async function loadAnalytics() {
  // Example: visits collection has documents {date: "YYYY-MM-DD", visits: Number, unique: Number, sessionTime: Number, topPage: String}
  const visitsSnapshot = await db.collection('visits').orderBy('date', 'desc').limit(7).get();
  
  const visits = [];
  const labels = [];
  let totalVisits = 0;
  let totalUnique = 0;
  let totalSession = 0;
  let topPage = "N/A";

  visitsSnapshot.forEach(doc => {
    const data = doc.data();
    labels.unshift(data.date);
    visits.unshift(data.visits);
    totalVisits += data.visits;
    totalUnique += data.unique || 0;
    totalSession += data.sessionTime || 0;
    topPage = data.topPage || topPage;
  });

  totalVisitsEl.textContent = totalVisits.toLocaleString();
  uniqueVisitorsEl.textContent = totalUnique.toLocaleString();
  sessionTimeEl.textContent = (totalSession / visitsSnapshot.size).toFixed(1) + " mins";
  topPageEl.textContent = topPage;

  // Render traffic line chart
  if (trafficChart) trafficChart.destroy();
  trafficChart = new Chart(trafficCtx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [{
        label: "Visits",
        data: visits,
        borderColor: "#4f46e5",
        backgroundColor: "rgba(79, 70, 229, 0.1)",
        fill: true,
        tension: 0.3,
        borderWidth: 2
      }]
    },
    options: { responsive: true, maintainAspectRatio: false }
  });

  // Example: category analytics collection {category: String, count: Number}
  const categorySnapshot = await db.collection('categoryAnalytics').get();
  const categories = [];
  const categoryData = [];
  const colors = ["#4f46e5","#22c55e","#f59e0b","#ef4444","#3b82f6"];

  categorySnapshot.forEach(doc => {
    const data = doc.data();
    categories.push(data.category);
    categoryData.push(data.count);
  });

  if (categoryChart) categoryChart.destroy();
  categoryChart = new Chart(categoryCtx, {
    type: "pie",
    data: {
      labels: categories,
      datasets: [{ data: categoryData, backgroundColor: colors }]
    },
    options: { responsive: true, maintainAspectRatio: false }
  });
}

// Initial load
loadAnalytics();
