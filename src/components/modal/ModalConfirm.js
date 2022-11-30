import React, {useContext}  from "react";

import { IoClose } from 'react-icons/io5';
import { BsQuestionCircle, BsCheck2 } from 'react-icons/bs';

import Context from '../../contexts/Context.js';

import "./ModalConfirm.css";

const ModalResponse = () => { 
    
    const {modalConfirm, setModalConfirm} = useContext(Context);
    
    const handleModalClose = (confirmed) => {
        setModalConfirm({
            id: modalConfirm.id,
            message: modalConfirm.message,
            opened: false,
            confirmed: confirmed,
            buttonDenyText: modalConfirm.buttonDenyText,
            buttonConfirmText: modalConfirm.buttonConfirmText,
            data: modalConfirm.data || null
        });
    }

    return (
        <div className={`shadow ${modalConfirm.opened ? 'opened' : ''}`} style={{zIndex: 11}}>
            <div className={`modal modal-confirm box-shadow`}>
                <div className="header">
                    <BsQuestionCircle/>
                </div>
                <div className="body">
                    <p>{modalConfirm.message}</p>
                </div>
                <div className="footer">
                    <button onClick={() => handleModalClose(false)}>
                        <IoClose/> {modalConfirm.buttonDenyText}
                    </button>
                    <button onClick={() => handleModalClose(true)}>
                        <BsCheck2/> {modalConfirm.buttonConfirmText}
                    </button>
                </div>
            </div>
        </div>
    )
};

export default ModalResponse;