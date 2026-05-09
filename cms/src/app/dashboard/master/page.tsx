"use client";

import React, { useState } from 'react';
import { Plus, AlignLeft, Calendar, FileUp, Hash, GripVertical, FileText } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { mockJenisSurat } from '@/lib/mockData';

export default function MasterFormPage() {
  const [activeSurat, setActiveSurat] = useState(mockJenisSurat[0]);
  const [isAddingField, setIsAddingField] = useState(false);

  const getIcon = (type: string) => {
    switch(type) {
      case 'text': case 'textarea': return <AlignLeft className="w-4 h-4 text-blue-500" aria-hidden="true" />;
      case 'number': return <Hash className="w-4 h-4 text-orange-500" aria-hidden="true" />;
      case 'date': return <Calendar className="w-4 h-4 text-purple-500" aria-hidden="true" />;
      case 'file': return <FileUp className="w-4 h-4 text-green-500" aria-hidden="true" />;
      default: return <FileText className="w-4 h-4 text-slate-500" aria-hidden="true" />;
    }
  };

  return (
    <section className="space-y-6 max-w-7xl mx-auto" aria-label="Master Form Builder">
       <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Master Jenis Surat</h1>
          <p className="text-sm text-slate-500 mt-1">Kelola formulir dinamis (Dynamic Form).</p>
        </div>
        <button className="bg-[#769FCD] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-[#6086b3] transition-colors">
          <Plus className="w-4 h-4" aria-hidden="true" /> Tambah Surat
        </button>
      </header>

      <div className="flex flex-col lg:flex-row gap-6">
        <aside className="w-full lg:w-1/3" aria-label="Daftar Layanan Surat">
          <Card className="overflow-hidden">
            <header className="px-4 py-3 bg-[#D6E6F2]/30 border-b border-[#D6E6F2]">
              <h2 className="font-semibold text-slate-700 text-sm">Daftar Layanan Surat</h2>
            </header>
            <div className="divide-y divide-[#D6E6F2]">
              {mockJenisSurat.map(surat => (
                <button 
                  key={surat.id} 
                  aria-pressed={activeSurat.id === surat.id}
                  onClick={() => { setActiveSurat(surat); setIsAddingField(false); }}
                  className={`w-full text-left p-4 transition-colors ${activeSurat.id === surat.id ? 'bg-[#F7FBFC] border-l-4 border-l-[#769FCD]' : 'hover:bg-[#F7FBFC]'}`}
                >
                  <h3 className={`font-semibold text-sm ${activeSurat.id === surat.id ? 'text-[#769FCD]' : 'text-slate-700'}`}>{surat.nama_surat}</h3>
                  <p className="text-xs text-slate-500 mt-1">Kode: {surat.kode_surat} • {surat.fields.length} Field</p>
                </button>
              ))}
            </div>
          </Card>
        </aside>
      </div>
    </section>
  );
}