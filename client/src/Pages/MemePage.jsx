import React, { useEffect, useMemo, useState } from "react";
import SideBar from "../components/Sidebar/Sidebar";
import "../style/memePage.css"
import MemeForMemePage from "../components/memeForMemePage";
import Loader from "../components/UI/loader/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import PostStore from "../store/PostStore";
import ComentStore from "../store/ComentStore";
import SuccessAlert from "../components/Alerts/SuccessAlert";
import ErrorAlert from "../components/Alerts/ErrorAlert";
import Menu from "../components/Menu/Menu";
import UserStore from "../store/UserStore";

const MemePage = observer(()=> {

    const {id} = useParams()
    const [width, setWidth] = useState(window.innerWidth);    
    const [value, setValue] = useState('')
    const { successAlert, successMessage } = ComentStore;
    const { errorAlert, errorMessage } = ComentStore;
    const meme = PostStore.post 
    const coments = ComentStore.coments || []
    const navigate = useNavigate()

    useEffect(() => {
       if(PostStore.posts.length == 0 ){
        PostStore.fetchPosts()
        UserStore.getUser()
       }
       PostStore.GetOnePost(id) 
       ComentStore.fetchComents(id)
    }, [id])

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [])


    const addComent = () => {
        if (value.length>0){
            ComentStore.writeComent(value, id)
            setValue('')
        }
    }
    
    const isMobile = width <= 1172;



    return(
            <div className='bodys'>
                {isMobile ? <Menu/> :<SideBar/>}
                {successAlert && <SuccessAlert>{successMessage}</SuccessAlert>}
                {errorAlert && <ErrorAlert>{errorMessage}</ErrorAlert>}
                <div className='wrap-main'>
                    <div className="center-wrap">
                        <div className="pageMeme-wrap-constent">
                            <button className="back" onClick={() => navigate('/')}>
                                <svg width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_403_3210)">
                                <path d="M0.880168 14.09L4.75017 18C4.84313 18.0938 4.95373 18.1681 5.07559 18.2189C5.19745 18.2697 5.32816 18.2958 5.46017 18.2958C5.59218 18.2958 5.72289 18.2697 5.84474 18.2189C5.9666 18.1681 6.0772 18.0938 6.17017 18C6.2639 17.9071 6.33829 17.7965 6.38906 17.6746C6.43983 17.5527 6.46597 17.422 6.46597 17.29C6.46597 17.158 6.43983 17.0273 6.38906 16.9054C6.33829 16.7836 6.2639 16.673 6.17017 16.58L2.61017 13H23.0002C23.2654 13 23.5197 12.8947 23.7073 12.7071C23.8948 12.5196 24.0002 12.2652 24.0002 12C24.0002 11.7348 23.8948 11.4805 23.7073 11.2929C23.5197 11.1054 23.2654 11 23.0002 11H2.55017L6.17017 7.38002C6.34746 7.19405 6.44636 6.94696 6.44636 6.69002C6.44636 6.43308 6.34746 6.186 6.17017 6.00002C6.0772 5.90629 5.9666 5.8319 5.84474 5.78113C5.72289 5.73036 5.59218 5.70422 5.46017 5.70422C5.32816 5.70422 5.19745 5.73036 5.07559 5.78113C4.95373 5.8319 4.84313 5.90629 4.75017 6.00002L0.880168 9.85002C0.318366 10.4125 0.00280762 11.175 0.00280762 11.97C0.00280762 12.765 0.318366 13.5275 0.880168 14.09Z" fill="rgba(255, 255, 255, 1)"/>
                                </g>
                                <defs>
                                <clipPath id="clip0_403_3210">
                                <rect width="24" height="24" fill="white"/>
                                </clipPath>
                                </defs>
                                </svg>

                            </button>
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