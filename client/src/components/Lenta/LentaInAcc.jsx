import { observer } from "mobx-react-lite"
import Meme from "../Meme"
import Create from "./Create"


const LentaInAcc = observer(({memes, onLikeSuccess, isMatch}) => {

    return(
        <div className="center-wrap" style={{paddingTop: 0}}>
            <div className="wrap-center-content">  
                <div className="wrap-memes">
                    {memes.map(meme => (
                        <Meme key={meme.id} meme={meme} onLikeSuccess={onLikeSuccess} isMatch={isMatch}/>
                    ))}       
                </div> 
            </div>
            
        </div>
    )
})

export default LentaInAcc