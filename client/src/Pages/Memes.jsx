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
import SuccessAlert from '../components/Alerts/SuccessAlert.jsx';
import ErrorAlert from '../components/Alerts/ErrorAlert.jsx';
import Menu from '../components/Menu/Menu.jsx';


const MemesPage = observer(() => {

  const [width, setWidth] = useState(window.innerWidth);
  const { successAlert, successMessage } = PostStore;
  const { errorAlert, errorMessage } = PostStore;

  useEffect(() => {
    PostStore.fetchPosts();
    UserStore.getUser();
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const isMobile = width <= 1172;

  return (
      <div className='bodys'>
        {isMobile ? <Menu/> :<SideBar/>}
        {successAlert && <SuccessAlert>{successMessage}</SuccessAlert>}
        {errorAlert && <ErrorAlert>{errorMessage}</ErrorAlert>}
        <div className='wrap-main'>
        {PostStore.isLoading || !PostStore.posts 
          ? <Loader/>
          : <Lenta memes={PostStore.posts} isMobile={isMobile}/>   
        }
        </div>
      </div>
      
  );
})

export default MemesPage;