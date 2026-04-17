import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import './style/App.css';
import './style/Header.css';
import './style/Lenta.css';
import AppRouter from "./Routes/AppRoutes";
import { AuthContext, loginName } from "./Context/Context";

function App() {
  const [isAuth, setIsAuth] = useState(false)
  const [login, setLogin] =useState('')
  useEffect(() => {
    if(localStorage.getItem('token')) {
      setIsAuth(true);
    }
  }, [])


  return (  
    <loginName.Provider value={{
                login,
                setLogin
            }}>
    <AuthContext.Provider value={{
      isAuth, 
      setIsAuth
    }}>
      <BrowserRouter>
        <AppRouter/>
      </BrowserRouter>
    </AuthContext.Provider></loginName.Provider>
  );
};

export default App;
