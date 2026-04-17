import React from "react";
import'./MyButton.css'

const MyButton = ({children, ...props}) =>{
    return(
        <button className="mybtn" {...props}>
            {children}
        </button>
    )
};

export default MyButton