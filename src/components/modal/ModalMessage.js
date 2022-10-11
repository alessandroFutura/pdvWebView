import React, {useContext}  from "react";
import {Modal, Button} from 'rsuite';

import Context from '../../contexts/Context.js';

const ModalMessage = () => {
    
    const {modalMessage, setModalMessage} = useContext(Context);
    
    const handleModalClose = () => {
        setModalMessage({
            title: '',
            message: '',
            opened: false
        });
    }

    return (
        <Modal open={modalMessage.opened} onClose={handleModalClose}>
            <Modal.Header>
                <Modal.Title>{modalMessage.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{modalMessage.message}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => handleModalClose()} appearance="primary">Ok</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalMessage;