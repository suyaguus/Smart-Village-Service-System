"use client";

import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Eye, Clock, ArrowLeft, Save, Send, Image as ImageIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';




export default function InformasiDesaPage() {
    // State untuk mengontrol apakah sedang di halaman daftar atau form tambah
  const [isAddingMode, setIsAddingMode] = useState(false);
  
   // State untuk form tambah
  const [coverImage, setCoverImage] = useState<string | null>(null);

  const mockInfo = [
    { id: 1, judul: 'Penyuluhan Kesehatan Lingkungan', kategori: 'Kesehatan', tanggal: '05 Mei 2026', views: 124, status: 'PUBLISHED', image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&q=80' },
    { id: 2, judul: 'Pencairan BLT Dana Desa Tahap 3', kategori: 'Ekonomi', tanggal: '02 Mei 2026', views: 540, status: 'PUBLISHED', image: 'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=400&q=80' },
    { id: 3, judul: 'Rencana Kerja Bakti Serentak', kategori: 'Sosial', tanggal: '28 April 2026', views: 89, status: 'DRAFT', image: 'https://images.unsplash.com/photo-1559027615-cd9d732ffade?w=400&q=80' },
  ];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCoverImage(URL.createObjectURL(e.target.files[0]));
    }
  };


  //View Data Informasi
  if (!isAddingMode) {
    return (
      <section className="space-y-6 max-w-7xl mx-auto" aria-label="Manajemen Informasi Desa">
        <header className="flex justify-between items-center">
           <div>
            <h1 className="text-2xl font-bold text-slate-800">Informasi & Berita Desa</h1>
            <p className="text-sm text-slate-500 mt-1">Kelola konten pengumuman dan berita untuk aplikasi mobile warga.</p>
          </div>
          <button 
            onClick={() => setIsAddingMode(true)}
            className="bg-[#769FCD] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-[#6086b3] transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" aria-hidden="true" /> Buat Informasi Baru
          </button>
        </header>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" aria-label="Daftar Kartu Informasi">
          {mockInfo.map((info) => (
            <article key={info.id}>
              <Card className="overflow-hidden flex flex-col hover:shadow-md transition-shadow h-full">
                <figure className="relative h-48 w-full overflow-hidden m-0">
                  <img src={info.image} alt={info.judul} className="w-full h-full object-cover transition-transform hover:scale-105 duration-500" />
                  <div className="absolute top-3 left-3">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded shadow-sm ${info.status === 'PUBLISHED' ? 'bg-green-500 text-white' : 'bg-slate-500 text-white'}`}>
                      {info.status}
                    </span>
                  </div>
                </figure>
                <div className="p-5 flex-1 flex flex-col">
                   <header className="flex justify-between items-center mb-2">
                    <span className="text-xs font-semibold text-[#769FCD] uppercase tracking-wider">{info.kategori}</span>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" aria-hidden="true" /> <time dateTime={info.tanggal}>{info.tanggal}</time>
                    </span>
                   </header>
                   <h3 className="font-bold text-slate-800 leading-snug mb-3 flex-1">{info.judul}</h3>
                   <footer className="pt-4 border-t border-[#D6E6F2] flex justify-between items-center">
                     <div className="flex items-center gap-1 text-slate-400 text-xs">
                      <Eye className="w-3.5 h-3.5" aria-hidden="true" /> <span>{info.views} Dilihat</span>
                    </div>
                    <div className="flex gap-2">
                      <button aria-label="Edit informasi" className="p-1.5 text-slate-400 hover:text-[#769FCD] hover:bg-[#F7FBFC] rounded border border-[#D6E6F2] transition-colors"><Edit2 className="w-4 h-4"/></button>
                      <button aria-label="Hapus informasi" className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded border border-[#D6E6F2] transition-colors"><Trash2 className="w-4 h-4"/></button>
                    </div>
                   </footer>
                </div>
              </Card>
            </article>
          ))}
        </section>
      </section>
    );
  }
}




  


  
  