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
        <div className="flex-1 overflow-y-auto">
          {mockPengaduan.map(item => (
            <article key={item.id} tabIndex={0} role="button" aria-pressed={selected.id === item.id} onClick={() => setSelected(item)} className={`p-4 border-b border-[#D6E6F2] cursor-pointer ${selected.id === item.id ? 'bg-[#D6E6F2]/50' : 'bg-white'}`}>
              <h3 className="font-bold text-sm text-slate-800 block">{item.user}</h3>
              <p className="text-sm font-semibold text-slate-700 truncate">{item.judul}</p>
              <div className="mt-2"><Badge>{item.status}</Badge></div>
            </article>
          ))}
        </div>
       </aside>

       <article className="w-2/3 flex flex-col" aria-label="Detail Percakapan Pengaduan">
       <header className="p-6 border-b border-[#D6E6F2] bg-[#F7FBFC]">
          <h3 className="text-xl font-bold text-slate-800">{selected.judul}</h3>
          <p className="text-sm text-slate-500">Oleh: {selected.user} • <time dateTime={selected.tanggal}>{selected.tanggal}</time></p>
        </header>

         <section className="flex-1 p-6 overflow-y-auto bg-slate-50" aria-label="Isi Pesan">
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-200" aria-hidden="true"></div>
            <div className="bg-white border border-[#D6E6F2] p-4 rounded-xl rounded-tl-none max-w-md"><p className="text-sm">{selected.deskripsi}</p></div>
          </div>
        </section>
        
       </article>
    </section>
  );
}