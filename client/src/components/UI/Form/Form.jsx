import React, { useState } from "react";
import MyInput from "../MyInput/MyInput";
import MyButton from "../Button/MyButton";
import validator from 'validator'
import Like from "../Like/Like";


const Form = ({create}) => {

    const [meme, setMeme] = useState({img: '', title: ''})
    const [error, setError] = useState('');


    const addMeme = (e) => {
        e.preventDefault();
        const newMeme = {
            ...meme, id: Date.now(), like: 0
        };

        if(meme.img !='' && meme.title !='' &&  validator.isURL(meme.img) ) {
            create(newMeme);
            setMeme({img: '', title: ''});
        };
    };


    return(
        <form>
            <MyInput 
            type="url" 
            placeholder="Вставьте ссылку"
            onChange = {(e) => setMeme({...meme, img: e.target.value})}
            value = {meme.img}
            />

            <MyInput 
            type="text" 
            placeholder="Название"
            onChange = {(e) => setMeme({...meme, title: e.target.value})}
            value = {meme.title}
            />

           <MyButton onClick={addMeme}>Create</MyButton>
        </form>
    )
}

export default Form;