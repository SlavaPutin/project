import React, {useContext} from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { privateRouts, publicRouts } from "./route";
import { AuthContext } from "../Context/Context";
import { observer } from "mobx-react-lite";
import UserStore from "../store/UserStore";

const AppRouter = observer(() => {
    const isAuth = UserStore.isAuth
    return(
        isAuth
        ? <Routes>
            {privateRouts.map(route =>
            <Route 
            Component={route.Component} 
            path={route.path} 
            exact={route.exact}
            key = {route.path}
            />
            )}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        : <Routes>
            {publicRouts.map(route =>
               <Route 
            Component={route.Component} 
            path={route.path} 
            exact={route.exact}
            key = {route.path}
            /> 
            )}
            <Route path='*' element={<Navigate to='/login'/>}/>
            </Routes>
    )
})

export default AppRouter;