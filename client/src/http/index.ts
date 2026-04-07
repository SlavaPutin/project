import axios from 'axios';
export const API_URL = 'http://localhost:5000'

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use((config) => {
    // Используем опциональную цепочку или проверку, чтобы TS не ругался
    if (config.headers) {
        config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    }
    return config;
}); //Автоматическая подстановка токена

$api.interceptors.response.use((config) => {
    return config
}, async (error) => { //если прилетела ошибка то запускаем эту функцию
    const originalRequest = error.config;
    // если сервера нет, error.response будет undefined
    if (!error.response) {
       console.error("Сервер не отвечает или ошибка сети");
       throw error;
    }
    
    // Проверяем если 401 ошибка и мы еще не пробовали обновиться
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            // Идем на бэкенд за новым токеном куки refreshToken улетит сама
            const response = await axios.post(`${API_URL}/auth/refresh`, { withCredentials: true });
            localStorage.setItem('token', response.data.accessToken);
            // Повторяем изначальный запрос
            return $api.request(originalRequest);
        } catch (e) {
            console.log('НЕ АВТОРИЗОВАН');
        }
    }
    throw error;
})

export default $api;