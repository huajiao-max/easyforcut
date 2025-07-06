import { useNuxtApp } from '#app'
import {
  collection,
  doc,
  runTransaction,
  getDoc,
  updateDoc,
  setDoc,
} from "firebase/firestore";

export const updateUserPoints = async (userId, delta) => {
  if (!userId) {
    throw new Error("User ID cannot be empty");
  }
  if (typeof delta !== "number" || !Number.isFinite(delta)) {
    console.error("Invalid delta value:", delta);
    throw new Error("Delta must be a valid number");
  }
  const { $firebase } = useNuxtApp();
  const db = $firebase.db;
  const userRef = doc(collection(db, "users"), userId);
  await runTransaction(db, async (transaction) => {
    const userDoc = await getDoc(userRef);
    if (!userDoc.exists) throw new Error("User not found");
    let currentPoints = userDoc.data().points || 0;
    if (typeof currentPoints !== "number") {
      console.warn(
        `User ${userId} has non-numeric points: ${currentPoints}. Treating as 0.`
      );
      currentPoints = 0;
    }
    const newPoints = currentPoints + delta;
    if (newPoints < 0) throw new Error("Insufficient points");
    await transaction.update(userRef, {
      points: newPoints,
      lastUpdated: new Date(),
    });
  });
};

export const initUserPoints = async (dataId, userId) => {
  if (!userId) {
    throw new Error("User ID cannot be empty");
  }
  const { $firebase } = useNuxtApp();
  const db = $firebase.db;
  const userRef = doc(collection(db, "users"), dataId);
  await setDoc(
    userRef,
    {
      points: 10,
      isVip: 1001,
      createdAt: new Date(),
      userId: userId,
    },
    { merge: true }
  );
};
