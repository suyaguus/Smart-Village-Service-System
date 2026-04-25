"use client";

import { usePathname } from "next/navigation";

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/users": "Manajemen Pengguna",
  "/dashboard/jenis-surat": "Jenis Surat",
  "/dashboard/pengajuan": "Pengajuan Surat",
  "/dashboard/pengaduan": "Pengaduan",
  "/dashboard/informasi": "Informasi Desa",
};

export default function Header() {
  const pathname = usePathname();

  const title =
    Object.entries(pageTitles).find(
      ([key]) => pathname === key || pathname.startsWith(key + "/"),
    )?.[1] ?? "Dashboard";
}
