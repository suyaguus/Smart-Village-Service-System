import axios from 'axios';

export const pengajuan_surat_api = axios.create({
  baseURL: 'http://localhost:3004/api/pengajuan-surat',
  timeout: 5000,
});
