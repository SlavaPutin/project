import React from "react"
import MyButton from "../UI/Button/MyButton"
import Meme from "../Meme"


const Lenta = ({memes, setLike}) => {
    return(
        <div className='lenta'>
            {memes.map(meme =>
              <Meme id={meme.id} key={meme.id} title={meme.title} img={meme.image} like={meme.like} setLike={setLike}/>
            )}       
        </div>
    )
}

export default Lenta