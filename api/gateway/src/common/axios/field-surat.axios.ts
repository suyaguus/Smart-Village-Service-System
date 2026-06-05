import axios from 'axios';

export const field_surat_api = axios.create({
  baseURL: 'http://localhost:3003/api/field-surat',
  timeout: 5000,
});
