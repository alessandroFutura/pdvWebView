import React, {useContext}  from "react";
import Context from '../contexts/Context.js';
import {numberFormat} from '../contexts/Global.js';

import "./Budget.css";

const Budget = () => {
    
    const {budget, modalConfirm, setModalConfirm} = useContext(Context);

    const getPayment = () => {
        let payments = [];

        budget.payments.forEach(payment => {
            if(payments.indexOf(payment.modality.DsFormaPagamento) === -1){
                payments.push(payment.modality.DsFormaPagamento);
            }
        });
        
        return payments.length === 1 ? payments[0] : 'MULTIPLAS';
    }
    
    const handleButtonDeleteClick = () => {
        console.log('delete');
    }

    const handleButtonCancelClick = () => {
        setModalConfirm({
            id: 'budget-cancel',
            message: 'Deseja realmente cancelar o faturamento?',
            opened: true,
            confirmed: false,
            buttonDenyText: 'Não',
            buttonConfirmText: 'Sim'
        });
    }

    const handleButtonSubmitClick = () => {
        setModalConfirm({
            id: 'budget-submit',
            message: 'Deseja realmente faturar o documento?',
            opened: true,
            confirmed: false,
            buttonDenyText: 'Não',
            buttonConfirmText: 'Sim'
        });
    }

    return (
        <div className="budget">
            <div style={{display:(!!budget.budget_id > 0 ? 'none' : 'block')}} className="empty">
                <p>SELECIONE UM DOCUMENTO PARA FATURAR</p>
            </div>
            <div style={{display:(budget.budget_id > 0 ? 'block' : 'none')}} className={`content box-shadow ${budget.external_type == 'D' ? 'dav' : 'pedido'}`}>
                <div className="title-1">{!!budget.document_code ? `${budget.document_code} - ` : ''}{budget.external_type == 'D' ? 'Cupom Fiscal' : 'Ordem de Entrega'}</div>
                <div className="seller">{budget.seller.CdChamada} - {budget.seller.NmPessoa}</div>
                <div className="title-2">ITENS DO DOCUMENTO</div>
                <div className="items">                    
                    {(budget.items || []).map((item, key) => (
                        <div key={key} className="item">
                            <div className="CdChamada">{item.product.CdChamada}</div>
                            <div className="VlTotalItem">R$ {numberFormat({value: item.budget_item_value_total})}</div>
                            <div className="VlItem">R$ {numberFormat({value: item.budget_item_value_unitary})}</div>
                            <div className="QtUnidade">{numberFormat({value: item.budget_item_quantity})} {item.product.unit.CdSigla}</div>
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
                <button disabled={!budget.budget_id || !!budget.document_code} onClick={() => handleButtonDeleteClick()} className="btn btn-red">Excluir</button>
                <button disabled={!budget.budget_id} onClick={() => handleButtonCancelClick()} className="btn btn-purple">Cancelar</button>
                <button disabled={!budget.budget_id} onClick={() => handleButtonSubmitClick()} className="btn btn-green">Faturar</button>
            </div>
        </div>
    );
};

export default Budget;