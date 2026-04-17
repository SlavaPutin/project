import React from "react";
import cl from './Plus.module.css'

const Plus = (props) =>{
    return(<button className={cl.plus} {...props}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect y="8" width="20" height="4" rx="2" fill="#E4E4E4"/>
        <rect x="8" width="4" height="20" rx="2" fill="#E4E4E4"/>
        </svg>
    </button>)
}

export default Plus;
