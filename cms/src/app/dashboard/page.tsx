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
        </section>
    );
}
