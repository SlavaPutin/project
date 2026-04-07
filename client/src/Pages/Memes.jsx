import { useEffect, useMemo, useState } from 'react';
import Header from '../components/Header/Header';
import '../style/App.css'
import '../style/Header.css'
import '../style/Lenta.css'
import "../svg/profile-svgrepo-com.svg"
import MyButton from '../components/UI/Button/MyButton';
import Plus from '../components/UI/Plus/Plus';
import Lenta from '../components/Lenta/Lenta';
import CreateMeme from '../components/UI/CreateMeme/CreateMeme';
import Form from '../components/UI/Form/Form';
import MyInput from '../components/UI/MyInput/MyInput';
import MySelecter from '../components/UI/Selecter/MySelecter';
import { useSort } from '../hooks/UseSort';
import SortAndSearch from '../components/SortandSearch/SortAndSearch';
import PostService from '../services/postServices.ts';


function MemesPage() {
  const [memes, setMemes]= useState([]);
  const [modal, setModal] = useState(false);
  const[query, setQuery] = useState('');
  const [sort, setSort] = useState('');

  useEffect(() => {
    const loadPosts = async () => {
      try{
        const response = await PostService.fetchPosts()
        setMemes(response.data)
      } catch(e){
        console.error("Ошибка загрузки:", e)
      }
    }
    loadPosts();
  }, [])


  const SortMeme = useSort(memes, sort, query);

  const likes = (likesCount, id) => {
    
    setMemes(memes.map(meme => 
            meme.id == id ? { ...meme, like: likesCount } : meme
        )
    );
  };

  

  const Create = (meme) => {
    setMemes([meme, ...memes]);
    setModal(false);
  }

  return (
      <div className='bodys'>
        <SortAndSearch query={query} setQuery={setQuery} sort={sort} setSort={setSort}/>
        <Lenta memes={SortMeme} setLike={likes}/>
        <Plus onClick = {() => setModal(true)}/>
          <CreateMeme visible={modal} setVisible={setModal}>
            <Form create={Create}/>
          </CreateMeme>      
      </div>
      
  );
};

export default MemesPage;