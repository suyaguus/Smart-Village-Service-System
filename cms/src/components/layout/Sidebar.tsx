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
  { label: "Pengaduan", href: "/dashboard/pengaduan", icon: MessageSquareWarning },
  { label: "Informasi", href: "/dashboard/informasi", icon: Newspaper },
];