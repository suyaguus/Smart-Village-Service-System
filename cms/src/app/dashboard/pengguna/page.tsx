





export default function ManajemenPenggunaPage() {

  // 1. State untuk menyimpan filter yang sedang aktif ('ALL', 'ADMIN', atau 'USER')
  const [activeFilter, setActiveFilter] = useState('ALL');

  
  // 2. State untuk kolom pencarian
  const [searchQuery, setSearchQuery] = useState('');

  // 3. Logika Filter Data
  const filteredUsers = mockUsers.filter(user => {

  // Filter berdasarkan Role
    const matchesFilter = activeFilter === 'ALL' || user.role === activeFilter;

  });
}