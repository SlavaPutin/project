import React, { useRef, useState } from "react";
import "./create.css"
import { observer } from "mobx-react-lite";
import PostStore from "../../store/PostStore";

const Create = observer(() => {

    const [title, setTitle] = useState('')
    const [image, setImage] = useState(null)
    const fileInputRef = useRef(null);

    const uslovia = title.length > 0 && image

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]); // Сохраняем файл
        }
    }

    const onBtnClick = () => {
        fileInputRef.current.click(); // Вызываем выбор файла
    };

    const createPost = (title, image) => {
        PostStore.createPost(title, image)
        setTitle('')
        setImage(null)
    }


    return(
        <div className="wrap-create">
            <div className="avatar">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            <div className="create">
                <div className="input-name-meme">
                    <input 
                        type="text"
                        placeholder="Название вашего мема"
                        className="name-meme"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="wrap-file-upload">
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleFileChange} 
                        style={{ display: 'none' }} 
                        accept="image/*"
                    />
                    <button className="file-btn" onClick={onBtnClick} type="button">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_403_3049)">
                        <path d="M16.0002 16C16.0002 16.2652 15.8948 16.5196 15.7073 16.7071C15.5197 16.8947 15.2654 17 15.0002 17H13.0002V19C13.0002 19.2652 12.8948 19.5196 12.7073 19.7071C12.5197 19.8947 12.2654 20 12.0002 20C11.7349 20 11.4806 19.8947 11.293 19.7071C11.1055 19.5196 11.0002 19.2652 11.0002 19V17H9.00015C8.73494 17 8.48058 16.8947 8.29305 16.7071C8.10551 16.5196 8.00015 16.2652 8.00015 16C8.00015 15.7348 8.10551 15.4805 8.29305 15.2929C8.48058 15.1054 8.73494 15 9.00015 15H11.0002V13C11.0002 12.7348 11.1055 12.4805 11.293 12.2929C11.4806 12.1054 11.7349 12 12.0002 12C12.2654 12 12.5197 12.1054 12.7073 12.2929C12.8948 12.4805 13.0002 12.7348 13.0002 13V15H15.0002C15.2654 15 15.5197 15.1054 15.7073 15.2929C15.8948 15.4805 16.0002 15.7348 16.0002 16ZM22.0002 10.485V19C21.9986 20.3256 21.4713 21.5965 20.5339 22.5338C19.5966 23.4711 18.3257 23.9984 17.0002 24H7.00015C5.67456 23.9984 4.40371 23.4711 3.46637 22.5338C2.52903 21.5965 2.00174 20.3256 2.00015 19V5.00002C2.00174 3.67443 2.52903 2.40358 3.46637 1.46624C4.40371 0.528905 5.67456 0.00161091 7.00015 2.30487e-05H11.5152C12.4348 -0.00234388 13.3457 0.177611 14.1954 0.529482C15.045 0.881354 15.8165 1.39816 16.4652 2.05002L19.9492 5.53602C20.6014 6.18426 21.1185 6.95548 21.4706 7.805C21.8226 8.65451 22.0026 9.56545 22.0002 10.485ZM15.0512 3.46402C14.7364 3.15918 14.3831 2.89695 14.0002 2.68402V7.00002C14.0002 7.26524 14.1055 7.51959 14.293 7.70713C14.4806 7.89467 14.7349 8.00002 15.0002 8.00002H19.3162C19.1031 7.61721 18.8405 7.26417 18.5352 6.95002L15.0512 3.46402ZM20.0002 10.485C20.0002 10.32 19.9682 10.162 19.9532 10H15.0002C14.2045 10 13.4414 9.68395 12.8788 9.12134C12.3162 8.55873 12.0002 7.79567 12.0002 7.00002V2.04702C11.8382 2.03202 11.6792 2.00002 11.5152 2.00002H7.00015C6.2045 2.00002 5.44144 2.31609 4.87883 2.8787C4.31622 3.44131 4.00015 4.20437 4.00015 5.00002V19C4.00015 19.7957 4.31622 20.5587 4.87883 21.1213C5.44144 21.684 6.2045 22 7.00015 22H17.0002C17.7958 22 18.5589 21.684 19.1215 21.1213C19.6841 20.5587 20.0002 19.7957 20.0002 19V10.485Z" fill="#f5f5f5"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_403_3049">
                        <rect width="24" height="24" fill="white"/>
                        </clipPath>
                        </defs>
                        </svg>
                    </button>
                    <div className="upload-wrap">
                        <button className="upload-btn" disabled={!uslovia} style={uslovia ? {cursor: "pointer", opacity: 1} : {cursor: "not-allowed", opacity: .5}} onClick={() => createPost(title, image)}>
                            Опубликовать
                        </button>
                    </div>
                </div>
                {image && <span style={{color: '#aaa', fontSize: '12px'}}>{image.name}</span>}
            </div>
        </div> 
    )
})

export default Create;