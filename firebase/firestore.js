import { db } from "./config.js";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, where, orderBy, limit } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// Example: Get posts by category
export async function getPostsByCategory(mainCategory, subCategory) {
  const postsCol = collection(db, "posts");
  const q = query(postsCol, where("mainCategory", "==", mainCategory), where("subCategory", "==", subCategory), orderBy("timestamp", "desc"));
  const snapshot = await getDocs(q);
  const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return posts;
}

// Example: Add new post
export async function addPost(postData) {
  return await addDoc(collection(db, "posts"), postData);
}

// Example: Update post
export async function updatePost(postId, updatedData) {
  const postRef = doc(db, "posts", postId);
  await updateDoc(postRef, updatedData);
}

// Example: Delete post
export async function deletePost(postId) {
  const postRef = doc(db, "posts", postId);
  await deleteDoc(postRef);
}
