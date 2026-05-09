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
    </section>
  );
}