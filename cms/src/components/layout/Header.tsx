import React from 'react';
import { Search, Bell } from 'lucide-react';

export const Header = () => {
  return (
    <header className="h-16 bg-white border-b border-[#D6E6F2] flex items-center justify-between px-8 shadow-sm shrink-0 z-10" aria-label="Header Global">
      <div className="relative w-96 hidden md:block">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" aria-hidden="true" />
        <input type="search" aria-label="Pencarian Global" placeholder="Cari NIK, Nama, atau ID Pengajuan..." className="w-full pl-10 pr-4 py-2 bg-[#F7FBFC] border border-[#D6E6F2] rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#769FCD]" />
      </div>
      <nav className="flex items-center space-x-5" aria-label="Menu Pengguna">
        <button aria-label="Notifikasi" className="relative p-2 text-slate-400 hover:text-[#769FCD] rounded-full hover:bg-[#F7FBFC] transition-colors">
          <Bell className="w-5 h-5" aria-hidden="true" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        <div className="h-6 w-px bg-[#D6E6F2]" aria-hidden="true"></div>
        <button className="flex items-center space-x-3 cursor-pointer text-left hover:opacity-80 transition-opacity" aria-label="Profil Pengguna">
          <div className="hidden sm:block">
            <p className="text-sm font-bold text-slate-700 leading-none">Admin Desa</p>
            <p className="text-[11px] text-slate-500 mt-1 font-medium">Administrator</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-[#B9D7EA] border-2 border-white shadow-sm flex items-center justify-center font-bold text-white text-xs" aria-hidden="true">AD</div>
        </button>
      </nav>
    </header>
  );
};
