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