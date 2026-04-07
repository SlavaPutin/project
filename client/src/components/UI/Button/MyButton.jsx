import React from "react";
import cl from './MyButton.module.css'

const MyButton = ({children, ...props}) =>{
    return(
        <button className={cl.mybtn} {...props}>
            {children}
        </button>
    )
};

export default MyButton