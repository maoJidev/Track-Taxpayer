// ไฟล์ตั้งค่า Axios Client สำหรับการบริหารจัดการการเชื่อมต่อ API (Vision API และ Auth API)
import axios from 'axios';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || '/visionapi',
    timeout: 600000, // กำหนดระยะเวลารอการตอบกลับสูงสุด 10 นาที (Timeout)
});

// Client ตัวที่สองสำหรับระบบจัดการสิทธิ์ (Auth) และข้อมูลสำนักงาน (Region, ST, SS)
export const authApiClient = axios.create({
    baseURL: import.meta.env.VITE_AUTH_API_BASE_URL || '/authapi',
    timeout: 30000, // 30 วินาทีเพียงพอสำหรับการยืนยันตัวตนและดึงข้อมูลสำนักงาน
});

// Request interceptor for authApiClient to inject token
authApiClient.interceptors.request.use(
    (config) => {
        // Don't add token for login request
        if (config.url?.includes('/api/auth/login')) {
            return config;
        }

        const token = sessionStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Interceptor สำหรับจัดการ Log ของ API ทั่วไป (ใช้งานเพิ่มเติมได้ในอนาคต)
apiClient.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
        return config;
    },
    (error) => Promise.reject(error)
);

// Interceptor สำหรับจัดการข้อผิดพลาด (Error Handling) ของ API ในภาพรวม
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        const message = error.response?.data?.message || error.message;
        console.error(`[API Error] ${error.config?.url}:`, message);
        return Promise.reject(error);
    }
);

authApiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        const message = error.response?.data?.message || error.message;
        console.error(`[Auth API Error] ${error.config?.url}:`, message);
        return Promise.reject(error);
    }
);

export default apiClient;
