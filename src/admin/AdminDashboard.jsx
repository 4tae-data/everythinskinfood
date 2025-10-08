import React, { useState } from "react";
import ManageProducts from "./ManageProducts";
import ManagePromos from "./ManagePromos";

export default function AdminDashboard() {
  const [tab, setTab] = useState("products");

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <nav className="flex gap-4 mb-6 border-b pb-2">
        <button onClick={() => setTab("products")} className={`${tab==="products" ? "font-bold text-brown-700" : ""}`}>Products</button>
        <button onClick={() => setTab("promos")} className={`${tab==="promos" ? "font-bold text-brown-700" : ""}`}>Promotions</button>
      </nav>

      {tab === "products" && <ManageProducts />}
      {tab === "promos" && <ManagePromos />}
    </div>
  );
}
