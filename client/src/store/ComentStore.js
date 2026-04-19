import { makeAutoObservable, runInAction } from "mobx";
import $api from "../http/index.ts";

class ComentStore {
    coments = [];
    errorAlert = false;
    errorMessage = '';
    successAlert = false;
    successMessage = '';
    

    constructor() {
        makeAutoObservable(this);
    }

    async fetchComents(postId){
        this.isLoading = true
        try{
            const {data} = await $api.get(`/coment/${postId}`)

            runInAction(() => {
                this.coments = data.sort((a, b) => b.id - a.id)
            })
        } catch(error){
            throw error;
        }
    }

    async writeComent(text, postId){
        try{
            await $api.post( `/coment/${postId}`, {content: text});
            await this.fetchComents(postId);
            runInAction(() => {
                this.successAlert = true
                this.successMessage = "Коментарий оставлен"
                setTimeout(() => {
                    this.successAlert = false;
                }, 5000);
            })
        } catch(e){
            console.error("Не удалось оставить комментарий", e)
        }
    }

    async likeComent(comentId){
        try {
            const { data } = await $api.post(`/coment/${comentId}/like`);
            runInAction(() => {
                const coment = this.coments.find(c => c.id === comentId);
                if (coment) {
                    coment.like = data.likesCount; // обновляем из ответа бэкенда
                    coment.isLikedByMe = data.liked;
                }
            });
            return data
        } catch (e) {
            console.error("Не удалось поставить лайк");
        }
    }

    async deleteComent(comentId){
        try{
            await $api.post(`/coment/remove/${comentId}`)
            runInAction(() => {
                this.coments = this.coments.filter(coment => coment.id !== comentId);
            })
        } catch(error){
            runInAction(() => {
                this.errorAlert = true;
                this.errorMessage = error.response?.data?.message || "Ошибка при удалении коментария";
            });
            console.error("Коментарий не удалось удалить:", error.response?.data?.message || error.message);
            setTimeout(() => {
                this.errorAlert = false;
            }, 5000);
            throw error;
        }
    }
}

export default new ComentStore();
