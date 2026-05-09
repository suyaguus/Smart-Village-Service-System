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

  
}