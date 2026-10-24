"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import Link from "next/link";

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

export default function AdminDashboard() {
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);

  // Form State
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Sling Bag");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [shopeeUrl, setShopeeUrl] = useState("");
  const [tiktokUrl, setTiktokUrl] = useState("");
  const [badge, setBadge] = useState("");

  // PROTEKSI LOGIN & AMBIL DATA DARI CLOUD API
  useEffect(() => {
    const isAuth = localStorage.getItem("is_admin");
    if (!isAuth) {
      router.push("/admin/login");
      return;
    }

    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
        }
      })
      .catch((err) => console.error("Gagal memuat produk:", err));
  }, [router]);

  // SIMPAN PRODUK BARU KE CLOUD VIA API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price || !imageUrl) {
      alert("Mohon isi Nama Tas, Harga, dan URL Foto!");
      return;
    }

    const newProduct = {
      id: Date.now().toString(),
      title,
      category,
      price,
      description,
      imageUrl,
      shopeeUrl: shopeeUrl || "https://shopee.co.id",
      tiktokUrl: tiktokUrl || "https://tiktok.com",
      badge,
    };

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });

      if (res.ok) {
        const data = await res.json();
        setProducts(data.products);
        
        // Reset Form
        setTitle("");
        setPrice("");
        setDescription("");
        setImageUrl("");
        setShopeeUrl("");
        setTiktokUrl("");
        setBadge("");
        
        alert("Produk tas berhasil diunggah ke Cloud & Live untuk semua pembeli!");
      }
    } catch (err) {
      console.error("Gagal menyimpan:", err);
      alert("Terjadi kesalahan saat menyimpan produk.");
    }
  };

  // HAPUS PRODUK DARI CLOUD VIA API
  const handleDelete = async (id: string) => {
    if (confirm("Yakin mau menghapus produk tas ini?")) {
      try {
        const res = await fetch("/api/products", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        });

        if (res.ok) {
          const data = await res.json();
          setProducts(data.products);
        }
      } catch (err) {
        console.error("Gagal menghapus:", err);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("is_admin");
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 pb-12">
      {/* Top Navbar Admin */}
      <header className="bg-slate-900 text-white py-4 px-6 shadow-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500 rounded-lg text-slate-900 font-bold">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-none">Admin Dashboard</h1>
              <p className="text-xs text-slate-400 mt-1">Kelola Katalog Tas Selaras</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-medium bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg border border-slate-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Lihat Web Utama
            </Link>
            <button
              onClick={handleLogout}
              className="text-xs font-semibold bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white px-3 py-2 rounded-lg border border-red-500/30 transition-all"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* FORM INPUT PRODUK BARU */}
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-fit">
          <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Plus className="w-5 h-5 text-amber-500" /> Tambah Tas Baru
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Nama Produk Tas *</label>
              <input
                type="text"
                placeholder="Contoh: Sling Bag Leather Canvas"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Kategori</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500"
                >
                  <option value="Sling Bag">Sling Bag</option>
                  <option value="Shoulder Bag">Shoulder Bag</option>
                  <option value="Tote Bag">Tote Bag</option>
                  <option value="Backpack">Backpack</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Harga (Rp) *</label>
                <input
                  type="text"
                  placeholder="Mulai Rp 120.000"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">URL Foto Produk (Image Link) *</label>
              <input
                type="text"
                placeholder="https://..."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Link Shopee Affiliate</label>
              <input
                type="text"
                placeholder="https://shopee.co.id/..."
                value={shopeeUrl}
                onChange={(e) => setShopeeUrl(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Link TikTok Shop Affiliate</label>
              <input
                type="text"
                placeholder="https://tiktok.com/..."
                value={tiktokUrl}
                onChange={(e) => setTiktokUrl(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Badge Produk (Opsional)</label>
              <input
                type="text"
                placeholder="Contoh: BEST SELLER, PROMO, NEW"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Deskripsi Singkat</label>
              <textarea
                rows={3}
                placeholder="Bahan, ukuran, fitur resleting, dll..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold rounded-xl shadow-md transition-all text-sm mt-2"
            >
              Simpan Produk Tas
            </button>
          </form>
        </div>

        {/* DAFTAR PRODUK AKTIF */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-base font-bold text-slate-900 mb-4">
            Daftar Produk Aktif ({products.length})
          </h2>

          <div className="space-y-4">
            {products.map((p) => (
              <div
                key={p.id}
                className="p-4 border border-slate-100 rounded-xl flex items-center justify-between gap-4 bg-slate-50/50 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={p.imageUrl}
                    alt={p.title}
                    className="w-16 h-16 object-cover rounded-lg border border-slate-200 bg-white"
                  />
                  <div>
                    <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full uppercase">
                      {p.category}
                    </span>
                    <h3 className="font-bold text-slate-800 text-sm mt-1">{p.title}</h3>
                    <p className="text-xs text-slate-600 font-semibold">{p.price}</p>
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(p.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  title="Hapus Produk"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
