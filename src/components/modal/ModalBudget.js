import React, {useContext}  from "react";

import {AiOutlineFileText} from 'react-icons/ai';
import moment from 'moment';

import Context from '../../contexts/Context.js';
import {numberFormat} from '../../contexts/Global.js';

import DataGridItems from '../grid/DataGridItems.js';
import DataGridPayments from '../grid/DataGridPayments.js';

import "./ModalBudget.css";

const ModalBudget = () => { 
    
    const {
        instance_id,
        budget, 
        getBudget, 
        modalBudget,         
        setModalConfirm,
        setModalMessage
    } = useContext(Context);

    const closeModal = () => {
        setModalConfirm({
            id: 'budgetCancel',
            confirmed: true
        });
    };
    
    const handleCancelClick = () => {
        if((!budget.document || budget.document.CdStatus < 9) && !budget.instance){
            setModalConfirm({
                id: 'budgetCancel',
                message: 'Deseja realmente cancelar o faturamento?',
                opened: true,
                confirmed: false,
                buttonDenyText: 'Não',
                buttonConfirmText: 'Sim'
            });
        } else {
            closeModal();
        }
    };

    const handleUpdateClick = () => {
        getBudget(budget.budget_id);
    };

    const handleSubmitClick = () => {
        setModalConfirm({
            id: 'budgetSubmit',
            message: 'Deseja realmente faturar o documento?',
            opened: true,
            confirmed: false,
            buttonDenyText: 'Não',
            buttonConfirmText: 'Sim'
        });
    };

    const handlePrintClick = () => {
        setModalConfirm({
            id: 'documentPrint',
            message: (`
				Para reimprimir o documento será necessário autorização especial.
				O que deseja fazer?
			`),
            opened: true,
            confirmed: false,
            buttonDenyText: 'Cancelar',
            buttonConfirmText: 'Solicitar Permissão',
			data: {
                modelo: budget.document.modelo
            }
        });
    };

    const cancelButtonDisabled = () => {
        return (
            !budget.budget_id
        );
    };

    const updateButtonDisabled = () => {
        return (
            !budget.budget_id || 
            (!!budget.document && budget.document.CdStatus >= 9) ||
            (!!budget.instance && budget.instance.instance_id !== instance_id)
        );
    };

    const submitButtonDisabled = () => {
        return (
            !budget.budget_id || 
            (!!budget.document && budget.document.CdStatus >= 9) ||
            (!!budget.instance && budget.instance.instance_id !== instance_id)
        );
    };

    const printButtonDisabled = () => {
        return (
            !budget.budget_id || 
            !budget.document ||
            budget.document.CdStatus !== 9
        );
    };

    const getItems = () => {
        let items = [];
        budget.items.forEach((item, key) => {
            items.push({
                key: key+1,
                CdChamada: item.product.CdChamada,
                NmProduto: item.product.NmProduto,
                Qtd: numberFormat({value: item.budget_item_quantity, minDecimals:4, maxDecimals:4}),
                VlUnitatio: numberFormat({value: item.budget_item_value_unitary}),
                AlDesconto: numberFormat({value: item.budget_item_aliquot_discount}),
                VlDesconto: numberFormat({value: item.budget_item_value_discount}),
                VlTotal: numberFormat({value: item.budget_item_value_total})
            });
        });
        return items;
    };

    const getPayments = () => {
        let payments = [];
        budget.payments.forEach(payment => {
            payments.push({
                NrDias: payment.external.NrDias,
                IdFormaPagamento: payment.modality_id,
                budget_payment_id: payment.budget_payment_id,
                modality_group_id: payment.modality_group_id,
                modality_group_description: payment.modality_group_description,
                NrParcelas: `${payment.budget_payment_installment}x`,
                DtVencimento: moment(payment.budget_payment_deadline).format('DD/MM/YYYY'),
                DsFormaPagamento: payment.external.DsFormaPagamento,
                VlParcela: numberFormat({value: payment.budget_payment_value})
            });
        });
        return payments;
    };

    const getBudgetState = () => {
        if(!budget.document){
            return 'opened';
        }
        if(!!budget.document && budget.document.StCancelado === 'S'){
            return 'canceled';
        }
        if(!!budget.document && !!budget.document.cStat && budget.document.cStat !== 100){
            return 'rejected';
        }
        if(!!budget.document && !!budget.document.CdStatus && budget.document.CdStatus === 9){
            return 'billed';
        }
    };

    const handleDeliveryNoteClick = () => {
        setModalMessage({
			class: 'info',
			message: budget.external.DsObservacaoDocumento.replace(' | ', '<br/>'),
			opened: true
		});
    };
    
    return (
        <div className={`shadow shadow-modal ${modalBudget.opened ? 'opened' : ''}`}>
            {!!budget.budget_id &&
                <div className={`modal modal-budget modal-budget-${getBudgetState()} box-shadow`}>
                    <div className="header">
                        <AiOutlineFileText/>
                        <div className="document-code">
                            {budget.external_type === 'P' ? 'Orde de Entrega' : 'Cupom Fiscal'} {budget.document ? `(${budget.document.NrDocumento})` : ''}
                        </div>
                        <div className="document-state document-state-opened">Aberto</div>
                        <div className="document-state document-state-billed">Faturado</div>
                        <div className="document-state document-state-canceled">Cancelado</div>
                        <div className="document-state document-state-rejected">Rejeitado</div>
                    </div>                
                    <div className="body">                
                        <div className="top">
                            <div className="person">
                                <label>Cliente</label>
                                <div className="person-image box-shadow" style={{backgroundImage: `url(${budget.person.image})`}}></div>
                                <div className="person-code">{budget.person.CdChamada}</div>
                                <div className="person-name">{budget.person.NmPessoa}{budget.person_nickname ? ` (${budget.person_nickname})` : ''}</div>
                            </div>
                            <div className="seller">
                                <label>Representante</label>
                                <div className="seller-image box-shadow" style={{backgroundImage: `url(${budget.seller.image})`}}></div>
                                <div className="seller-code">{budget.seller.CdChamada}</div>
                                <div className="seller-name">{budget.seller.NmPessoa}</div>
                            </div>
                        </div>
                        <div className="items">
                            <DataGridItems items={getItems()}/>
                        </div>
                        <div className="resume">
                            <div className="item">
                                <div className="label">Total de Itens</div>
                                <div className="value">{budget.items.length} Item(ns)</div>
                            </div>
                            <div className="item">
                                <div className="label">Valor Total</div>
                                <div className="value">R$ {numberFormat({value: budget.budget_value})}</div>
                            </div>
                            <div className="item">
                                <div className="label">Al. Desconto</div>
                                <div className="value">{numberFormat({value: budget.budget_aliquot_discount})}%</div>
                            </div>
                            <div className="item">
                                <div className="label">Vl. Desconto</div>
                                <div className="value">R$ {numberFormat({value: budget.budget_value_discount})}</div>
                            </div>
                            <div className="item">
                                <div className="label">Vl Total Liquido</div>
                                <div className="value">R$ {numberFormat({value: budget.budget_value_total})}</div>
                            </div>
                        </div>
                        <div className="bottom">
                            <div className="payments">
                                <DataGridPayments payments={getPayments()} editable={submitButtonDisabled()} />
                            </div>
                            <div className="delivery">
                                <label>Entrega</label>
                                {budget.external_type === 'P' && budget.budget_delivery === 'Y' &&
                                    <>
                                        {budget.person.address.TpLogradouro}&nbsp;
                                        {budget.person.address.NmLogradouro},&nbsp;{budget.person.address.NrLogradouro}<br/>
                                        {budget.person.address.NmBairro} - {budget.person.address.NmCidade} - {budget.person.address.IdUF}<br/>
                                        CEP: {budget.person.address.CdCEP}
                                    </>
                                }
                                {(budget.external_type === 'D' || budget.budget_delivery === 'N') &&
                                    <i>Sem opção de entrega</i>
                                }
                                <button onClick={() => handleDeliveryNoteClick()}disabled={budget.external_type === 'D' || budget.budget_delivery === 'N'}>Observações de Entrega</button>                                
                            </div>
                        </div>
                    </div>                               
                    <div className="footer">
                        <button disabled={cancelButtonDisabled()} onClick={() => handleCancelClick()}>Fechar</button>
                        <button disabled={submitButtonDisabled()} onClick={() => handleSubmitClick()}>Faturar</button>
                        <button disabled={updateButtonDisabled()} onClick={() => handleUpdateClick()}>Atualizar</button>
                        <button disabled={printButtonDisabled()} onClick={() => handlePrintClick()}>Imprimir</button>
                    </div>
                </div>
            }
        </div>
    )
}

export default ModalBudget;