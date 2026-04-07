import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import './style/App.css';
import './style/Header.css';
import './style/Lenta.css';
import AppRouter from "./Routes/AppRoutes";
import Header from './components/Header/Header'
import MyButton from './components/UI/Button/MyButton';
import Plus from './components/UI/Plus/Plus';
import Lenta from './components/Lenta/Lenta';
import CreateMeme from './components/UI/CreateMeme/CreateMeme';
import Form from './components/UI/Form/Form';
import MyInput from './components/UI/MyInput/MyInput';
import MySelecter from './components/UI/Selecter/MySelecter';
import { useSort } from './hooks/UseSort';
import SortAndSearch from './components/SortandSearch/SortAndSearch';
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
        <Header/>
        <AppRouter/>
      </BrowserRouter>
    </AuthContext.Provider></loginName.Provider>
  );
};

export default App;
