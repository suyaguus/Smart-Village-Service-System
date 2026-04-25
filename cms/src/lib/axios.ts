import axios from "axios";
import Cookies from "js-cookie";

// membuat instance axios dengan konfigurasi default
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// menambahkan interceptor untuk menyisipkan token ke setiap permintaan
apiClient.interceptors.request.use((config) => {
  const token = Cookies.get("token");

  //   jika token ada, tambahkan ke header Authorization
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  //   kembalikan konfigurasi yang telah dimodifikasi
  return config;
});

// menambahkan interceptor untuk menangani respons dan error
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            Cookies.remove("token");
            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);

export default apiClient;