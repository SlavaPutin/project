import { makeAutoObservable, runInAction } from "mobx";
import $api from "../http/index.ts";

class PostStore {
    posts = [];
    isLoading = true;
    post = {};
    

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
        } catch (e) {
            console.error("Не удалось поставить лайк");
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
                this.addPost(data)
            })
        } catch(e){
            console.error("Не удалось создать пост", e);
        }
    }

    async deletePost(id){
        try{
            await $api.post(`/post/delete/${id}`)
            runInAction(() => {
                this.posts = this.posts.filter(post => post.id !== id);
            })
        } catch(e){
            console.error("Пост не удалось удалить", e)
        }
    } 

    async GetOnePost(id){
        this.isLoading= true
        try{
            const {data} = await $api.get(`/post/${id}`)
            runInAction(() => {
                this.post = data
                this.isLoading = false
            })
        }catch(e){
            console.error("Не удалосб загрузить пост", e)
        }
    }
}

export default new PostStore();
