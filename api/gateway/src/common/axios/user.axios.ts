// buat variable untuk endpoint API kategori

import axios from 'axios';

export const user_api = axios.create({
  baseURL: 'http://localhost:3001/api/user',
  timeout: 5000,
});
