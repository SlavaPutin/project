import { observer } from "mobx-react-lite"
import Meme from "../Meme"
import Create from "./Create"


const Lenta = observer(({memes, isMobile}) => {

    return(
        <div className="center-wrap" >
            <div className="wrap-center-content">
                {!isMobile && <Create/>}    
                <div className="wrap-memes">
                    {memes.map(meme => (
                        <Meme key={meme.id} meme={meme} />
                    ))}       
                </div> 
            </div>
            
        </div>
    )
})

export default Lenta