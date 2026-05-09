"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, FileText, LayoutTemplate, MessageSquare, Info, Users, LogOut, Settings, ChevronRight } from 'lucide-react';

export const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: Home, path: '/dashboard' },
    { id: 'pengajuan', name: 'Pengajuan Surat', icon: FileText, path: '/dashboard/pengajuan' },
    { id: 'master', name: 'Master Form', icon: LayoutTemplate, path: '/dashboard/master' },
    { id: 'pengaduan', name: 'Pengaduan', icon: MessageSquare, path: '/dashboard/pengaduan' },
    { id: 'informasi', name: 'Informasi Desa', icon: Info, path: '/dashboard/informasi' },
    { id: 'pengguna', name: 'Pengguna', icon: Users, path: '/dashboard/pengguna' },
  ];
};