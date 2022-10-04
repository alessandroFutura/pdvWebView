import React from "react";
import { FaTimes } from 'react-icons/fa';

import "./Modal.css";
import ModalDav from "./dav/ModalDav.js";
import ModalPedido from "./dav/ModalPedido.js";

const Modal = ({modalData, modalStyle, setModalStyle}) => {
    
    const handleCloseClick = () => {
        setModalStyle({
            zIndex: 0,
            opacity: 0,
            display: 'none'
        });
    };

    return (
        <div className="shadow" style={modalStyle}>
            <div className="modal box-shadow">
                <div className="header">
                    {modalData.title}
                    <button onClick={() => handleCloseClick()}>
                        <FaTimes />
                    </button>
                </div>
                <div className="body">
                    { modalData.element === 'ModalDav' &&
                        <ModalDav/>
                    }
                    { modalData.element === 'ModalPedido' &&
                        <ModalPedido/>
                    }
                </div>
                <div className="footer"></div>
            </div>
        </div>
    )
};

export default Modal;