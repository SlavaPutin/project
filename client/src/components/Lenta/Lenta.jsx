import Meme from "../Meme"
import Create from "./Create"


const Lenta = ({memes}) => {

    return(
        <div className="center-wrap">
            <div className="wrap-center-content">
                <Create/>    
                <div className="wrap-memes">
                    {memes.map(meme => (
                        <Meme key={meme.id} meme={meme}/>
                    ))}       
                </div> 
            </div>
            
        </div>
    )
}

export default Lenta