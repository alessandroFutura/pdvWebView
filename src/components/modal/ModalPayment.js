import React, {useContext} from "react";

import {BiEdit} from 'react-icons/bi';
import {MdAttachMoney} from 'react-icons/md';

import Context from '../../contexts/Context.js';
import {numberFormat} from '../../contexts/Global.js';

import moment from 'moment';
import 'moment/locale/pt-br';

import "./ModalPayment.css";

const ModalPayment = () => {    
    
    const {budget, modalPayment, setModalConfirm, setModalPayment} = useContext(Context);

    const handleCloseClick = () => {
        setModalPayment({
            opened: false
        });
    };

    const handleSubmitClick = () => {
        setModalConfirm({
            id: 'budget-submit',
            message: 'Deseja realmente faturar o documento?',
            opened: true,
            confirmed: false,
            buttonDenyText: 'Não',
            buttonConfirmText: 'Sim'
        });
    };

    return (
        <div className={`shadow ${modalPayment.opened ? 'opened' : ''}`}>
            <div className="modal modal-payment box-shadow">
                <div className="header">
                    <MdAttachMoney/>
                </div>
                <div className="body">
                    <div className="left">
                        <div className="term">
                            {budget.term ? `${budget.term.CdChamada} - ${budget.term.DsPrazo}` : 'Nenhum prazo informado'}
                        </div>
                        <div className="payments">
                            {budget.payments.map((payment, key) => (
                                <div key={key} className="payment">
                                    <div className="icon" style={{backgroundImage: `url(${payment.image})`}}></div>
                                    <div className="description">{payment.external.DsFormaPagamento}</div>
                                    <div className="deadline">{moment(payment.budget_payment_deadline).format('DD/MM/YYYY')}</div>
                                    <div className="value">{numberFormat({value: payment.budget_payment_value})}</div>
                                    <button><BiEdit/></button>
                                </div>
                            ))}
                        </div>
                        <div className="notes">
                            <div className="note">
                                <div className="title">Dados da Entrega</div>
                                <div className="text">{budget.budget_note_document}</div>
                            </div>
                            <div className="note">
                                <div className="title">Observações</div>
                                <div className="text">{budget.budget_note}</div>
                            </div>
                        </div>
                    </div>
                    <div className="right">
                        <div className="seller">
                            <div className="image box-shadow" style={{backgroundImage: `url(${budget.seller.image})`}}></div>
                            <div className="code">{budget.seller.CdChamada}</div>
                            <div className="name">{budget.seller.NmPessoa}</div>
                        </div>
                        <div className="title">Dados do Documento</div>
                        <div className="data"></div>
                    </div>
                </div>
                <div className="footer">
                    <button onClick={(e) => handleCloseClick()}>Cancelar</button>
                    <button onClick={(e) => handleSubmitClick()}>Faturar</button>
                </div>
            </div>
        </div>
    )
};

export default ModalPayment;