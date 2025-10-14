const db = firebase.firestore();
const categoriesList = document.getElementById('categories-list');

// Fetch categories from Firebase
async function fetchCategories() {
  categoriesList.innerHTML = '';
  try {
    const snapshot = await db.collection('categories').get();
    snapshot.forEach(doc => {
      const cat = doc.data();
      const div = document.createElement('div');
      div.classList.add('category-card');
      div.innerHTML = `
        <h3>${cat.mainCategory} 
          <button class="edit-btn" onclick="editMainCategory('${doc.id}')">Edit</button>
          <button class="delete-btn" onclick="deleteMainCategory('${doc.id}')">Delete</button>
        </h3>
        <ul>
          ${cat.subCategories.map((sub, subIndex) => `
            <li>${sub} 
              <button class="edit-btn" onclick="editSubCategory('${doc.id}', ${subIndex})">Edit</button>
              <button class="delete-btn" onclick="deleteSubCategory('${doc.id}', ${subIndex})">Delete</button>
            </li>
          `).join('')}
        </ul>
        <button class="add-btn" onclick="addSubCategory('${doc.id}')">+ Add Subcategory</button>
      `;
      categoriesList.appendChild(div);
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
}

fetchCategories();

// Example CRUD operations (replace alerts with modal/form and Firestore updates)
function editMainCategory(id) { alert('Edit Main Category ID: ' + id); }
function deleteMainCategory(id) { alert('Delete Main Category ID: ' + id); }
function addSubCategory(id) { alert('Add Subcategory under Main Category ID: ' + id); }
function editSubCategory(id, subIndex) { alert('Edit Subcategory index ' + subIndex + ' in Main Category ID: ' + id); }
function deleteSubCategory(id, subIndex) { alert('Delete Subcategory index ' + subIndex + ' in Main Category ID: ' + id); }

document.getElementById('addMainCategoryBtn').addEventListener('click', () => {
  alert('Add new Main Category');
});
