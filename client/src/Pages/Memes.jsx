import { useEffect, useMemo, useState } from 'react';
import '../style/App.css'
import '../style/Header.css'
import '../style/Lenta.css'
import "../svg/profile-svgrepo-com.svg"
import "../style/sidebar.css"
import Lenta from '../components/Lenta/Lenta';
import { useSort } from '../hooks/UseSort';
import SideBar from '../components/Sidebar/Sidebar.jsx';
import { observer } from 'mobx-react-lite';
import PostStore from '../store/PostStore.js';
import Loader from '../components/UI/loader/Loader.jsx';
import UserStore from '../store/UserStore.js';


const MemesPage = observer(() => {
  useEffect(() => {
    PostStore.fetchPosts();
    UserStore.getUser();
  }, [])

  return (
      <div className='bodys'>
        <SideBar/>
        <div className='wrap-main'>
        {PostStore.isLoading || !PostStore.posts 
          ? <Loader/>
          : <Lenta memes={PostStore.posts}/>   
        }
        </div>
      </div>
      
  );
})

export default MemesPage;