import React, {useContext, useEffect, useState, useRef} from "react";

import { BsCheck2Circle } from 'react-icons/bs';
import { FiAlertTriangle } from 'react-icons/fi';

import Context from '../../contexts/Context.js';

import "./ModalResponse.css";

const ModalResponse = () => {    
    
    const modalResponseTimer = useRef(null);
    const [modalResponseTimeout, setModalResponseTimeout] = useState(10);

    const {modalResponse, setModalResponse} = useContext(Context);

    const handleCloseClick = () => {
        clearInterval(modalResponseTimer.current);
        setModalResponse({
            class: modalResponse.class,
            title: modalResponse.title,
            message: modalResponse.message,
            opened: false
        });
        setModalResponseTimeout(10);
    };

    useEffect(() => {
        if(modalResponse.opened && modalResponse.class === 'success'){
            if(modalResponseTimeout === 0){
                handleCloseClick();
            } else {
                if(!!modalResponseTimer.current) clearInterval(modalResponseTimer.current);
                modalResponseTimer.current = setInterval(() => {
                    setModalResponseTimeout(() => modalResponseTimeout - 1);
                }, 1000);
            }
            window.document.getElementById('button-modal-response').focus();
        }
    }, [modalResponse]);

    return (
        <div className={`shadow ${modalResponse.opened ? 'opened' : ''}`}>
            <div className={`modal modal-response box-shadow ${modalResponse.class}`}>
                <div className="header">
                    <BsCheck2Circle/>
                    <FiAlertTriangle/>
                </div>
                <div className="body">
                    <div className="title">{modalResponse.title}</div>
                    <div className="message" dangerouslySetInnerHTML={{__html: modalResponse.message}}></div>             
                </div>
                <div className="footer">
                    <button id="button-modal-response" onClick={(e) => handleCloseClick()}>Fechar<span>({modalResponseTimeout})</span></button>
                </div>
            </div>
        </div>
    )
};

export default ModalResponse;