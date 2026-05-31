"use client";
import React, { useState } from 'react';
import { Paperclip, Send } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { mockPengaduan } from '@/lib/mockData';

export default function PengaduanPage() {
  const [selected, setSelected] = useState(mockPengaduan[0]);

  return (
    <section className="h-[calc(100vh-8rem)] flex bg-white rounded-xl shadow-sm border border-[#D6E6F2] overflow-hidden" aria-label="Manajemen Pengaduan Warga">
       <aside className="w-1/3 border-r border-[#D6E6F2] bg-[#F7FBFC] flex flex-col" aria-label="Daftar Kotak Masuk">
       <header className="p-4 border-b border-[#D6E6F2] bg-white"><h2 className="font-bold text-slate-800">Inbox Pengaduan</h2></header>
       </aside>
    </section>
  );
}