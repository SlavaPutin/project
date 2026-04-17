import React from "react";
import Meme from "./Meme";
import "./meme.css"
import Coments from "./Coment/Coment";


const MemeForMemePage = ({meme, coments}) => {
    return(<div className="wrap-meme-and-coments">
        <Meme meme={meme}/>
        <Coments coments={coments}/>
    </div>
    )
}

export default MemeForMemePage;