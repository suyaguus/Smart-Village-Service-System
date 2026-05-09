"use client";

import React, { useState } from 'react';
import { Eye, ArrowLeft, FileText, FileUp, Download, UploadCloud, XCircle, CheckCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockPengajuan } from '@/lib/mockData';

interface Pengajuan {
  id: string;
  tanggal: string;
  user: string;
  jenisSurat: string;
  status: string;
  details?: { label: string; value: string }[];
  dokumen?: { nama: string; file: string; size: string }[];
}

// Helper untuk memberikan warna pada Badge shadcn/ui sesuai status
const getBadgeStyle = (status: string) => {
  switch (status) {
    case 'MENUNGGU': return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-200';
    case 'DIPROSES': return 'bg-[#D6E6F2] text-[#769FCD] hover:bg-[#B9D7EA] border-[#B9D7EA]';
    case 'SELESAI': return 'bg-green-100 text-green-800 hover:bg-green-200 border-green-200';
    case 'DITOLAK': return 'bg-red-100 text-red-800 hover:bg-red-200 border-red-200';
    default: return 'bg-slate-100 text-slate-800';
  }
};