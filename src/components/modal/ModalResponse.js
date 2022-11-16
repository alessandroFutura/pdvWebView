import React, {useContext, useEffect, useState, useRef} from "react";

import { BsCheck2Circle } from 'react-icons/bs';

import Context from '../../contexts/Context.js';

import "./ModalResponse.css";

const ModalResponse = () => {
    
    useEffect(() => {
        if(modalResponse.opened && modalResponse.class === 'success'){
            if(modalResponseTimeout == 0){
                handleCloseClick();
            } else {
                if(!!modalResponseTimer.current) clearInterval(modalResponseTimer.current);
                modalResponseTimer.current = setInterval(function(){
                    setModalResponseTimeout(() => modalResponseTimeout - 1);
                }, 1000);
            }
            window.document.getElementById('button-modal-response').focus();
        }
    }, modalResponse);
    
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

    return (
        <div className={`shadow ${modalResponse.opened ? 'opened' : ''}`}>
            <div className={`modal modal-response box-shadow ${modalResponse.class}`}>
                <div className="header">
                    <BsCheck2Circle/>
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