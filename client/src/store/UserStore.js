import { makeAutoObservable, runInAction } from "mobx";
import $api from "../http/index.ts";

class UserStore {
    I = {};
    user = {};
    isAuth = false;
    isLoading = false;
    users = [];
    errorAlert = false;
    errorMessage = '';

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

    setError(message) {
        runInAction(() => {
            this.errorAlert = true;
            this.errorMessage = message;
        });
        setTimeout(() => {
            runInAction(() => { this.errorAlert = false; });
        }, 5000);
    }

    async getProfile(id) {
        this.isLoading = true;
        try {
            const { data } = await $api.get(`auth/${id}`);
            
            runInAction(() => {
                const mapPosts = (posts) => posts?.map(p => ({
                    ...p,
                    isLikedByMe: !!(p.likedBy && p.likedBy.length > 0)
                }));
                data.posts = mapPosts(data.posts);
                data.likedPosts = mapPosts(data.likedPosts);

                this.user = data;
                this.isLoading = false;
            });
        } catch (e) {
            runInAction(() => this.isLoading = false);
            console.error("Ошибка при получении профиля", e);
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
                localStorage.setItem("token", response.data.accessToken);
                localStorage.setItem("auth", true);
            });
            return response
        } catch (error) {
            runInAction(() => {
                this.errorAlert = true;
                this.errorMessage = error.response?.data?.message || "Ошибка регистрации";
            });
            console.error("Ошибка регистрации:", error.response?.data?.message || error.message);
            setTimeout(() => {
                this.errorAlert = false;
            }, 5000);
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
            runInAction(() => {
                this.errorAlert = true;
                this.errorMessage = error.response?.data?.message || "Ошибка входа";
            });
            console.error("Ошибка входа:", error.response?.data?.message || error.message);
            setTimeout(() => {
                this.errorAlert = false;
            }, 5000);
            throw error;
        } finally {
            runInAction(() => {
                this.isLoading = false;
            });
        }
    }

    async getUser(){
        try{
            const {data} = await $api.get('/users/one')
            runInAction(() => {
                this.I = data
            })
        } catch(e){
            console.error("Ошибка при получение данных")
        }
    }

    async getAllUser(){
        try{
            const {data} = await $api.get('/users')
            runInAction(() => {
                this.users = data
            })
        } catch(e){
            console.error("Ошибка при получение данных")
        }
    }

    async updateName(name){
        try{
            const {data} = await $api.put('/users/name', { name})
            runInAction(() => {
                this.I.name = data.name
            })
        }catch(e){
            console.error("Не удалось обновить имя", e)
        }
    }

    get isAdmin() {
        return this.I?.role?.some(role => role.value === 'ADMIN') || false;
    }
}

export default new UserStore();
