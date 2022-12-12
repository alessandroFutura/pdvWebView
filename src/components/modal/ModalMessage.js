import React, {useContext}  from "react";

import Context from '../../contexts/Context.js';

import { BsCheck2Circle } from 'react-icons/bs';
import { FiInfo, FiAlertTriangle } from 'react-icons/fi';

import "./ModalMessage.css";

const ModalMessage = () => {
    
    const {modalMessage, setModalMessage} = useContext(Context);
    
    const handleModalClose = () => {
        setModalMessage({
            class: '',
            title: '',
            message: '',
            opened: false,
            afterClose: modalMessage.afterClose || null
        });
    }

    return (
        <div style={{zIndex: 11}} className={`shadow ${modalMessage.opened ? 'opened' : ''}`}>
            <div className={`modal modal-message box-shadow ${modalMessage.class}`}>
                <div className="header">
                    <FiInfo/>
                    <BsCheck2Circle/>
                    <FiAlertTriangle/>
                </div>
                <div className="body">
                    <div className="title">{modalMessage.title}</div>
                    <div className="message" dangerouslySetInnerHTML={{__html: modalMessage.message}}></div>             
                </div>
                <div className="footer">
                    <button onClick={(e) => handleModalClose()}>Fechar</button>
                </div>
            </div>
        </div>
    )
}

export default ModalMessage;