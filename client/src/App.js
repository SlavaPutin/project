import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import './style/App.css';
import './style/Header.css';
import './style/Lenta.css';
import AppRouter from "./Routes/AppRoutes";
import { AuthContext, loginName } from "./Context/Context";
import { observer } from "mobx-react-lite";

const App = observer(() => {
  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    if(localStorage.getItem('token')) {
      setIsAuth(true);
    }
  }, [])


  return (  
    <AuthContext.Provider value={{
      isAuth, 
      setIsAuth
    }}>
      <BrowserRouter>
        <AppRouter/>
      </BrowserRouter>
    </AuthContext.Provider>
  );
})

export default App;
