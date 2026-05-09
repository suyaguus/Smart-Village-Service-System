"use client";

import React, { useState } from 'react';
import { Plus, AlignLeft, Calendar, FileUp, Hash, GripVertical, FileText } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { mockJenisSurat } from '@/lib/mockData';

export default function MasterFormPage() {
    const [activeSurat, setActiveSurat] = useState(mockJenisSurat[0]);
    const [isAddingField, setIsAddingField] = useState(false);

    const getIcon = (type: string) => {
        switch (type) {
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

                <section className="w-full lg:w-2/3" aria-label="Konfigurasi Form Layout">
                    <Card className="flex flex-col h-full min-h-[500px]">
                        <header className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-slate-700 text-sm uppercase">Konfigurasi Field Form</h3>
                            {!isAddingField && (
                                <button onClick={() => setIsAddingField(true)} className="text-xs font-semibold text-[#769FCD] bg-white border border-[#B9D7EA] px-3 py-1.5 rounded-lg flex items-center gap-1 hover:bg-[#D6E6F2]">
                                    <Plus className="w-3.5 h-3.5" aria-hidden="true" /> Tambah Field
                                </button>
                            )}
                        </header>
                        <div className="space-y-3">
                            {activeSurat.fields.map(field => (
                                <article key={field.id} className="bg-white border border-[#B9D7EA] rounded-lg p-3 flex items-center justify-between shadow-sm">
                                    <div className="flex items-center gap-4">
                                        <GripVertical className="w-5 h-5 text-slate-300 cursor-grab" aria-label="Geser untuk mengubah urutan" />
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded bg-slate-50 flex items-center justify-center border border-slate-100">{getIcon(field.field_type)}</div>
                                            <div>
                                                <h4 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                                                    {field.field_label}
                                                    {field.is_required && <span className="text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded font-bold">Wajib</span>}
                                                </h4>
                                                <p className="text-xs text-slate-500 font-mono mt-0.5">{field.field_name} • Tipe: {field.field_type}</p>
                                            </div>

                                            {isAddingField && (
                                                <form onSubmit={(e) => e.preventDefault()} className="mt-4 bg-white border-2 border-dashed border-[#769FCD] rounded-xl p-5 shadow-sm">
                                                    <h4 className="font-bold text-slate-700 text-sm mb-4">Tambah Field Baru</h4>
                                                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                                                        <div>
                                                            <label htmlFor="labelField" className="block font-semibold text-slate-600 mb-1">Label Field</label>
                                                            <input id="labelField" type="text" placeholder="Contoh: Foto KTP" className="w-full border border-[#D6E6F2] rounded-lg px-3 py-2 focus:outline-none focus:border-[#769FCD]" />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="namaDb" className="block font-semibold text-slate-600 mb-1">Nama Database</label>
                                                            <input id="namaDb" type="text" placeholder="contoh: foto_ktp" className="w-full border border-[#D6E6F2] rounded-lg px-3 py-2 bg-slate-50 focus:outline-none" />
                                                        </div>
                                                    </div>
                                                    <footer className="flex gap-2 justify-end mt-4">
                                                        <button type="button" onClick={() => setIsAddingField(false)} className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg">Batal</button>
                                                        <button type="submit" className="px-4 py-2 text-sm bg-[#769FCD] text-white hover:bg-[#6086b3] rounded-lg transition-colors">Simpan</button>
                                                    </footer>
                                                </form>
                                            )}
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </Card>
                </section>
            </div>
        </section>
    );
}