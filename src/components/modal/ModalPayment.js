import React, {useContext} from "react";

import Context from '../../contexts/Context.js';

import {BiEdit} from 'react-icons/bi';
import {AiOutlineCheckSquare} from 'react-icons/ai';

import "./ModalPayment.css";

const ModalPayment = () => {    
    
    const {
        modalPayment, 
        setModalConfirm, 
        setModalPayment
    } = useContext(Context);

    const handleModalityClick = (modality) => {        
        setModalPayment({
            opened: true,
            actual: modalPayment.actual,
            selected: modality,
            modalities: modalPayment.modalities
        });
    };

    const handleCloseClick = () => {
        setModalPayment({
            opened: false
        });
    };

    const handleSubmitClick = () => {
        if(!!modalPayment.selected){
            setModalConfirm({
                id: 'modalityChange',
                message: 'Deseja realmente alterar a forma de pagamento?',
                opened: true,
                confirmed: false,
                buttonDenyText: 'Não',
                buttonConfirmText: 'Sim'
            });
        } else {
            setModalPayment({
                opened: false
            });
        }
    };

    return (
        <div className={`shadow shadow-modal ${modalPayment.opened ? 'opened' : ''}`}>
            <div className="modal modal-payment box-shadow">
                <div className="header">
                    <BiEdit/>
                </div>
                <div className="body">
                    {(modalPayment.modalities || []).map((modality, key) => (
                        <div key={key} className={`modality un-selectable ${(!modalPayment.selected && modality.IdFormaPagamento === modalPayment.actual.IdFormaPagamento) || (!!modalPayment.selected && modality.IdFormaPagamento === modalPayment.selected.IdFormaPagamento) ? 'selected' : ''}`} onClick={() => handleModalityClick(modality)}>
                            <img src={modality.image} alt={modality.DsFormaPagamento} />
                            <span>{modality.DsFormaPagamento}</span>
                            <AiOutlineCheckSquare/>
                        </div>
                    ))}
                </div>
                <div className="footer">
                    <button onClick={(e) => handleCloseClick()}>Cancelar</button>
                    <button onClick={(e) => handleSubmitClick()}>Selecionar</button>
                </div>
            </div>
        </div>
    )
};

export default ModalPayment;