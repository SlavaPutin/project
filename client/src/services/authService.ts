import $api, { API_URL } from "../http/index.ts";


class AuthService{

    static async login(formData: object){
        return $api.post(`${API_URL}/auth/login`, formData)
    }
}

export default AuthService