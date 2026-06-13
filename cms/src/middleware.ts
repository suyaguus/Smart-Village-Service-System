import { NextRequest, NextResponse } from "next/server";

// Middleware untuk memeriksa token otentikasi pada setiap permintaan ke rute dashboard
export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // =========================================================================
  // BYPASS MODE (DEVELOPMENT UI)
  // Semua fungsi redirect di-comment sementara agar Anda bisa melihat Dashboard.
  // Jika API Login NestJS sudah siap, hapus tanda komentar (/* ... */) di bawah ini.
  // =========================================================================

  /*
  // Jika pengguna mencoba mengakses rute dashboard tanpa token, arahkan mereka ke halaman login
  if (pathname.startsWith("/dashboard") && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Jika pengguna sudah memiliki token dan mencoba mengakses halaman login, arahkan mereka ke dashboard
  if (pathname === "/login" && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Jika pengguna mengakses root path, arahkan mereka ke dashboard jika sudah memiliki token, atau ke halaman login jika belum memiliki token
  if (pathname === "/") {
    if (token) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // Jika tidak ada token, arahkan ke halaman login
    return NextResponse.redirect(new URL("/login", request.url));
  }
  */

  // Jika tidak ada kondisi yang terpenuhi, lanjutkan ke rute yang diminta
  // Saat ini akan selalu me-return next() agar semua halaman bisa dibuka
  return NextResponse.next();
}

// Menentukan rute yang akan diproteksi oleh middleware
export const config = {
  matcher: ["/", "/dashboard/:path*", "/login"],
};