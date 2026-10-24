import { NextResponse } from "next/server";

// In-Memory Storage / Fallback sementara
let globalProducts = [
  {
    id: "1",
    title: "Tas Selempang Wanita Premium Leather - Elegant Black",
    category: "Sling Bag",
    price: "Mulai Rp 129.000",
    description: "Tas selempang elegan berbahan kulit sintetis grade A.",
    imageUrl: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop",
    shopeeUrl: "https://shopee.co.id",
    tiktokUrl: "https://tiktok.com",
    badge: "BEST SELLER",
  },
  {
    id: "2",
    title: "Tote Bag Minimalis Aesthetic Canvas - Soft Cream",
    category: "Tote Bag",
    price: "Mulai Rp 89.000",
    description: "Tote bag kanvas tebal cocok untuk kuliah dan nongkrong.",
    imageUrl: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800&auto=format&fit=crop",
    shopeeUrl: "https://shopee.co.id",
    tiktokUrl: "https://tiktok.com",
    badge: "PROMO",
  }
];

// GET: Untuk mengambil seluruh produk aktif (Bisa diakses siapa saja)
export async function GET() {
  return NextResponse.json(globalProducts);
}

// POST: Untuk menambah produk baru dari Admin
export async function POST(request: Request) {
  try {
    const newProduct = await request.json();
    globalProducts = [newProduct, ...globalProducts];
    return NextResponse.json({ success: true, products: globalProducts });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Gagal menyimpan produk" }, { status: 500 });
  }
}

// DELETE: Untuk menghapus produk dari Admin
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    globalProducts = globalProducts.filter((p) => p.id !== id);
    return NextResponse.json({ success: true, products: globalProducts });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Gagal menghapus produk" }, { status: 500 });
  }
}
