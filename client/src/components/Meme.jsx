import React, {useEffect} from "react";
import MyButton from "./UI/Button/MyButton";
import Like from "./UI/Like/Like";
import { API_URL } from "../http/index.ts";

const Meme = ({img, like, setLike, title, id}) => {

    const serverUrl = API_URL + '/'; 
    const fullImgUrl = serverUrl + img;
    
    

    return(
        <div className='meme' >
            <div></div>
            <div className="wpar-info">
                <img src={fullImgUrl} className='img-meme'/>
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