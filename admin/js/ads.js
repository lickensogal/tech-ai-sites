const db = firebase.firestore();
const adsTableBody = document.getElementById("adsTableBody");
const carouselTrack = document.getElementById("carouselTrack");

// Fetch ads from Firestore
async function loadAds() {
  const snapshot = await db.collection('ads').orderBy('duration', 'desc').get();
  adsTableBody.innerHTML = "";
  carouselTrack.innerHTML = "";
  const ads = [];

  snapshot.forEach((doc, index) => {
    const ad = doc.data();
    ad.id = doc.id; // store doc ID
    ads.push(ad);

    // Table row
    const row = `
      <tr>
        <td>${index + 1}</td>
        <td><img src="${ad.image}" alt="Ad" class="ad-thumb"></td>
        <td><a href="${ad.link}" target="_blank">${ad.link}</a></td>
        <td>${ad.duration}s</td>
        <td>${ad.status}</td>
        <td>
          <button class="edit-btn" data-id="${ad.id}">Edit</button>
          <button class="delete-btn" data-id="${ad.id}">Delete</button>
        </td>
      </tr>
    `;
    adsTableBody.innerHTML += row;

    // Carousel
    const adSlide = document.createElement("div");
    adSlide.classList.add("carousel-item");
    adSlide.innerHTML = `<a href="${ad.link}" target="_blank"><img src="${ad.image}" alt="Sponsored Ad"></a>`;
    carouselTrack.appendChild(adSlide);
  });

  attachAdEvents();
}

// Attach Edit/Delete buttons
function attachAdEvents() {
  document.querySelectorAll(".edit-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      // Redirect to Add/Edit Ad page or modal
      window.location.href = `add-ad.html?id=${id}`;
    });
  });

  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", async () => {
      const id = btn.getAttribute("data-id");
      if(confirm("Are you sure you want to delete this ad?")) {
        await db.collection('ads').doc(id).delete();
        loadAds();
      }
    });
  });
}

// Carousel logic
let currentAd = 0;
function showAd(index) {
  const totalAds = carouselTrack.children.length;
  if(totalAds === 0) return;
  currentAd = (index + totalAds) % totalAds;
  carouselTrack.style.transform = `translateX(-${currentAd * 100}%)`;
}

document.getElementById("prevAd").addEventListener("click", () => showAd(currentAd - 1));
document.getElementById("nextAd").addEventListener("click", () => showAd(currentAd + 1));

// Auto rotation
let autoRotate = setInterval(() => showAd(currentAd + 1), 5000);
document.getElementById("adCarousel").addEventListener("mouseover", () => clearInterval(autoRotate));
document.getElementById("adCarousel").addEventListener("mouseleave", () => {
  autoRotate = setInterval(() => showAd(currentAd + 1), 5000);
});

// Add new ad
document.getElementById("addAdBtn").addEventListener("click", () => {
  window.location.href = "add-ad.html";
});

// Initial load
loadAds();
