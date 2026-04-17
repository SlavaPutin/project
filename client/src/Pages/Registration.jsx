import React, {useContext, useState} from "react";
import MyButton from "../components/UI/Button/MyButton";
import MyInput from "../components/UI/MyInput/MyInput";
import { AuthContext, loginName } from "../Context/Context";
import '../style/Login-Registration.css'
import { Link, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import UserStore from "../store/UserStore.js";
import FormRegis from "../components/UI/Form/FormRegis.jsx";

const Registration = observer(() => {
    

    return(
        <div className="login-wrap">
            <div className="login">
                <div className="logo">
                    <h1>MEMO</h1>
                </div>
                <FormRegis/>
            </div>
        </div>
    )})

export default Registration;