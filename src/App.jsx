// src/App.jsx
import React, { useState, useEffect } from "react";
import {
  ShoppingBag,
  X,
  ChevronDown,
  MessageCircle,
  Plus,
  Minus,
} from "lucide-react";
// Put your logo at src/assets/everythinskin_logo-removebg-preview.png
import logo from "./assets/everythinskin_logo-removebg-preview.png";

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [dropdown, setDropdown] = useState(null); // which header menu is open
  const [promoIndex, setPromoIndex] = useState(0);

  // --- Expanded product catalog (15 items) ---
  const products = [
    // New In
    {
      id: 1,
      name: "Glow Serum — Vitamin C Booster",
      category: "New In",
      brand: "The Ordinary",
      price: 12000,
      image:
        "https://m.media-amazon.com/images/I/61P6VWuWfUL._SL1500_.jpg",
    },
    {
      id: 2,
      name: "Hydra Hyaluronic Serum",
      category: "New In",
      brand: "COSRX",
      price: 14000,
      image:
        "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/81/7544292/1.jpg?4791",
    },
    {
      id: 3,
      name: "Radiance Niacinamide Serum",
      category: "New In",
      brand: "Ordinary",
      price: 9000,
      image:
        "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/30/7192814/1.jpg?6243",
    },

    // Skincare (general)
    {
      id: 4,
      name: "Gentle Foaming Cleanser",
      category: "Skincare",
      brand: "CeraVe",
      price: 6000,
      image:
        "https://www.cerave.com/-/media/project/loreal/brand-sites/cerave/americas/us/skincare/cleansers/foaming-facial-cleanser/photos/foaming-facial-cleanser_front.jpg?rev=10cd9e2cc8374aa1b2621d87f938c0ed&w=900&hash=9595AD39EE5E93048874004E4272393D",
    },
    {
      id: 5,
      name: "Ginseng Essence Water",
      category: "Skincare",
      brand: "Beauty of Joseon",
      price: 7500,
      image:
        "https://m.media-amazon.com/images/I/61SFmCEx9qL._AC_SX679_.jpg",
    },
    {
      id: 6,
      name: "Retinol Night Repair Serum",
      category: "Skincare",
      brand: "La Roche-Posay",
      price: 18000,
      image:
        "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/75/3556852/1.jpg?6404",
    },

    // Buy African Skincare
    {
      id: 7,
      name: "African Shea Elixir",
      category: "Buy African Skincare",
      brand: "African Botanics",
      price: 9500,
      image:
        "https://m.media-amazon.com/images/I/51uGs20m79L._SX679_.jpg",
    },
    {
      id: 8,
      name: "Baobab & Shea butter",
      category: "Buy African Skincare",
      brand: "Skin Gourmet",
      price: 7200,
      image:
        "https://skingourmet.com/wp-content/uploads/2024/11/Baobab-and-shea-456x684.png",
    },
    {
      id: 9,
      name: "Shea Body Oil",
      category: "Buy African Skincare",
      brand: "R&R Luxury",
      price: 11000,
      image:
        "https://randrskincare.co/cdn/shop/files/SereneSheaBodyOilcopy.png?v=1727448607&width=360",
    },

    // Viral Skincare
    {
      id: 10,
      name: "Glass Skin Starter Kit",
      category: "Viral Skincare",
      brand: "InstaGlow",
      price: 22000,
      image:
        "https://www.peachandlily.com/cdn/shop/files/Image_1_12.jpg?v=1747822299&width=1200",
      badge: "Bestseller",
    },
    {
      id: 11,
      name: "24k Gold Peel Mask",
      category: "Viral Skincare",
      brand: "GoldGlow",
      price: 15000,
      image:
        "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/26/9678214/1.jpg?1933",
      badge: "30% OFF",
      salePercent: 30,
    },

    // Sale items
    {
      id: 12,
      name: "Vitamin C Brightening Serum",
      category: "Sale",
      brand: "BrightLab",
      price: 9000,
      image:
        "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/20/4137204/1.jpg?0230",
      badge: "30% OFF",
      salePercent: 30,
    },
    {
      id: 13,
      name: "Moisture Boost Daily Sun Gel SPF50",
      category: "Sale",
      brand: "SunGuard",
      price: 6500,
      image:
        "https://www.sukkati.com/cdn/shop/files/Sunscreen_1.jpg?v=1746077929&width=960",
      badge: "Limited Offer",
    },

    // Extra products to fill catalog
    {
      id: 14,
      name: "Ceramide Moisturizing Cream",
      category: "Skincare",
      brand: "CeraVe",
      price: 8000,
      image:
        "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/52/5322722/1.jpg?9256",
    },
    {
      id: 15,
      name: "Niacinamide + Zinc Treatment",
      category: "Skincare",
      brand: "Ordinary",
      price: 7000,
      image:
        "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/09/3225814/1.jpg?3383",
    },
  ];

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

  // animations used
  const animationStyles = {
    fadeUp: {
      animation: "fadeUp 550ms ease both",
    },
  };

  // promos for bottom ticker
  const promos = [
    "✨ 30% OFF This Week — Nourish Your Glow ✨",
    "🌿 Free Delivery on Orders Over ₦20,000",
    "💧 New Hydration Kits for Every Skin Type",
  ];

  // promo cycling
  useEffect(() => {
    const interval = setInterval(() => {
      setPromoIndex((p) => (p + 1) % promos.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // cart helpers (add, update qty, remove)
  const addToCart = (product) => {
    const existing = cartItems.find((i) => i.id === product.id);
    if (existing) {
      setCartItems(
        cartItems.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i))
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

  // compute cart totals
  const cartSubtotal = cartItems.reduce((s, it) => s + it.price * it.qty, 0);

  return (
    <div className="min-h-screen bg-white text-[#3b2f2f] font-sans overflow-x-hidden relative">
      {/* small CSS injection for keyframes & reduced-motion */}
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(10px);} to { opacity:1; transform: translateY(0);} }
        @keyframes promoFade { 0%{opacity:0; transform: translateY(6px);} 10%{opacity:1; transform:translateY(0);} 90%{opacity:1;} 100%{opacity:0; transform:translateY(-6px);} }
        @keyframes pulse { 0%{transform:scale(1);opacity:1;}50%{transform:scale(1.06);opacity:0.85;}100%{transform:scale(1);opacity:1;} }
        .promo-fade { animation: promoFade 4s ease-in-out infinite; }
        .wa-pulse { animation: pulse 2.4s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .promo-fade, .wa-pulse { animation: none !important; }
        }
      `}</style>

      {/* Header */}
      <header className="flex flex-wrap justify-between items-center px-8 py-6 border-b border-[#d2b48c]/40 bg-white sticky top-0 z-50">
        <div className="flex items-center gap-4">
        <img
          src={logo}
          alt="Everything SkinFood"
          className="h-30 w-auto mx-auto transition-transform duration-500 hover:scale-105"
/>

          <div>
            <h1 className="text-2xl font-bold tracking-small text-[#7a5c3d]">
              Everythingskinfood
            </h1>
            <div className="text-xs text-[#5a4a42]"></div>
          </div>
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

              {/* Dropdown (desktop hover) */}
              {(cat === "Brands" || cat === "Viral Skincare") && dropdown === cat && (
                <div className="absolute top-6 left-0 bg-white border border-[#d2b48c]/30 shadow-lg rounded-xl mt-2 py-2 w-52 z-50">
                  {dropdownContent[cat].map((item, i) => (
                    <a
                      key={i}
                      href="#"
                      className="block px-4 py-2 text-[#3b2f2f] hover:bg-[#fff8f0] hover:text-[#a67b5b] transition"
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
          className="relative hover:text-[#a67b5b] transition"
          aria-label="Open cart"
        >
          <ShoppingBag className="w-6 h-6" />
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#a67b5b] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {cartItems.length}
            </span>
          )}
        </button>
      </header>

      {/* Hero */}
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

      {/* New In (horizontal) */}
      <section id="newin" className="px-6 py-12">
        <h3 className="text-2xl font-semibold mb-6 text-[#3b2f2f]">New In</h3>
        <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar">
          {products.filter(p => p.category === "New In").map((product) => (
            <div key={product.id} className="min-w-[250px] bg-white p-4 rounded-2xl transform transition-transform duration-200 ease-out hover:-translate-y-1 hover:shadow-lg will-change-transform" style={animationStyles.fadeUp}>
              <div className="relative">
                <img src={product.image} alt={product.name} className="w-full h-56 object-cover rounded-xl mb-3" loading="lazy" />
                {/* example promo badge on new items */}
                <div className="absolute top-3 left-3 bg-[#a67b5b] text-white text-xs px-2 py-1 rounded">{product.salePercent ? `${product.salePercent}% OFF` : ""}</div>
              </div>
              <h4 className="font-medium text-[#3b2f2f]">{product.name}</h4>
              <p className="text-[#5a4a42] text-sm">{product.brand}</p>
              <p className="font-semibold mt-2 text-[#3b2f2f]">₦{product.price.toLocaleString()}</p>
              <button onClick={() => addToCart(product)} className="bg-[#a67b5b] w-full mt-3 py-2 rounded-full text-sm font-medium text-white hover:bg-[#8b5e3c] transition">Add to Cart</button>
            </div>
          ))}
        </div>
      </section>

      {/* Skincare grid */}
      <section id="skincare" className="px-8 py-16 bg-white">
        <h3 className="text-2xl font-semibold mb-6 text-[#3b2f2f]">Skincare</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {products.filter(p => p.category === "Skincare").map(p => (
            <div key={p.id} className="bg-white p-4 rounded-3xl transition-transform duration-200 ease-out hover:-translate-y-1 hover:shadow-lg will-change-transform">
              <img src={p.image} alt={p.name} className="w-full h-64 object-cover rounded-2xl mb-4" loading="lazy" />
              <h3 className="text-xl font-semibold text-[#3b2f2f]">{p.name}</h3>
              <p className="text-[#5a4a42] text-sm mb-2">{p.brand}</p>
              <p className="text-lg font-bold mb-4 text-[#3b2f2f]">₦{p.price.toLocaleString()}</p>
              <button onClick={() => addToCart(p)} className="bg-[#a67b5b] px-4 py-2 rounded-full text-sm font-medium text-white hover:bg-[#8b5e3c]">Add to Cart</button>
            </div>
          ))}
        </div>
      </section>

      {/* Buy African Skincare */}
      <section id="buyafricanskincare" className="px-8 py-16 bg-white">
        <h3 className="text-2xl font-semibold mb-6 text-[#3b2f2f]">Buy African Skincare</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {products.filter(p => p.category === "Buy African Skincare").map(p => (
            <div key={p.id} className="bg-white p-4 rounded-3xl transition-transform duration-200 ease-out hover:-translate-y-1 hover:shadow-lg will-change-transform">
              <img src={p.image} alt={p.name} className="w-full h-64 object-cover rounded-2xl mb-4" loading="lazy" />
              <h3 className="text-xl font-semibold text-[#3b2f2f]">{p.name}</h3>
              <p className="text-[#5a4a42] text-sm mb-2">{p.brand}</p>
              <p className="text-lg font-bold mb-4 text-[#3b2f2f]">₦{p.price.toLocaleString()}</p>
              <button onClick={() => addToCart(p)} className="bg-[#a67b5b] px-4 py-2 rounded-full text-sm font-medium text-white hover:bg-[#8b5e3c]">Add to Cart</button>
            </div>
          ))}
        </div>
      </section>

      {/* Viral Skincare */}
      <section id="viralskincare" className="px-8 py-16 bg-white">
        <h3 className="text-2xl font-semibold mb-6 text-[#3b2f2f]">Viral Skincare</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {products.filter(p => p.category === "Viral Skincare").map(p => (
            <div key={p.id} className="bg-white p-4 rounded-3xl relative transition-transform duration-200 ease-out hover:-translate-y-1 hover:shadow-lg will-change-transform">
              {p.badge && <div className="absolute top-3 right-3 bg-[#a67b5b] text-white text-xs px-2 py-1 rounded">{p.badge}</div>}
              <img src={p.image} alt={p.name} className="w-full h-64 object-cover rounded-2xl mb-4" loading="lazy" />
              <h3 className="text-xl font-semibold text-[#3b2f2f]">{p.name}</h3>
              <p className="text-[#5a4a42] text-sm mb-2">{p.brand}</p>
              <p className="text-lg font-bold mb-4 text-[#3b2f2f]">
                {p.salePercent ? `₦${Math.round(p.price * (1 - p.salePercent / 100)).toLocaleString()} ` : `₦${p.price.toLocaleString()}`}
                {p.salePercent && <span className="text-sm line-through text-[#5a4a42] ml-2">₦{p.price.toLocaleString()}</span>}
              </p>
              <button onClick={() => addToCart(p)} className="bg-[#a67b5b] px-4 py-2 rounded-full text-sm font-medium text-white hover:bg-[#8b5e3c]">Add to Cart</button>
            </div>
          ))}
        </div>
      </section>

      {/* Sale */}
      <section id="sale" className="px-8 py-16 bg-white">
        <h3 className="text-2xl font-semibold mb-6 text-[#3b2f2f]">Sale</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {products.filter(p => p.category === "Sale" || p.badge === "30% OFF").map((p, idx) => (
            <div key={p.id} className="bg-white p-4 rounded-3xl relative transition-transform duration-200 ease-out hover:-translate-y-1 hover:shadow-lg will-change-transform" style={idx < 6 ? animationStyles.fadeUp : undefined}>
              {p.badge && <div className="absolute top-3 left-3 bg-[#a67b5b] text-white text-xs px-2 py-1 rounded">{p.badge}</div>}
              <img src={p.image} alt={p.name} className="w-full h-64 object-cover rounded-2xl mb-4" loading="lazy" />
              <h3 className="text-xl font-semibold text-[#3b2f2f]">{p.name}</h3>
              <p className="text-[#5a4a42] text-sm mb-2">{p.brand}</p>
              <p className="text-lg font-bold mb-4 text-[#3b2f2f]">
                {p.salePercent ? `₦${Math.round(p.price * (1 - p.salePercent / 100)).toLocaleString()} ` : `₦${p.price.toLocaleString()}`}
                {p.salePercent && <span className="text-sm line-through text-[#5a4a42] ml-2">₦{p.price.toLocaleString()}</span>}
              </p>
              <button onClick={() => addToCart(p)} className="bg-[#a67b5b] px-4 py-2 rounded-full text-sm font-medium text-white hover:bg-[#8b5e3c]">Add to Cart</button>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section id="faqs" className="px-8 py-16">
        <h3 className="text-2xl font-semibold mb-6 text-[#3b2f2f]">FAQs</h3>
        <div className="space-y-4">
          <details className="bg-white p-4 rounded-xl">
            <summary className="cursor-pointer font-medium text-[#3b2f2f]">How long before I see skincare results?</summary>
            <p className="mt-2 text-[#5a4a42]">Typically 2–4 weeks of consistent use. Each product is formulated to target different skin concerns with visible results.</p>
          </details>
          <details className="bg-white p-4 rounded-xl">
            <summary className="cursor-pointer font-medium text-[#3b2f2f]">Do you offer nationwide delivery?</summary>
            <p className="mt-2 text-[#5a4a42]">Yes, we deliver across Nigeria and to select African countries via our logistics partners.</p>
          </details>
        </div>
      </section>

      {/* Cart Drawer with qty controls */}
      {cartOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-end z-50">
          <div className="bg-[#f9f5f2] w-80 h-full p-6 relative overflow-y-auto">
            <button onClick={() => setCartOpen(false)} className="absolute top-4 right-4 text-[#3b2f2f] hover:text-[#a67b5b]"><X /></button>
            <h3 className="text-lg font-semibold mb-6 text-[#3b2f2f]">Your Cart</h3>

            {cartItems.length === 0 ? (
              <p className="text-[#5a4a42]">Your cart is empty.</p>
            ) : (
              <>
                <ul className="space-y-4">
                  {cartItems.map(item => (
                    <li key={item.id} className="flex items-center justify-between text-[#3b2f2f]">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm">₦{item.price.toLocaleString()}</p>

                        <div className="flex items-center gap-2 mt-2">
                          <button onClick={() => updateQty(item.id, -1)} className="border border-[#a67b5b] rounded-full px-2 text-sm">
                            <Minus size={12} />
                          </button>
                          <span className="min-w-[24px] text-center">{item.qty}</span>
                          <button onClick={() => updateQty(item.id, 1)} className="border border-[#a67b5b] rounded-full px-2 text-sm">
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <p className="text-sm font-semibold">₦{(item.price * item.qty).toLocaleString()}</p>
                        <button onClick={() => removeFromCart(item.id)} className="text-[#a67b5b] text-sm hover:underline">Remove</button>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 border-t border-[#e7dfd3] pt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-[#5a4a42]">Subtotal</span>
                    <span className="font-semibold">₦{cartSubtotal.toLocaleString()}</span>
                  </div>
                  <button className="w-full bg-[#7a5c3d] text-white py-3 rounded-full font-medium">Checkout</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-[#d2b48c]/40 bg-[#f3f3f3] py-8 text-center text-[#5a4a42] text-sm">
        <div className="flex justify-center gap-6 mb-4">
          <a href="https://www.instagram.com/everythingskinfood" target="_blank" rel="noreferrer" className="hover:text-[#a67b5b] transition">Instagram</a>
          <a href="https://www.tiktok.com/@everythingskinfood" target="_blank" rel="noreferrer" className="hover:text-[#a67b5b] transition">TikTok</a>
          <a href="mailto:vilawrence540@gmail.com" className="hover:text-[#a67b5b] transition">Email</a>
          <a href="https://wa.me/2348108405552" target="_blank" rel="noreferrer" className="hover:text-[#a67b5b] transition">WhatsApp</a>
        </div>
        © {new Date().getFullYear()} Everythingskinfood. All rights reserved.
      </footer>

      {/* Floating WhatsApp Button (fixed) */}
      <a
        href="https://wa.me/2348108405552"
        target="_blank"
        rel="noreferrer"
        className="fixed right-6 bottom-16 z-50 bg-[#a67b5b] text-white p-4 rounded-full shadow-lg hover:bg-[#8b5e3c] transition wa-pulse"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-5 h-5" />
      </a>

      {/* Bottom Promo Strip (cycles every 4s) */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-[#d2b48c]/30 py-2 text-center z-50">
        <div key={promoIndex} className="promo-fade text-[#7a5c3d] text-sm font-medium">
          {promos[promoIndex]}
        </div>
      </div>
    </div>
  );
}
