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

  
  return (
    <aside className="w-64 bg-[#D6E6F2] border-r border-[#B9D7EA] flex flex-col h-full shrink-0 shadow-sm z-20" aria-label="Sidebar Navigasi Utama">
      <header className="h-16 flex items-center px-6 border-b border-[#B9D7EA] bg-white/50">
        <div className="w-8 h-8 bg-[#769FCD] rounded-lg flex items-center justify-center text-white font-bold mr-3 shadow-sm" aria-hidden="true">SV</div>
        <div>
          <h1 className="font-bold text-slate-800 text-sm leading-tight">Smart Village</h1>
          <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Admin Panel</p>
        </div>
      </header>
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1" aria-label="Menu Utama">
        {menuItems.map((item) => {
          const isActive = pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path));

          return (
            <Link
              key={item.id}
              href={item.path}
              aria-current={isActive ? "page" : undefined}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all text-sm font-medium ${isActive ? 'bg-[#769FCD] text-white shadow-sm' : 'text-slate-600 hover:bg-[#B9D7EA]/50'
                }`}
            >
              <div className="flex items-center space-x-3">
                <item.icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#769FCD]'}`} aria-hidden="true" />
                <span>{item.name}</span>
              </div>
              {isActive && <ChevronRight className="w-4 h-4 opacity-70" aria-hidden="true" />}
            </Link>
          );
        })}
      </nav>
      <footer className="p-4 border-t border-[#B9D7EA] space-y-1">
        <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-[#B9D7EA]/50 transition-colors">
          <Settings className="w-4 h-4" aria-hidden="true" /><span>Pengaturan</span>
        </button>
        <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-colors">
          <LogOut className="w-4 h-4" aria-hidden="true" /><span>Keluar</span>
        </button>
      </footer>
    </aside>
  );
};