import React from 'react';
import { Clock, FileBadge, CheckCircle, MessageSquare, MoreHorizontal } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockStats, mockPengajuan } from '@/lib/mockData';

export default function DashboardPage() {
    return (
        <section className="space-y-6 max-w-7xl mx-auto" aria-label="Dashboard Utama">
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Overview Dashboard</h1>
                    <p className="text-sm text-slate-500 mt-1">Pantau aktivitas layanan desa Anda hari ini.</p>
                </div>
                <div className="flex items-center space-x-2 text-sm font-medium text-slate-600 bg-white px-4 py-2 rounded-lg border border-[#D6E6F2] shadow-sm">
                    <Clock className="w-4 h-4 text-[#769FCD]" />
                    <time dateTime="2026-05-08">Hari ini, 8 Mei 2026</time>
                </div>
            </header>

            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" aria-label="Ringkasan Statistik">
                {[
                    { title: 'Menunggu Verifikasi', count: mockStats.menunggu, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' },
                    { title: 'Sedang Diproses', count: mockStats.diproses, icon: FileBadge, color: 'text-[#769FCD]', bg: 'bg-[#D6E6F2]/50', border: 'border-[#B9D7EA]' },
                    { title: 'Surat Selesai', count: mockStats.selesai, icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' },
                    { title: 'Pengaduan Baru', count: mockStats.pengaduanBaru, icon: MessageSquare, color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-200' },
                ].map((stat, idx) => (
                    <Card key={idx} className={`hover:shadow-md transition-shadow border-l-4 ${stat.border.replace('border-', 'border-l-')}`}>
                        <div className="p-6 flex items-center justify-between">
                            <div>
                                <h2 className="text-sm font-medium text-slate-500 mb-1">{stat.title}</h2>
                                <p className="text-3xl font-bold text-slate-800">{stat.count}</p>
                            </div>
                            <div className={`p-3 rounded-xl ${stat.bg}`}><stat.icon className={`w-6 h-6 ${stat.color}`} aria-hidden="true" /></div>
                        </div>
                    </Card>
                ))}
            </section>
        </section>

    );
}
