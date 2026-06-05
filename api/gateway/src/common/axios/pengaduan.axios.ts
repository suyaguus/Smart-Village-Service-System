import axios from 'axios';

export const pengaduan_api = axios.create({
  baseURL: 'http://localhost:3005/api/pengaduan',
  timeout: 5000,
});
