import React, { useEffect } from "react";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

export default function TestFirestore() {
  useEffect(() => {
    const test = async () => {
      try {
        const snapshot = await getDocs(collection(db, "products"));
        console.log("✅ Firestore Connected. Docs:", snapshot.docs.length);
      } catch (error) {
        console.error("❌ Firestore Error:", error.message);
      }
    };
    test();
  }, []);

  return <div style={{ padding: "20px" }}>Testing Firestore...</div>;
}
