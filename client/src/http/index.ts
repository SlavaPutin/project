import axios from 'axios';
export const API_URL = 'http://localhost:5000'

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (config.headers && token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

$api.interceptors.response.use((config) => {
    return config
}, async (error) => {
    const originalRequest = error.config;
    
    if (!error.response) {
       console.error("Сервер не отвечает или ошибка сети");
       throw error;
    }
    
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.post(`${API_URL}/auth/refresh`, {}, { withCredentials: true });
            
            const newAccessToken = response.data.accessToken;
            localStorage.setItem('token', newAccessToken);
            
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            
            return $api.request(originalRequest);
        } catch (e) {
            console.log('НЕ АВТОРИЗОВАН: Рефреш токен просрочен');
            localStorage.removeItem('token');
            localStorage.removeItem('auth');
            throw e;
        }
    }
    throw error;
})

export default $api;