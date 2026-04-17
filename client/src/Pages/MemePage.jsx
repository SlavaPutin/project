import React, { useEffect, useState } from "react";
import SideBar from "../components/Sidebar/Sidebar";
import "../style/memePage.css"
import MemeForMemePage from "../components/memeForMemePage";
import Loader from "../components/UI/loader/Loader";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import PostStore from "../store/PostStore";
import ComentStore from "../store/ComentStore";

const MemePage = observer(()=> {

    const {id} = useParams()

    useEffect(() => {
       PostStore.GetOnePost(id) 
       ComentStore.fetchComents(id)
    }, [id])

    const [value, setValue] = useState('')

    
    const addComent = () => {
        if (value.length>0){
            ComentStore.writeComent(value, id)
            setValue('')
        }
    }
    

    const meme = PostStore.post 
    const coments = ComentStore.coments || []


    return(
            <div className='bodys'>
                <SideBar/>
                <div className='wrap-main'>
                    <div className="center-wrap">
                        <div className="pageMeme-wrap-constent">
                        {PostStore.isLoading || !meme || !coments
                            ? <Loader/>
                            : <MemeForMemePage meme={meme} coments={coments}/>  
                        }
                            <div className="wrap-write-coment">
                                <div className="wrap-write-content">
                                    <div className="center-input-write">
                                        <div className="wrap-inputandbtn-coment">
                                            <div className="wrap-inputandbtn-coment2">
                                                <div className="wrap-input-coment">
                                                    <textarea 
                                                        type="text"
                                                        className="input-coment"
                                                        placeholder="Написать коментарий..."
                                                        value={value}
                                                        onChange = {(e) => setValue(e.target.value)}
                                                    />
                                                    <button className="send-coment" onClick={addComent}>
                                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M17.7102 9.88001L13.4102 5.59001C13.0355 5.21751 12.5286 5.00842 12.0002 5.00842C11.4718 5.00842 10.9649 5.21751 10.5902 5.59001L6.29018 9.88001C6.10393 10.0674 5.99939 10.3208 5.99939 10.585C5.99939 10.8492 6.10393 11.1026 6.29018 11.29C6.38315 11.3837 6.49375 11.4581 6.61561 11.5089C6.73746 11.5597 6.86817 11.5858 7.00018 11.5858C7.13219 11.5858 7.2629 11.5597 7.38476 11.5089C7.50662 11.4581 7.61722 11.3837 7.71018 11.29L11.0002 8.00001V19C11.0002 19.2652 11.1055 19.5196 11.2931 19.7071C11.4806 19.8947 11.735 20 12.0002 20C12.2654 20 12.5198 19.8947 12.7073 19.7071C12.8948 19.5196 13.0002 19.2652 13.0002 19V8.00001L16.2902 11.29C16.4772 11.4783 16.7313 11.5846 16.9966 11.5856C17.262 11.5865 17.5169 11.482 17.7052 11.295C17.8935 11.108 17.9998 10.8539 18.0007 10.5885C18.0017 10.3232 17.8972 10.0683 17.7102 9.88001Z" fill="#151719"/>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                
                </div>
            </div>
    )
})

export default MemePage;