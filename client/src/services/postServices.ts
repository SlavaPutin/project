import $api, { API_URL } from "../http/index.ts";


class PostService{

    static async fetchPosts(){
        return $api.get(`${API_URL}/post`)
    }
}

export default PostService