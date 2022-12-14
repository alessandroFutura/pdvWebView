import React, {useContext}  from "react";
import Context from '../contexts/Context.js';
import {numberFormat} from '../contexts/Global.js';

import "./Budget.css";

const Budget = () => {
    
    const {budget, setModalPayment, setModalConfirm} = useContext(Context);

    const getPayment = () => {
        let payments = [];

        budget.payments.forEach(payment => {
            if(payments.indexOf(payment.external.DsFormaPagamento) === -1){
                payments.push(payment.external.DsFormaPagamento);
            }
        });
        
        return payments.length === 1 ? payments[0] : 'MULTIPLAS';
    };

    const handleButtonCancelClick = () => {
        if(!budget.document || budget.document.CdStatus < 9){
            setModalConfirm({
                id: 'budgetCancel',
                message: 'Deseja realmente cancelar o faturamento?',
                opened: true,
                confirmed: false,
                buttonDenyText: 'Não',
                buttonConfirmText: 'Sim'
            });
        } else {
            setModalConfirm({
                id: 'budgetCancel',
                confirmed: true
            });
        }
    };

    const handleButtonSubmitClick = () => {
        setModalPayment({
            opened: true
        });        
    };

    const cancelButtonDisabled = () => {
        return (
            !budget.budget_id
        );
    };

    const submitButtonDisabled = () => {
        return (
            !budget.budget_id || 
            (!!budget.document && budget.document.CdStatus >= 9)
        );
    };

    return (
        <div className="budget">
            <div style={{display:(!!budget.budget_id > 0 ? 'none' : 'block')}} className="empty">
                <p>SELECIONE UM DOCUMENTO PARA FATURAR</p>
            </div>
            <div style={{display:(budget.budget_id > 0 ? 'block' : 'none')}} className={`content box-shadow ${budget.external_type === 'D' ? 'dav' : 'pedido'}`}>
                <div className="title-1">{!!budget.document ? `${budget.document.nNF} - ` : ''}{budget.external_type === 'D' ? 'Cupom Fiscal' : 'Ordem de Entrega'}</div>
                <div className="seller">{budget.seller.CdChamada} - {budget.seller.NmPessoa}</div>
                <div className="title-2">ITENS DO DOCUMENTO</div>
                <div className="items">                    
                    {(budget.items || []).map((item, key) => (
                        <div key={key} className="item">
                            <div className="CdChamada">{item.product.CdChamada}</div>
                            <div className="VlTotalItem">R$ {numberFormat({value: item.budget_item_value_total})}</div>
                            <div className="VlItem">R$ {numberFormat({value: item.budget_item_value_unitary})}</div>
                            <div className="QtUnidade">{numberFormat({value: item.budget_item_quantity})} {item.product.CdSigla}</div>
                            <div className="NmProduto">{item.product.NmProduto}</div>
                        </div>
                    ))}                                       
                </div>
                <div className="rodape">
                    <div className="info"><label>PRAZO</label><span>{budget.term ? budget.term.DsPrazo : ''}</span></div>
                    <div className="info"><label>PAGAMENTO</label><span>{getPayment()}</span></div>
                    <div className="info"><label>ITENS</label><span>{budget.items.length}</span></div>
                    <div className="info"><label>SUBTOTAL</label><span>R$ {numberFormat({value: budget.budget_value})}</span></div>
                    <div className="info"><label>DESCONTO</label><span>R$ {numberFormat({value: budget.budget_value_discount})}</span></div>
                    <div className="info"><label>TOTAL</label><span>R$ {numberFormat({value: budget.budget_value_total})}</span></div>
                </div>                
            </div>
            <div className="controle">
                <button disabled={cancelButtonDisabled()} onClick={() => handleButtonCancelClick()} className="btn btn-red">Cancelar</button>
                <button disabled={submitButtonDisabled()} onClick={() => handleButtonSubmitClick()} className="btn btn-green">Faturar</button>
            </div>
        </div>
    );
};

export default Budget;