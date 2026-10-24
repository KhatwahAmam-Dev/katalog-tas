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
  }
];

export async function GET() {
  return NextResponse.json(globalProducts);
}

export async function POST(request: Request) {
  try {
    const newProduct = await request.json();
    globalProducts = [newProduct, ...globalProducts];
    return NextResponse.json({ success: true, products: globalProducts });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Gagal menyimpan produk" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    globalProducts = globalProducts.filter((p) => p.id !== id);
    return NextResponse.json({ success: true, products: globalProducts });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Gagal menghapus produk" }, { status: 500 });
  }
}
