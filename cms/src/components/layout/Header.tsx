"use client";

import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";

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

  function handleLogout() {
    document.cookie = "token; Max-Age=0; path=/";
    window.location.href = "/login";
  }

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6">
      <h1 className="text-lg font-semibold text-slate-800">{title}</h1>

      <nav className="flex items-center gap-2">
        {/* Notification Bell */}
        <Button
          variant="ghost"
          size="icon"
          aria-label="Notifikasi"
          className="relative"
        >
          <Bell className="w-5 h-5 text-slate-500" />
        </Button>
      </nav>
    </header>
  );
}
