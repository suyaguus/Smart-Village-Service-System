"use client";

import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Eye, Clock, ArrowLeft, Save, Send, Image as ImageIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';




export default function InformasiDesaPage() {
    // State untuk mengontrol apakah sedang di halaman daftar atau form tambah
  const [isAddingMode, setIsAddingMode] = useState(false);
  
   // State untuk form tambah
  const [coverImage, setCoverImage] = useState<string | null>(null);
}