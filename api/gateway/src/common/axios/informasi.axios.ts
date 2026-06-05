import axios from 'axios';

export const informasi_api = axios.create({
  baseURL: 'http://localhost:3006/api/informasi',
  timeout: 5000,
});
