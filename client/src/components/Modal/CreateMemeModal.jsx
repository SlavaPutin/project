import React from "react";
import ReactDOM from "react-dom"; // Импортируй ReactDOM
import './createMemeModal.css';
import Create from "../Lenta/Create";

const CreateMemeModal = ({setVisible, visible, style}) => {
    if (!visible) return null;
    return ReactDOM.createPortal(
        <div className="wrap-modal-center-create" onClick={() => setVisible(false)}>
            <div onClick={(e) => e.stopPropagation()}>
                <Create setVisible={setVisible}/>
            </div>
        </div>,
        document.body
    );
}

export default CreateMemeModal;