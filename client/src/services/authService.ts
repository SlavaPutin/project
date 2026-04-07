import $api, { API_URL } from "../http/index.ts";


class AuthService{

    static async login(formData: object){
        return $api.post(`${API_URL}/auth/login`, formData)
    }

    static async registration(formData: object){
        return $api.post(`${API_URL}/auth/registration`, formData)
    }

    static async logout(){
        return $api.post(`${API_URL}/auth/logout`)
    }
}

export default AuthService