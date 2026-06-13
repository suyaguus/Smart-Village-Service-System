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
            </article>
          ))}
        </section>
      </section>
    );
  }
}




  


  
  