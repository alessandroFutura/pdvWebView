import React, {useContext, useRef, useEffect}  from "react";

import { BsQuestionCircle } from 'react-icons/bs';

import Context from '../../contexts/Context.js';

import "./ModalConfirm.css";

const ModalResponse = () => { 
    
    const ref = useRef(null);

    const {modalConfirm, setModalConfirm} = useContext(Context);
    
    const handleModalClose = (canceled, confirmed) => {
        setModalConfirm({
            id: modalConfirm.id,
            message: modalConfirm.message,
            opened: false,
            canceled: canceled,
            confirmed: confirmed,
            buttonDenyText: modalConfirm.buttonDenyText,
            buttonConfirmText: modalConfirm.buttonConfirmText,
            data: modalConfirm.data || null
        });
    }

    useEffect(() => {
        if(modalConfirm.opened){
            setTimeout(() => {
                ref.current.focus();
            },300);
        }
    }, [modalConfirm]);

    return (
        <div className={`shadow shadow-modal ${modalConfirm.opened ? 'opened' : ''}`} style={{zIndex: 11}}>
            <div className={`modal modal-confirm box-shadow`}>
                <div className="header">
                    <BsQuestionCircle/>
                </div>
                <div className="body">
                    <p dangerouslySetInnerHTML={{__html: modalConfirm.message}}></p>
                </div>
                <div className="footer">
                    <button onClick={() => handleModalClose(true, false)}>
                        {modalConfirm.buttonDenyText}
                    </button>
                    <button ref={ref} onClick={() => handleModalClose(false, true)}>
                        {modalConfirm.buttonConfirmText}
                    </button>
                </div>
            </div>
        </div>
    )
};

export default ModalResponse;