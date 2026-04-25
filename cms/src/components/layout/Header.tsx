"use client";

import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bell, LogOut, User } from "lucide-react";

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

        {/* user menu */}
        <DropdownMenu>
          {/* DropdownMenuTrigger */}
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-2 px-2"
              aria-label="User menu"
            >
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-slate-800 text-white text-xs">
                  AD
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-slate-700 hidden sm:inline">
                Admin
              </span>
            </Button>
          </DropdownMenuTrigger>

          {/* DropdownMenuContent */}
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="w-4 h-4 mr-2" />
              Profil
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="text-red-600 focus:text-red-600 focus:bg-red-50"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Keluar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </header>
  );
}
