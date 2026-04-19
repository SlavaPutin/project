import React, {useContext, useState} from "react";
import MyButton from "../components/UI/Button/MyButton";
import MyInput from "../components/UI/MyInput/MyInput";
import { AuthContext, loginName } from "../Context/Context";
import '../style/Login-Registration.css'
import { Link, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import UserStore from "../store/UserStore.js";
import FormRegis from "../components/UI/Form/FormRegis.jsx";
import ErrorAlert from "../components/Alerts/ErrorAlert.jsx";

const Registration = observer(() => {
    
    const { errorAlert, errorMessage } = UserStore;

    return(
        <div className="login-wrap">
            {errorAlert && <ErrorAlert>{errorMessage}</ErrorAlert>}   
            <div className="login">
                <div className="logo">
                    <h1>MEMO</h1>
                </div>
                <FormRegis/>
            </div>
        </div>
    )})

export default Registration;