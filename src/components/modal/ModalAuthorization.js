import React, {useContext, useEffect}  from "react";

import { Form } from 'rsuite';

import { IoClose } from 'react-icons/io5';
import { BsCheck2 } from 'react-icons/bs';
import { FaUserLock } from 'react-icons/fa';

import Api from './../../ServiceApi.js';
import Context from '../../contexts/Context.js';

import "./ModalAuthorization.css";

const ModalAuthorization = () => { 
    
    const {user, setLoading, modalAuthorization, setModalMessage, setModalAuthorization} = useContext(Context);

    useEffect(() => {
        if(modalAuthorization.opened){
            setTimeout(() => {
                document.getElementById('user-name').select();
            },300);
        }
    }, [modalAuthorization]);
    
    const handleModalClose = (canceled, authorized) => {
        setModalAuthorization({
            action: modalAuthorization.action,
            message: modalAuthorization.message,
            opened: false,
            canceled: canceled,
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
        setLoading(loading => loading+1);
        Api.post({script: 'authorization', action: modalAuthorization.action, data: {
            user_name: user_name,
            user_pass: user_pass,
            token: user.terminal.token,
            hostIP: user.terminal.hostIP,
            osType: user.terminal.osType,
            hostName: user.terminal.hostName,
            platform: user.terminal.platform,
            userName: user.terminal.userName,
            appVersion: user.terminal.appVersion,
            data: modalAuthorization.data
        }}).then((res) => {
            if(res.status === 200){
                handleModalClose(false, true);
                document.getElementById('user-name').value = '';
                document.getElementById('user-pass').value = '';
            } else {
                setModalMessage({
                    class: 'warning',
                    title: res.response.data.title || 'Atenção',
                    message: res.response.data.message,
                    opened: true
                });
            }
            setLoading(loading => loading-1);
        });
    }

    return (
        <div className={`shadow shadow-modal ${modalAuthorization.opened ? 'opened' : ''}`}>
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
                    <button onClick={() => handleModalClose(true, false)}>
                        <IoClose/> {modalAuthorization.buttonDenyText}
                    </button>
                    <button onClick={() => handleFormSubmit()}>
                        <BsCheck2/> {modalAuthorization.buttonConfirmText}
                    </button>
                </div>
            </div>
        </div>
    )
};

export default ModalAuthorization;