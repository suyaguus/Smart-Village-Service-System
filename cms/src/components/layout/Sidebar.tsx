"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  FileText,
  ListChecks,
  MessageSquareWarning,
  Newspaper,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Pengguna", href: "/dashboard/users", icon: Users },
  { label: "Jenis Surat", href: "/dashboard/jenis-surat", icon: FileText },
  { label: "Pengajuan Surat", href: "/dashboard/pengajuan", icon: ListChecks },
  {
    label: "Pengaduan",
    href: "/dashboard/pengaduan",
    icon: MessageSquareWarning,
  },
  { label: "Informasi", href: "/dashboard/informasi", icon: Newspaper },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside>
      {/* brand header */}
      <header className="h-16 flex items-center px-6 border-b border-slate-700">
        <figure className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <span className="text-slate-900 text-xs font-bold">SV</span>
          </div>
          <figcaption>
            <p className="text-white font-semibold text-sm">Smart Village</p>
            <p className="text-slate-400 text-xs">Admin CMS</p>
          </figcaption>
        </figure>
      </header>

      {/* navigation items */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-white text-slate-900"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white",
                  )}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <footer className="px-6 py-4 border-t border-slate-700">
        <p className="text-slate-500 text-xs">© 2026 Smart Village</p>
      </footer>
    </aside>
  );
}
