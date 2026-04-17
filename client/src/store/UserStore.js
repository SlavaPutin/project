import { makeAutoObservable, runInAction } from "mobx";
import $api from "../http/index.ts";

class UserStore {
    user = {};
    isAuth = false;
    isLoading = false;

    constructor() {
    const token = localStorage.getItem('token');
    if (token) {
        this.isAuth = true;
    }
    
    makeAutoObservable(this);
}

    setAuth(bool) {
        this.isAuth = bool;
    }

    setUser(user) {
        this.user = user;
    }

    setLoading(bool) {
        this.isLoading = bool;
    }

    async getProfile(id) {
        this.isLoading = true;
        try {
            const { data } = await $api.get(`auth/${id}`);
            
            runInAction(() => {
                // Создаем Set из ID лайкнутых постов для быстрого поиска
                const likedIds = new Set(data.likedPosts?.map(p => p.id));

                // Проставляем isLikedByMe для обычных постов
                if (data.posts) {
                    data.posts = data.posts.map(post => ({
                        ...post,
                        isLikedByMe: likedIds.has(post.id)
                    }));
                }

                // Для самих лайкнутых постов это всегда true
                if (data.likedPosts) {
                    data.likedPosts = data.likedPosts.map(post => ({
                        ...post,
                        isLikedByMe: true
                    }));
                }

                this.user = data;
                this.isLoading = false;
            });
        } catch (e) {
            runInAction(() => this.isLoading = false);
            console.error(e);
        }
    }

    async logout() {
        try{
            await $api.post("/auth/logout")
            runInAction(() => {
            this.user = {};
            this.isAuth = false;
            localStorage.removeItem('token');
            localStorage.removeItem('auth');})
        } catch(e){
            console.error("Ошибка при выходе", e);
        }
        
    }

    async registration(name, password) {
        this.isLoading = true;
        try {
            const response = await $api.post("/auth/registration", { name, password });
            runInAction(() => {
                this.user = response.data.user;
                this.isAuth = true;
                localStorage.setItem("token", response.data.refreshToken);
                localStorage.setItem("auth", true);
            });
            return response
        } catch (error) {
            console.error("Ошибка регистрации:", error.response?.data?.message || error.message);
            throw error;
        } finally {
            runInAction(() => {
                this.isLoading = false;
            });
        }
    }

    async login(name, password) {
        this.isLoading = true;
        try {
            const response = await $api.post("/auth/login", { name, password });
            runInAction(() => {
                this.user = response.data.user;
                this.isAuth = true;
                localStorage.setItem("token", response.data.accessToken);
                localStorage.setItem("auth", true);
            });
            
            return response
        } catch (error) {
            console.error("Ошибка регистрации:", error.response?.data?.message || error.message);
            throw error;
        } finally {
            runInAction(() => {
                this.isLoading = false;
            });
        }
    }
}

export default new UserStore();
