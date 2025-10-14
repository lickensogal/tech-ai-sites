const db = firebase.firestore();
const tbody = document.getElementById("subscribersList");

// Fetch subscribers from Firestore
async function fetchSubscribers() {
  tbody.innerHTML = "";
  try {
    const snapshot = await db.collection('subscribers').orderBy('date', 'desc').get();
    snapshot.forEach((doc, index) => {
      const sub = doc.data();
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${sub.email}</td>
        <td>${sub.date}</td>
        <td>
          <button class="delete-btn" data-id="${doc.id}">Delete</button>
        </td>
      `;
      tbody.appendChild(row);
    });
  } catch (error) {
    console.error("Error fetching subscribers:", error);
  }
}

fetchSubscribers();

// Delete subscriber from Firestore
document.addEventListener("click", async (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const id = e.target.getAttribute("data-id");
    try {
      await db.collection('subscribers').doc(id).delete();
      e.target.closest("tr").remove();
      alert("Subscriber deleted successfully.");
    } catch (error) {
      console.error("Error deleting subscriber:", error);
      alert("Failed to delete subscriber.");
    }
  }
});

// Search subscribers (client-side)
document.getElementById("searchInput").addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  const rows = document.querySelectorAll("#subscribersList tr");
  rows.forEach(row => {
    row.style.display = row.innerText.toLowerCase().includes(value) ? "" : "none";
  });
});

// Export subscribers to CSV
document.getElementById("exportCSV").addEventListener("click", async () => {
  try {
    const snapshot = await db.collection('subscribers').get();
    const data = snapshot.docs.map(doc => doc.data());
    const csvContent = "data:text/csv;charset=utf-8," +
      ["Email,Date Subscribed", ...data.map(s => `${s.email},${s.date}`)].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "subscribers.csv");
    document.body.appendChild(link);
    link.click();
  } catch (error) {
    console.error("Error exporting CSV:", error);
  }
});
