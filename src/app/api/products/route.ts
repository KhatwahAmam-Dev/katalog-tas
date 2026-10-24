import { NextResponse } from "next/server";

let globalProducts = [
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

// GET: Mengambil seluruh produk aktif
export async function GET() {
  return NextResponse.json(globalProducts);
}

// POST: Menambah produk baru dari Admin
export async function POST(request: Request) {
  try {
    const newProduct = await request.json();
    globalProducts = [newProduct, ...globalProducts];
    return NextResponse.json({ success: true, products: globalProducts });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Gagal menyimpan produk" }, { status: 500 });
  }
}

// DELETE: Menghapus produk dari Admin
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    globalProducts = globalProducts.filter((p) => p.id !== id);
    return NextResponse.json({ success: true, products: globalProducts });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Gagal menghapus produk" }, { status: 500 });
  }
}
