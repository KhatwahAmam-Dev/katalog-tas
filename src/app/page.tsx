"use client";

import React, { useState, useEffect } from "react";
import { Search, ShoppingBag, ExternalLink, X, Sparkles, MessageCircle } from "lucide-react";

// Types untuk data produk
interface Product {
  id: string;
  title: string;
  category: string;
  price: string;
  description: string;
  imageUrl: string;
  shopeeUrl: string;
  tiktokUrl: string;
  badge?: string;
}

// Dummy Data Awal
const DUMMY_PRODUCTS: Product[] = [
  {
    id: "1",
    title: "Tas Selempang Wanita Premium Leather - Elegant Black",
    category: "Sling Bag",
    price: "Rp 129.000",
    description: "Tas selempang elegan berbahan kulit sintetis grade A. Tahan air, jahitan rapi, dan memiliki 3 kompartemen utama yang muat untuk HP, dompet, dan kosmetik.",
    imageUrl: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop",
    shopeeUrl: "https://id.shp.ee/yudmwbm1?fromSource=whatsapp&smtt=0.0.3",
    tiktokUrl: "https://www.tiktok.com/@selarasdirumah",
    badge: "BEST SELLER",
  },
  {
    id: "2",
    title: "Tote Bag Minimalis Aesthetic Canvas - Soft Cream",
    category: "Tote Bag",
    price: "Rp 89.000",
    description: "Tote bag kasual cocok untuk kuliah maupun nongkrong. Menggunakan kain kanvas tebal dengan resleting anti-macet dan kantong dalam tambahan.",
    imageUrl: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800&auto=format&fit=crop",
    shopeeUrl: "https://id.shp.ee/yudmwbm1?fromSource=whatsapp&smtt=0.0.3",
    tiktokUrl: "https://www.tiktok.com/@selarasdirumah",
    badge: "PROMO",
  },
  {
    id: "3",
    title: "Shoulder Bag Modern Korean Style - Soft Mocha",
    category: "Shoulder Bag",
    price: "Rp 145.000",
    description: "Tas bahu bergaya Korea kekinian. Tali dapat disesuaikan, bahan lembut, dan dilengkapi magnet clip yang kokoh.",
    imageUrl: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop",
    shopeeUrl: "https://id.shp.ee/yudmwbm1?fromSource=whatsapp&smtt=0.0.3",
    tiktokUrl: "https://www.tiktok.com/@selarasdirumah",
  },
  {
    id: "4",
    title: "Backpack Mini Travel & Daily Fashion - Espresso Brown",
    category: "Backpack",
    price: "Rp 169.000",
    description: "Ransel mini berkapasitas luas. Ringan dipakai seharian dan cocok untuk aktivitas outdoor maupun traveling santai.",
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop",
    shopeeUrl: "https://id.shp.ee/yudmwbm1?fromSource=whatsapp&smtt=0.0.3",
    tiktokUrl: "https://www.tiktok.com/@selarasdirumah",
    badge: "NEW",
  },
];

const CATEGORIES = ["Semua", "Sling Bag", "Shoulder Bag", "Tote Bag", "Backpack"];

