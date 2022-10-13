import React, {useContext}  from "react";

import { Modal, Button } from 'rsuite';
import HelpOutline from '@rsuite/icons/legacy/Remind';

import Context from '../../contexts/Context.js';

const ModalConfirm = () => {
    
    const {modalConfirm, setModalConfirm} = useContext(Context);
    
    const handleModalClose = (confirmed) => {
        setModalConfirm({
            id: modalConfirm.id,
            message: modalConfirm.message,
            opened: false,
            confirmed: confirmed,
            buttonDenyText: modalConfirm.buttonDenyText,
            buttonConfirmText: modalConfirm.buttonConfirmText
        });
    }

    return (
        <Modal backdrop="static" role="alertdialog" open={modalConfirm.opened} onClose={handleModalClose} size="xs">
            <Modal.Body>
                <HelpOutline style={{ color: '#ffb300', fontSize: 24 }} />
                {modalConfirm.message}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => handleModalClose(true)} appearance="primary">
                    {modalConfirm.buttonConfirmText}
                </Button>
                <Button onClick={() => handleModalClose(false)} appearance="subtle">
                    {modalConfirm.buttonDenyText}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalConfirm;