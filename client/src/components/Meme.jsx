import React from "react";
import MyButton from "./UI/Button/MyButton";
import Like from "./UI/Like/Like";

const Meme = ({img, like, setLike, title, id}) => {
    return(
        <div className='meme' >
            <div></div>
            <div className="wpar-info">
                <img src={img} className='img-meme'/>
                <h3>{title}</h3>
            </div>
            <div className="wrap-btns">
                <MyButton >Read</MyButton>
                <Like like={like} setLike={setLike} id={id}/>
            </div>
        </div>
    )
}

export default Meme;