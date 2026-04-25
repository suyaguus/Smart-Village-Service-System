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

  //   Jika pengguna mengakses root path, arahkan mereka ke dashboard jika sudah memiliki token, atau ke halaman login jika belum memiliki token
  if (pathname === "/") {
    if (token) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // Jika tidak ada token, arahkan ke halaman login
    return NextResponse.redirect(new URL("/login", request.url));
  }

  //   Jika tidak ada kondisi yang terpenuhi, lanjutkan ke rute yang diminta
  return NextResponse.next();
}

// Menentukan rute yang akan diproteksi oleh middleware
export const config = {
  matcher: ["/", "/dashboard/:path*", "/login"],
};
