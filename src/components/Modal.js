import React, {useContext} from "react";
import { FaTimes } from 'react-icons/fa';
import Context from '../contexts/Context.js';

import "./Modal.css";
import ModalBudget from "./modal/ModalDav.js";

const Modal = () => {
    
    const {modalData, setModalData} = useContext(Context);

    const handleCloseClick = () => {
        setModalData({
            data: {},
            style: {
                zIndex: 0,
                opacity: 0,
                display: 'none'
            }
        });
    };

    return (
        <div className="shadow" style={modalData.style}>
            <div className="modal box-shadow">
                <div className="header">
                    {!!modalData.data && !!modalData.data.title ? modalData.data.title : ''}<button onClick={() => handleCloseClick()}><FaTimes /></button>
                </div>
                <div className="body">
                    {!!modalData.data && modalData.data.element === 'ModalBudget' &&
                        <ModalBudget/>
                    }
                </div>
                <div className="footer"></div>
            </div>
        </div>
    )
};

export default Modal;