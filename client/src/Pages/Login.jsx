import React, {useContext, useState} from "react";
import { AuthContext, loginName } from "../Context/Context";
import '../style/Login-Registration.css'
import { Link,  useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import UserStore from "../store/UserStore";
import FormLogin from "../components/UI/Form/FormLogin";
import ErrorAlert from "../components/Alerts/ErrorAlert";

const Login = observer(() => {

    const { errorAlert, errorMessage } = UserStore;
    

    return(
        <div className="login-wrap">
            {errorAlert && <ErrorAlert>{errorMessage}</ErrorAlert>}
            <div className="login">
                <div className="logo">
                    <h1>MEMO</h1>
                </div>
                <FormLogin/>
            </div>
        </div>
    )
})

export default Login;