import { db } from "./config.js";
import { collection, addDoc, updateDoc, doc, increment } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// Track post view
export async function trackPostView(postId) {
  const docRef = doc(db, "analytics", postId);
  await updateDoc(docRef, { views: increment(1) }).catch(async () => {
    await addDoc(collection(db, "analytics"), { id: postId, views: 1 });
  });
}

// Track ad click
export async function trackAdClick(adId) {
  const docRef = doc(db, "analytics", adId);
  await updateDoc(docRef, { clicks: increment(1) }).catch(async () => {
    await addDoc(collection(db, "analytics"), { id: adId, clicks: 1 });
  });
}
