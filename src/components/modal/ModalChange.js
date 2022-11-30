import React, {useContext}  from "react";

import { Form } from 'rsuite';

import { IoClose } from 'react-icons/io5';
import { BsCheck2 } from 'react-icons/bs';
import { FaUserLock } from 'react-icons/fa';

import Api from './../../ServiceApi.js';
import Context from '../../contexts/Context.js';

import "./ModalChange.css";

const ModalChange = () => { 
    
    const {user, setLoading, modalAuthorization, setModalMessage, setModalAuthorization} = useContext(Context);
    
    const handleModalClose = (authorized) => {
        setModalAuthorization({
            action: modalAuthorization.action,
            message: modalAuthorization.message,
            opened: false,
            authorized: authorized,
            buttonDenyText: modalAuthorization.buttonDenyText,
            buttonConfirmText: modalAuthorization.buttonConfirmText,
            data: modalAuthorization.data || null
        });
    }

    const handleFormSubmit = () => {
        let user_name = document.getElementById('user-name').value;
        let user_pass = document.getElementById('user-pass').value;
        if(!!user_name && !!user_pass) {
            submit(user_name, user_pass);
        } else {
            setModalMessage({
                class: 'warning',
                title: 'Ops!',
                message: 'Informe o login e senha',
                zIndex: 11,
                opened: true
            });
        }
    }

    const submit = (user_name, user_pass) => {
        
    }

    return (
        <div className={`shadow ${modalAuthorization.opened ? 'opened' : ''}`}>
            <div className={`modal modal-authorization box-shadow`}>
                <div className="header">
                    <FaUserLock/>
                </div>
                <div className="body">
                    <p>{modalAuthorization.message}</p>
                    <Form>
                        <Form.Group controlId="user-name">
                            <Form.ControlLabel>Usuário</Form.ControlLabel>
                            <Form.Control name="user-name" />
                        </Form.Group>
                        <Form.Group controlId="user-pass">
                            <Form.ControlLabel>Senha</Form.ControlLabel>
                            <Form.Control name="user-pass" type="password" autoComplete="off" />
                        </Form.Group>
                    </Form>
                </div>
                <div className="footer">
                    <button onClick={() => handleModalClose(false)}>
                        <IoClose/> {modalAuthorization.buttonDenyText}
                    </button>
                    <button onClick={() => handleFormSubmit(true)}>
                        <BsCheck2/> {modalAuthorization.buttonConfirmText}
                    </button>
                </div>
            </div>
        </div>
    )
};

export default ModalChange;