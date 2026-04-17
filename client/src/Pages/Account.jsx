import React, {useContext, useEffect, useState} from "react";
import '../style/Account.css'
import SideBar from "../components/Sidebar/Sidebar";
import { observer } from "mobx-react-lite";
import UserStore from "../store/UserStore";
import { useParams } from "react-router-dom";
import Create from "../components/Lenta/Create";
import Meme from "../components/Meme";
import Loader from "../components/UI/loader/Loader";

const Account = observer(() => {

    const isLoading = UserStore.isLoading
    const [likesPosts, setLikesPosts] = useState("posts")


    const { id } = useParams(); 
    const memes = UserStore.user.posts || []
    const likedMemes = UserStore.user.likedPosts || []    
    const currentMemes = likesPosts === "posts" ? memes : likedMemes;


    const handleUpdateLike = (postId, likesCount, isLiked) => {
        const post = UserStore.user.posts?.find(p => p.id === postId);
        if (post) {
            post.like = likesCount;
            post.isLikedByMe = isLiked;
        }
        const likedPost = UserStore.user.likedPosts?.find(p => p.id === postId);
        if (likedPost) {
            likedPost.like = likesCount;
            likedPost.isLikedByMe = isLiked;
            UserStore.user.likedPosts = UserStore.user.likedPosts?.filter(p => p.id !== postId);
        }
    };

    useEffect(() => {
        UserStore.getProfile(id)
    }, [id])

    const switchLikeToPosts = () => {
        setLikesPosts('posts')
    }

    const switchPostsToLike = () => {
        setLikesPosts('likes')
    }

    const focusStyle = {
    transform: likesPosts === 'posts' ? 'translateX(0%)' : 'translateX(100%)',
    };
    
    return(
        <div className="bodys">
            <SideBar/>
            <div className="wrap-main">
                <div className="center-wrap">
                   <div className="wrap-center-content">
                        {isLoading 
                            ? <Loader /> 
                            : (
                                <> 
                                    <div className="block-bg-acc"></div>
                                    <div className="wrap-info">
                                        <div className="wrap-avatar-redact">
                                            <div className="avatar-acc">
                                                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g clip-path="url(#clip0_405_1531)">
                                                <path d="M11.4524 14.0188C7.19063 14.404 3.94378 18.0051 4.00036 22.2838V22.5008C4.00036 23.3292 4.67194 24.0008 5.50036 24.0008C6.32878 24.0008 7.00036 23.3292 7.00036 22.5008V22.2238C6.95527 19.5967 8.89402 17.3564 11.5004 17.0238C14.2516 16.751 16.7031 18.7601 16.9759 21.5114C16.9921 21.674 17.0002 21.8373 17.0003 22.0008V22.5008C17.0003 23.3292 17.6719 24.0008 18.5003 24.0008C19.3288 24.0008 20.0003 23.3292 20.0003 22.5008V22.0008C19.9955 17.5775 16.4057 13.9957 11.9825 14.0006C11.8057 14.0008 11.6288 14.0069 11.4524 14.0188Z" fill="rgba(255, 255, 255, .5)"/>
                                                <path d="M12.0004 12C15.3141 12 18.0004 9.31369 18.0004 6C18.0004 2.68631 15.3141 0 12.0004 0C8.68668 0 6.00037 2.68631 6.00037 6C6.00365 9.31233 8.68804 11.9967 12.0004 12ZM12.0004 3C13.6572 3 15.0004 4.34316 15.0004 6C15.0004 7.65684 13.6572 9 12.0004 9C10.3435 9 9.00037 7.65684 9.00037 6C9.00037 4.34316 10.3435 3 12.0004 3Z" fill="rgba(255, 255, 255, .5)"/>
                                                </g>
                                                <defs>
                                                <clipPath id="clip0_405_1531">
                                                <rect width="24" height="24" fill="white"/>
                                                </clipPath>
                                                </defs>
                                                </svg>
                                            </div>
                                            <div className="wrap-redact">
                                                <button type="button" className="redact">Редактировать</button>
                                            </div>
                                        </div>
                                        <div className="name-acc">
                                            <span>{UserStore.user.name}</span>
                                        </div>
                                    </div>
                                    <div className="wrap-posts-likes-btn">
                                        <div className="focusonbtn" style={focusStyle}></div>
                                        <button className="posts-btn" onClick={switchLikeToPosts}>Посты</button>
                                        <button className="likes-btn" onClick={switchPostsToLike}>Лайки</button>
                                    </div>
                                    <Create />
                                    {currentMemes.length > 0 
                                        ? <div className="wrap-memes">
                                            {currentMemes.map(meme => <Meme key={meme.id} meme={meme} onLikeSuccess={handleUpdateLike} />)}
                                        </div>
                                        : <div className="wrap-error"><span>Тут пока пусто</span></div>
                                    }
                                </> 
                            ) 
                        }
                    </div>
                </div>
            </div>
        </div>
    )
})

export default Account