export default function Home() {
  const [products, setProducts] = useState<Product[]>(DUMMY_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Ambil data produk terbaru langsung dari server cloud saat halaman dibuka
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setProducts(data);
          }
        }
      } catch (err) {
        console.error("Gagal mengambil data produk cloud:", err);
      }
    };

    fetchProducts();
  }, []);

  // Filter logika pencarian & kategori
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "Semua" || product.category === selectedCategory;
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-between">
      {/* KONTEN UTAMA */}
      <main className="pb-16 flex-grow">
        {/* 1. HEADER & BRANDING */}
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-xl shadow-md">
                <ShoppingBag className="w-5 h-5"/>
              </div>
              <div>
                <h1 className="font-bold text-xl text-slate-900 tracking-tight leading-none">
                  Selaras Bag Collection
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  Katalog Tas Wanita Elegan & Premium
                </p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"/>
              <input
                type="text"
                placeholder="Cari model tas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-100 border border-transparent rounded-full text-sm focus:bg-white focus:border-amber-400 focus:outline-none transition-all"
              />
            </div>
          </div>
        </header>

        {/* 2. BANNER PROMO */}
        <section className="max-w-6xl mx-auto px-4 mt-6">
          <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl p-6 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1 bg-white/20 text-xs px-3 py-1 rounded-full font-medium backdrop-blur-sm mb-2">
                <Sparkles className="w-3.5 h-3.5"/> Koleksi Spesial 2026
              </span>
              <h2 className="text-2xl font-bold">Temukan Tas Impianmu Di Sini</h2>
              <p className="text-amber-100 text-sm mt-1">
                Klik pada gambar produk untuk langsung checkout via Shopee atau TikTok Shop!
              </p>
            </div>
          </div>
        </section>

        {/* 3. FILTER KATEGORI */}
        <section className="max-w-6xl mx-auto px-4 mt-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "bg-slate-900 text-white shadow-md"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* 4. GRID KATALOG PRODUK */}
        <section className="max-w-6xl mx-auto px-4 mt-6">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
              <p className="text-slate-500 font-medium">Tas yang dicari tidak ditemukan.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => setSelectedProduct(product)}
                  className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer flex flex-col"
                >
                  <div className="relative aspect-square overflow-hidden bg-slate-100">
                    {product.badge && (
                      <span className="absolute top-3 left-3 z-10 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wider">
                        {product.badge}
                      </span>
                    )}
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-4 flex flex-col flex-grow justify-between">
                    <div>
                      <span className="text-[11px] font-medium text-amber-600 uppercase tracking-wider">
                        {product.category}
                      </span>
                      <h3 className="font-semibold text-slate-800 text-sm line-clamp-2 mt-1 group-hover:text-amber-600 transition-colors">
                        {product.title}
                      </h3>
                    </div>
                    <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-base">
                        {product.price}
                      </span>
                      <span className="text-xs text-slate-400 font-medium group-hover:text-slate-700 transition-colors">
                        Lihat Detail &rarr;
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* 5. MODAL POP-UP DETAIL PRODUK */}
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100 relative">
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-900/50 text-white hover:bg-slate-900 transition-colors"
              >
                <X className="w-5 h-5"/>
              </button>

              <div className="relative aspect-video sm:aspect-square bg-slate-100">
                <img
                  src={selectedProduct.imageUrl}
                  alt={selectedProduct.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6">
                <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider">
                  {selectedProduct.category}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">
                  {selectedProduct.title}
                </h3>
                <p className="text-xl font-extrabold text-slate-900 mt-2">
                  {selectedProduct.price}
                </p>

                <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                  {selectedProduct.description}
                </p>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <a
                    href={selectedProduct.shopeeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-[#EE4D2D] hover:bg-[#d73f21] text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all text-sm"
                  >
                    <span>Beli di Shopee</span>
                    <ExternalLink className="w-4 h-4"/>
                  </a>

                  <a
                    href={selectedProduct.tiktokUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-black text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all text-sm"
                  >
                    <span>Beli di TikTok Shop</span>
                    <ExternalLink className="w-4 h-4"/>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 6. FOOTER RESMI TOKO */}
      <footer className="bg-white border-t border-slate-200 py-8 text-slate-600">
        <div className="max-w-6xl mx-auto px-4 flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* Brand & Tagline */}
          <div className="text-center md:text-left">
            <h3 className="font-bold text-slate-900 text-base">Selaras Bag Collection</h3>
            <p className="text-xs text-slate-500 mt-1">
              Katalog Produk Tas Wanita Elegan, Trendy & Berkualitas
            </p>
          </div>

          {/* Social / Channel Resmi Toko */}
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <a
              href="https://wa.me/6281213825210?text=Halo%20Admin%20Selaras%20Bag,%20saya%20mau%20tanya%20produk%20tas..."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 px-3.5 py-2 rounded-full border border-emerald-200 transition-all"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600"/>
              <span>Tanya via WA</span>
            </a>

            <a
              href="https://www.tiktok.com/@selarasdirumah"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-semibold bg-slate-900 text-white hover:bg-black px-3.5 py-2 rounded-full transition-all"
            >
              <span>TikTok Shop</span>
            </a>

            <a
              href="https://id.shp.ee/yudmwbm1?fromSource=whatsapp&smtt=0.0.3"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-semibold bg-[#EE4D2D] text-white hover:bg-[#d73f21] px-3.5 py-2 rounded-full transition-all"
            >
              <ShoppingBag className="w-4 h-4"/>
              <span>Shopee</span>
            </a>
          </div>

          {/* Developer Credit & Copyright */}
          <div className="text-center md:text-right text-[11px] text-slate-400">
            <p>
              Crafted with ❤️ by <span className="font-semibold text-slate-600">CS77 Studio</span>
            </p>
            <p className="mt-0.5">© 2026 Selaras Bag. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
