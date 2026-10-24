import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    const envUser = process.env.ADMIN_USERNAME || "admin";
    const envPass = process.env.ADMIN_PASSWORD || "admin123";

    // Pengecekan hanya terjadi di Server
    if (username === envUser && password === envPass) {
      const response = NextResponse.json({ success: true, message: "Login Berhasil" });
      
      // Simpan session cookie aman (Validasi Server)
      response.cookies.set("admin_session", "authenticated_cs77", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24, // Berlaku 1 hari
      });

      return response;
    }

    return NextResponse.json(
      { success: false, message: "Username atau Password Salah!" },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
