import React, {useContext} from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { privateRouts, publicRouts } from "./route";
import { AuthContext } from "../Context/Context";

const AppRouter = () => {

    const {isAuth, setIsAuth} = useContext(AuthContext)

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
            <Route path="*" element={<Navigate to="/memes" />} />
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
}

export default AppRouter;