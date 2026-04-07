import React, { Children } from "react";
import cl from './CreateMeme.module.css'
import MyButton from "../Button/MyButton";

const CreateMeme = ({children, visible, setVisible}) =>{

    const ClassRoot = [cl.BackCreate]
    if (visible === true){
        ClassRoot.push(cl.active);
    }

    return(
        <div className={ClassRoot.join(' ')} onClick={() => setVisible(false)}>
            <div className={cl.wrapContent} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
};

export default CreateMeme;