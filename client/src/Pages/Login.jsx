import React, {useContext, useState} from "react";
import MyButton from "../components/UI/Button/MyButton";
import MyInput from "../components/UI/MyInput/MyInput";
import { AuthContext, loginName } from "../Context/Context";
import '../style/Login.css'
import AuthService from "../services/authService.ts";

function Login() {
    const {isAuth, setIsAuth} = useContext(AuthContext)
    const {login, setLogin} = useContext(loginName)
    const [loginn, setLoginn] = useState('')
    const [password, setPassword] = useState('')

    const submit = async (event) => {
        event.preventDefault();
        if (loginn !== '' && password.length >= 5) {
            try {
                const response = await AuthService.login({ name: loginn, password });
                if (response && response.data) {
                    setIsAuth(true);
                    localStorage.setItem("token", response.data.accessToken);
                    setLogin(loginn);
                }
            } catch (error) {
                console.error("Ошибка при входе:", error.response?.data?.message || error.message);
                alert("Ошибка авторизации. Проверьте логин или пароль.");
            }
        } else {
            alert("Логин не может быть пустым, а пароль должен быть от 5 символов");
        }
    };

    return(
        <div className="Login">
            <h1>Страница для логина</h1>
            <form onSubmit={submit}>
                <MyInput type="text" placeholder="Name" value={loginn} onChange={(e) => setLoginn(e.target.value)} />
                <MyInput type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <MyButton>Log in</MyButton>
            </form>
        </div>
    )
};

export default Login;