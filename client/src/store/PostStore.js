import { makeAutoObservable, runInAction } from "mobx";
import $api from "../http/index.ts";

class PostStore {
    posts = [];
    isLoading = true;
    post = {};
    errorAlert = false;
    errorMessage = '';
    successAlert = false;
    successMessage = '';
    

    constructor() {
        makeAutoObservable(this);
    }

    //загрузка постов с сервера
    async fetchPosts() {
        try {
            const { data } = await $api.get('/post');
            // В mobx после await изменения стейта должны быть в runInAction
            runInAction(() => {
                this.posts = data.sort((a, b) => b.id - a.id);
                this.isLoading = false;

            });
        } catch (e) {
            console.error("Ошибка при загрузке постов", e);
            runInAction(() => this.isLoading = false);
        }
    }

    // Добавление нового поста в начало ленты
    addPost(post) {
        this.posts.unshift(post);
    }

    async likePost(postId) {
        try {
            const { data } = await $api.post(`/post/${postId}/like`);
            runInAction(() => {
                const post = this.posts.find(p => p.id === postId);
                if (post) {
                    post.like = data.likesCount; // обновляем из ответа бэкенда
                    post.isLikedByMe = data.liked;
                }
            });
            return data
        } catch (error) {
            runInAction(() => {
                this.errorAlert = true;
                this.errorMessage = error.response?.data?.message || "Ошибка при постановке лайка";
            });
            console.error("Не удалось поставить лайк:", error.response?.data?.message || error.message);
            setTimeout(() => {
                this.errorAlert = false;
            }, 5000);
            throw error;
        }
    }

    async createPost(title, imageFile){
        try{
            const formData = new FormData();
            formData.append('title', title); // Добавляем текст
            formData.append('image', imageFile); // Добавляем файл
            const { data } = await $api.post('/post', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data' // Важно для файлов
                }
            
            });
            runInAction(() => {
                this.fetchPosts()
                this.successAlert = true
                this.successMessage = "Мем создан"
                setTimeout(() => {
                    this.successAlert = false;
                }, 5000);
            })
        } catch(e){
            console.error("Не удалось создать пост", e);
        }
    }

    async deletePost(id){
        try{
            const {data} = await $api.post(`/post/delete/${id}`)
            runInAction(() => {
                this.posts = this.posts.filter(post => post.id !== id);
                this.successAlert = true
                this.successMessage = "Мем удален"
                setTimeout(() => {
                    this.successAlert = false;
                }, 5000);
            })
        } catch(error){
            runInAction(() => {
                this.errorAlert = true;
                this.errorMessage = error.response?.data?.message || "Ошибка при удалении мема";
            });
            console.error("Мем не удалось удалить:", error.response?.data?.message || error.message);
            setTimeout(() => {
                this.errorAlert = false;
            }, 5000);
            throw error;
        }
    }
    
    async deletePostAdmin(id){
        try{
            const {data} = await $api.post(`/post/admin/delete/${id}`)
            runInAction(() => {
                this.posts = this.posts.filter(post => post.id !== id);
                this.successAlert = true
                this.successMessage = "Мем удален"
                setTimeout(() => {
                    this.successAlert = false;
                }, 5000);
            })
        } catch(error){
            runInAction(() => {
                this.errorAlert = true;
                this.errorMessage = error.response?.data?.message || "Ошибка при удалении мема";
            });
            console.error("Мем не удалось удалить:", error.response?.data?.message || error.message);
            setTimeout(() => {
                this.errorAlert = false;
            }, 5000);
            throw error;
        }
    }

    async GetOnePost(id){
        this.isLoading= true
        try{
            const {data} = await $api.get(`/post/${id}`)
            runInAction(() => {
                const postInLenta = this.posts.find(p => p.id === Number(id));
                if (postInLenta) {
                    data.isLikedByMe = postInLenta.isLikedByMe;
                } else {
                    data.isLikedByMe = false; 
                }
                this.post = data
                this.isLoading = false
            })
        }catch(e){
            console.error("Не удалосб загрузить мем", e)
        }
    }
}

export default new PostStore();
