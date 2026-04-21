import { NextRequest, NextResponse } from "next/server";

// Middleware untuk memeriksa token otentikasi pada setiap permintaan ke rute dashboard
export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  //   Jika pengguna mencoba mengakses rute dashboard tanpa token, arahkan mereka ke halaman login
  if (pathname.startsWith("/dashboard") && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  //   Jika pengguna sudah memiliki token dan mencoba mengakses halaman login, arahkan mereka ke dashboard
  if (pathname === "/login" && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
}
