// src/App.jsx
import React, { useState, useEffect } from "react";
import {
  ShoppingBag,
  X,
  ChevronDown,
  MessageCircle,
  Plus,
  Minus,
  Trash,
} from "lucide-react";
import logo from "./assets/everythinskin_logo-removebg-preview.png";
import TestFirestore from "./TestFirestore";
import useProducts from "./hooks/useProducts";
import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


// ✅ MAIN APP
export default function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [dropdown, setDropdown] = useState(null);
  const [promoIndex, setPromoIndex] = useState(0);
  const [isAdmin] = useState(window.location.pathname === "/admin");

  // 🔒 Admin auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const ADMIN_PASS = "vicky0923!"; // change this anytime

  const { products, loading, error } = useProducts();

  const categories = [
    "New In",
    "Brands",
    "Skincare",
    "Buy African Skincare",
    "Viral Skincare",
    "Sale",
    "FAQs",
  ];

  const dropdownContent = {
    Brands: [
      "The Ordinary",
      "COSRX",
      "CeraVe",
      "La Roche-Posay",
      "Beauty of Joseon",
      "African Botanics",
    ],
    "Viral Skincare": [
      "Glass Skin Starter Kit",
      "24k Gold Peel Mask",
      "Glow Kit",
      "Melanin Revive Cream",
    ],
  };

  const promos = [
    "✨ 30% OFF This Week — Nourish Your Glow ✨",
    "🌿 Free Delivery on Orders Over ₦20,000",
    "💧 New Hydration Kits for Every Skin Type",
  ];

  // === Auto cycle promos ===
  useEffect(() => {
    const interval = setInterval(() => {
      setPromoIndex((p) => (p + 1) % promos.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // === Cart Logic ===
  const addToCart = (product) => {
    const existing = cartItems.find((i) => i.id === product.id);
    if (existing) {
      setCartItems(
        cartItems.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
    setCartOpen(true);
  };

  const updateQty = (id, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const cartSubtotal = cartItems.reduce((s, it) => s + it.price * it.qty, 0);

  // === 🔒 Admin Authentication ===
  if (isAdmin && !isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-[#fff8f0] text-[#3b2f2f]">
        <h2 className="text-2xl font-semibold mb-4">🔒 Admin Access</h2>
        <input
          type="password"
          placeholder="Enter Admin Password"
          value={adminPassword}
          onChange={(e) => setAdminPassword(e.target.value)}
          className="border px-4 py-2 rounded mb-4 w-64 text-center"
        />
        <button
          onClick={() =>
            adminPassword === ADMIN_PASS
              ? setIsAuthenticated(true)
              : alert("Incorrect password")
          }
          className="bg-[#a67b5b] text-white px-4 py-2 rounded-full"
        >
          Login
        </button>
      </div>
    );
  }

  // === Load Admin Panel After Login ===
  if (isAdmin && isAuthenticated) {
    return <AdminPanel />;
  }

  // === Storefront Views ===
  if (loading)
    return (
      <div className="flex h-screen items-center justify-center text-[#3b2f2f]">
        ⏳ Loading products...
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col h-screen items-center justify-center text-[#3b2f2f]">
        <h2 className="text-xl font-semibold mb-2">⚠️ Error Loading Products</h2>
        <p>{error.message || "Something went wrong fetching data."}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 bg-[#a67b5b] text-white px-4 py-2 rounded-full"
        >
          Retry
        </button>
      </div>
    );

  const safeProducts = products && products.length > 0 ? products : [];

  return (
    <div className="min-h-screen bg-white text-[#3b2f2f] font-sans overflow-x-hidden relative">
      {/* === Header === */}
      <header className="flex flex-wrap justify-between items-center px-8 py-6 border-b border-[#d2b48c]/40 bg-white sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <img
            src={logo}
            alt="Everything SkinFood"
            className="h-20 w-auto mx-auto transition-transform duration-500 hover:scale-105"
          />
          <h1 className="text-2xl font-bold text-[#7a5c3d]">Everythingskinfood</h1>
        </div>

        <nav className="hidden md:flex gap-8 text-sm uppercase tracking-wide relative">
          {categories.map((cat) => (
            <div
              key={cat}
              className="relative group"
              onMouseEnter={() => setDropdown(cat)}
              onMouseLeave={() => setDropdown(null)}
            >
              <a
                href={`#${cat.replace(/\s+/g, "").toLowerCase()}`}
                className="hover:text-[#a67b5b] flex items-center gap-1 transition"
              >
                {cat}
                {(cat === "Brands" || cat === "Viral Skincare") && (
                  <ChevronDown className="w-4 h-4" />
                )}
              </a>
              {(cat === "Brands" || cat === "Viral Skincare") &&
                dropdown === cat && (
                  <div className="absolute top-6 left-0 bg-white border border-[#d2b48c]/30 shadow-lg rounded-xl mt-2 py-2 w-52 z-50">
                    {dropdownContent[cat].map((item, i) => (
                      <a
                        key={i}
                        href="#"
                        className="block px-4 py-2 text-[#3b2f2f] hover:bg-[#fff8f0] hover:text-[#a67b5b]"
                      >
                        {item}
                      </a>
                    ))}
                  </div>
                )}
            </div>
          ))}
        </nav>

        <button
          onClick={() => setCartOpen(!cartOpen)}
          className="relative hover:text-[#a67b5b]"
        >
          <ShoppingBag className="w-6 h-6" />
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#a67b5b] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {cartItems.length}
            </span>
          )}
        </button>
      </header>

      {/* === Hero Section === */}
      <section className="text-center py-16 px-6 bg-gradient-to-b from-[#fff8f0] to-white">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-[#3b2f2f]">
          Nourish Your Skin Like Royalty
        </h2>
        <p className="text-[#5a4a42] max-w-2xl mx-auto mb-8">
          Feed your skin with the luxury and richness it deserves — from African botanicals to world-class skincare.
        </p>
        <button className="bg-[#a67b5b] text-white font-semibold px-6 py-3 rounded-full hover:bg-[#8b5e3c] transition">
          Shop Now
        </button>
      </section>

      {/* === Product Display === */}
      {["New In", "Skincare", "Buy African Skincare", "Viral Skincare", "Sale"].map(
        (section) => (
          <section key={section} id={section.replace(/\s+/g, "").toLowerCase()} className="px-8 py-16 bg-white">
            <h3 className="text-2xl font-semibold mb-6 text-[#3b2f2f]">{section}</h3>
            {safeProducts.filter((p) => p.category === section).length === 0 ? (
              <p>No products available in this category yet.</p>
            ) : (
              <div className="grid md:grid-cols-3 gap-8">
                {safeProducts
                  .filter((p) => p.category === section)
                  .map((p) => (
                    <div key={p.id} className="bg-white p-4 rounded-3xl relative hover:-translate-y-1 hover:shadow-lg transition">
                      {p.badge && (
                        <div className="absolute top-3 right-3 bg-[#a67b5b] text-white text-xs px-2 py-1 rounded">
                          {p.badge}
                        </div>
                      )}
                      <img src={p.image} alt={p.name} className="w-full h-64 object-cover rounded-2xl mb-4" loading="lazy" />
                      <h3 className="text-xl font-semibold">{p.name}</h3>
                      <p className="text-[#5a4a42] text-sm mb-2">{p.brand}</p>
                      <p className="text-lg font-bold mb-4">₦{p.price?.toLocaleString?.() ?? "—"}</p>
                      <button onClick={() => addToCart(p)} className="bg-[#a67b5b] px-4 py-2 rounded-full text-sm text-white hover:bg-[#8b5e3c]">
                        Add to Cart
                      </button>
                    </div>
                  ))}
              </div>
            )}
          </section>
        )
      )}

      {/* === Cart Drawer === */}
      {cartOpen && (
        <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-2xl z-50 flex flex-col">
          <div className="flex justify-between items-center p-4 border-b border-[#d2b48c]/40">
            <h3 className="font-semibold text-lg">Your Cart</h3>
            <X className="cursor-pointer" onClick={() => setCartOpen(false)} />
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cartItems.length === 0 ? (
              <p className="text-sm text-gray-500">Your cart is empty.</p>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3 border-b pb-2">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">{item.name}</h4>
                    <p className="text-xs text-gray-500">₦{item.price}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <button onClick={() => updateQty(item.id, -1)}>
                        <Minus className="w-4 h-4" />
                      </button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateQty(item.id, 1)}>
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <X onClick={() => removeFromCart(item.id)} className="cursor-pointer w-4 h-4" />
                </div>
              ))
            )}
          </div>
          <div className="p-4 border-t border-[#d2b48c]/40">
            <p className="font-semibold mb-2">Subtotal: ₦{cartSubtotal.toLocaleString()}</p>
            <button className="w-full bg-[#a67b5b] text-white py-2 rounded-full hover:bg-[#8b5e3c]">
              Checkout
            </button>
          </div>
        </div>
      )}

      {/* === Footer === */}
      <footer className="bg-[#fff8f0] text-[#3b2f2f] py-10 text-center border-t border-[#d2b48c]/30">
        <p className="text-sm mb-2">© {new Date().getFullYear()} Everythingskinfood</p>
        <p className="text-xs">Skincare inspired by nature. Powered by science. Designed for melanin.</p>
      </footer>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/2348012345678"
        className="fixed bottom-24 right-4 bg-[#25D366] text-white p-3 rounded-full shadow-lg wa-pulse"
        target="_blank"
        rel="noopener noreferrer"
      >
        <MessageCircle className="w-6 h-6" />
      </a>

      {/* Promo Strip */}
      <div className="fixed bottom-0 w-full bg-white text-[#7a5c3d] border-t border-[#d2b48c]/40 py-2 text-center text-sm font-medium animate-fade">
        {promos[promoIndex]}
      </div>

      <TestFirestore />
    </div>
  );
}

/* ========== ADMIN PANEL ========== */
function AdminPanel() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    brand: "",
    price: "",
    category: "Skincare",
    image: "",
    stock: "", // new stock field
  });

  const loadProducts = async () => {
    const snapshot = await getDocs(collection(db, "products"));
    setProducts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  const addProduct = async () => {
    await addDoc(collection(db, "products"), {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock) || 0,
    });
    setForm({
      name: "",
      brand: "",
      price: "",
      category: "Skincare",
      image: "",
      stock: "",
    });
    loadProducts();
  };

  const updateProduct = async (id, updatedData) => {
    const docRef = doc(db, "products", id);
    await updateDoc(docRef, updatedData);
    loadProducts();
  };

  const removeProduct = async (id) => {
    await deleteDoc(doc(db, "products", id));
    loadProducts();
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="p-8 bg-white min-h-screen text-[#3b2f2f]">
      <h2 className="text-3xl font-bold mb-6">🛠 Admin Dashboard</h2>

      {/* === Add New Product Form === */}
      <div className="grid gap-4 mb-8 md:grid-cols-2 lg:grid-cols-3">
        {["name", "brand", "price", "image", "stock"].map((key) => (
          <input
            key={key}
            type={key === "price" || key === "stock" ? "number" : "text"}
            value={form[key]}
            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
            className="border p-2 rounded w-full"
          />
        ))}

        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="border p-2 rounded w-full"
        >
          <option>Skincare</option>
          <option>Buy African Skincare</option>
          <option>Viral Skincare</option>
          <option>Sale</option>
          <option>New In</option>
        </select>

        <button
          onClick={addProduct}
          className="bg-[#a67b5b] text-white px-6 py-2 rounded hover:bg-[#8b5e3c]"
        >
          ➕ Add Product
        </button>
      </div>

      {/* === Product List === */}
      <div className="grid md:grid-cols-3 gap-4">
        {products.map((p) => (
          <EditableProductCard
            key={p.id}
            product={p}
            onDelete={() => removeProduct(p.id)}
            onSave={(data) => updateProduct(p.id, data)}
          />
        ))}
      </div>
    </div>
  );
}

/* === Editable Product Card === */
function EditableProductCard({ product, onDelete, onSave }) {
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState(product);

  return (
    <div className="border rounded-xl p-4 shadow relative">
      {editMode ? (
        <>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border p-1 w-full rounded mb-1"
            placeholder="Name"
          />
          <input
            type="text"
            value={form.brand}
            onChange={(e) => setForm({ ...form, brand: e.target.value })}
            className="border p-1 w-full rounded mb-1"
            placeholder="Brand"
          />
          <input
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="border p-1 w-full rounded mb-1"
            placeholder="Price"
          />
          <input
            type="text"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            className="border p-1 w-full rounded mb-1"
            placeholder="Image URL"
          />
          <input
            type="number"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
            className="border p-1 w-full rounded mb-1"
            placeholder="Stock level"
          />
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="border p-1 rounded mb-1 w-full"
          >
            <option>Skincare</option>
            <option>Buy African Skincare</option>
            <option>Viral Skincare</option>
            <option>Sale</option>
            <option>New In</option>
          </select>

          <div className="flex justify-between mt-2">
            <button
              onClick={() => {
                onSave(form);
                setEditMode(false);
              }}
              className="bg-green-600 text-white px-3 py-1 rounded"
            >
              Save
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="bg-gray-400 text-white px-3 py-1 rounded"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <img
            src={product.image}
            alt={product.name}
            className="h-40 w-full object-cover rounded mb-2"
          />
          <h4 className="font-semibold">{product.name}</h4>
          <p className="text-sm">{product.brand}</p>
          <p className="font-bold">₦{product.price}</p>
          <p className="text-sm">Stock: {product.stock ?? 0}</p>

          <div className="flex gap-2 mt-3">
            <button
              onClick={() => setEditMode(true)}
              className="bg-[#a67b5b] text-white px-3 py-1 rounded"
            >
              Edit
            </button>
            <button
              onClick={onDelete}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}
