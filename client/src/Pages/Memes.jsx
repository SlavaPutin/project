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

function MemesPage() {
  const [memes, setMemes]= useState([
    {id: 1, title: 'Pepe', img:'https://avatars.mds.yandex.net/i?id=6c3da179033788d27279314db3382f93_l-5226501-images-thumbs&n=13', like: 279 },
    {id: 2, title: 'Chill guy', img:'https://cdn.sportmaster.ru/upload/content/mediahab/prod/be279142-3a96-4081-aac2-956fcf3c6d91.jpg', like: 888 },
    {id: 3, title: 'Kat', img:'https://i.pinimg.com/originals/cf/f8/fc/cff8fc7c8c6130be56e1bb0feac88f4e.png?nii=t', like: 888 }
  ]);
  const [modal, setModal] = useState(false);
  const[query, setQuery] = useState('');
  const [sort, setSort] = useState('');

  const SortMeme = useSort(memes, sort, query);

  const likes = (likesCount, id) => {
    
    setMemes(memes.map(meme => 
            meme.id == id ? { ...meme, like: likesCount } : meme
        )
    );
    console.log(memes, id, typeof id, likesCount)
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