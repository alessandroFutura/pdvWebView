import React, {useContext}  from "react";


import { BsQuestionCircle } from 'react-icons/bs';

import Context from '../../contexts/Context.js';

import "./ModalConfirm.css";

const ModalResponse = () => { 
    
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

    return (
        <div className={`shadow ${modalConfirm.opened ? 'opened' : ''}`} style={{zIndex: 11}}>
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
                    <button onClick={() => handleModalClose(false, true)}>
                        {modalConfirm.buttonConfirmText}
                    </button>
                </div>
            </div>
        </div>
    )
};

export default ModalResponse;