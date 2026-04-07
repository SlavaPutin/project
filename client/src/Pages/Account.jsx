import React, {useContext} from "react";
import MyButton from "../components/UI/Button/MyButton";
import { AuthContext, loginName } from "../Context/Context";
import { Link } from "react-router-dom";
import '../style/Account.css'
import AuthService from "../services/authService.ts";

function Account() {
    const {isAuth, setIsAuth} = useContext(AuthContext)
    const {login, setLogin} = useContext(loginName)
    const leave = async (e) => {
        e.preventDefault();
        try {
            await AuthService.logout();
            await setIsAuth(false)
        } catch (e) {
            console.log("Сессия на сервере уже могла истечь");
        }
    }

    return(
        <div className="acc-wrap-content">
            <div className="acc-info">
                <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.2166 19.3323C15.9349 17.9008 14.0727 17 12 17C9.92734 17 8.06492 17.9008 6.7832 19.3323M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21ZM12 14C10.3431 14 9 12.6569 9 11C9 9.34315 10.3431 8 12 8C13.6569 8 15 9.34315 15 11C15 12.6569 13.6569 14 12 14Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
            <h2>{login}</h2>
            <Link to=''>Your memes</Link>
            <Link to=''>Likes</Link>
            </div>
            <div className="wrap-leave">
            <MyButton onClick={leave}>
                Leave
            </MyButton></div>
        </div>
    )
}

export default Account