import React, {useContext, useState} from "react";
import MyButton from "../components/UI/Button/MyButton";
import MyInput from "../components/UI/MyInput/MyInput";
import { AuthContext, loginName } from "../Context/Context";
import '../style/Login.css'

function Login() {
    const {isAuth, setIsAuth} = useContext(AuthContext)
    const {login, setLogin} = useContext(loginName)
    const [loginn, setLoginn] = useState('')
    const [password, setPassword] = useState('')
    const submit = (event) => {
        event.preventDefault();
        if(loginn !='' && password.length >= 8){
        setIsAuth(true);
        localStorage.setItem("auth", "true");
        setLogin(loginn);
    }
        
    }

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