import React, {useContext, useLayoutEffect, useRef} from "react";

import Context from '../../contexts/Context.js';
import {host, numberFormat} from '../../contexts/Global.js';

import {FaPrint,FaTimes} from 'react-icons/fa';

import moment from 'moment';

import Success from './oe/Success.js';

import "./PrintNFCe.css";

const printNFCe = ({getEmptyBudget}) => { 

    const buttonRef = useRef(null);

    const {company, printNFCe, setPrintNFCe} = useContext(Context);

    const handleClickPrint = () => {
        if(!window.electronMessage('print', {
            silent: true,
            pageSize: {
                width: 80 * 1000,
                height: 297 * 1000
            }
        })){
            window.print();
        };
    };

    const handleClickClose = () => {
        setPrintNFCe({
            opened: false,
            budget: getEmptyBudget(),
            getBudgets: true
        });
    };

    useLayoutEffect(() => {
        if(printNFCe.opened && !!printNFCe.budget && !!printNFCe.budget.budget_id){
            buttonRef.current.focus();
        }
    },[printNFCe]);

    return (
        <div className={`shadow shadow-print overflow-y ${printNFCe.opened ? 'opened' : ''}`}>
            {!printNFCe.reprint &&
                <Success data={{NrDocumento: printNFCe.budget.document.NrDocumento}}/>
            }
            <div className="print-nfce">                
                <div className="company-name">{company.company_name}</div>
                <div className="company-document">CNPJ: {company.external.NrCGC}</div>
                <div className="address">
                    {company.external.DsEndereco}, {company.external.NrLogradouro}<br/>
                    {company.external.NmBairro}, {company.external.NmCidade} - {company.external.CdUF}<br/>
                    CEP: {company.external.NrCEP}
                </div>
                <div className="divider"></div>
                <div className="header-info">Documento auxiliar da nota fiscal de consumidor eletrônica</div>
                <div className="divider"></div>
                {!!printNFCe.budget.budget_id &&
                    <>
                        <table className="items">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th className="text-center">CÓD</th>
                                    <th className="text-center" colSpan="3">DESCRIÇÃO</th>
                                </tr>
                                <tr>
                                    <th className="text-center">ITEM</th>
                                    <th className="text-center">QTD.</th>
                                    <th className="text-center">VALOR</th>
                                    <th className="text-center">DESCONTO</th>
                                    <th className="text-right">TOTAL</th>
                                </tr>
                            </thead>
                            <tbody>
                                {printNFCe.budget.items.map((item, key) => (
                                    <React.Fragment key={key}>
                                        <tr>
                                            <td>{key+1}</td>
                                            <td>{item.product.CdChamada}</td>
                                            <td colSpan="3">{item.product.NmProduto.substring(0,38)}</td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td className="ng-binding">{numberFormat({value: item.budget_item_quantity, minDecimals: 3, maxDecimals: 3})}{item.product.CdSigla}</td>
                                            <td>{numberFormat({value: item.budget_item_value, currency: 'BRL', style: 'currency'})}</td>
                                            <td>{numberFormat({value: item.budget_item_value_discount, currency: 'BRL', style: 'currency'})} [{numberFormat({value: item.budget_item_aliquot_discount, style: 'percent'})}]</td>
                                            <td className="text-right">{numberFormat({value: item.budget_item_value_total, currency: 'BRL', style: 'currency'})}</td>
                                        </tr>
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                        <div className="divider"></div>
                        <table className="payments">
                            <thead>
                                <tr>
                                    <th className="text-left">SUBTOTAL</th>
                                    <th className="text-right">{numberFormat({value: printNFCe.budget.budget_value, currency: `BRL`, style: `currency`})}</th>
                                </tr>
                                    <tr>
                                    <th className="text-left">DESCONTO</th>
                                    <th className="text-right">{numberFormat({value: printNFCe.budget.budget_value_discount, currency: `BRL`, style: `currency`})}</th>
                                </tr>
                                <tr>
                                    <th className="text-left">TOTAL</th>
                                    <th className="text-right">{numberFormat({value: printNFCe.budget.budget_value_total, currency: `BRL`, style: `currency`})}</th>
                                </tr>
                                <tr>
                                    <th className="text-left">PAGO</th>
                                    <th className="text-right">{numberFormat({value: (printNFCe.budget.budget_value_total + printNFCe.budget.document.vlTroco), currency: `BRL`, style: `currency`})}</th>
                                </tr>
                                <tr>
                                    <th className="text-left">TROCO</th>
                                    <th className="text-right">{numberFormat({value: printNFCe.budget.document.vlTroco, currency: `BRL`, style: `currency`})}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {printNFCe.budget.payments.map((payment, key) => (
                                    <tr key={key}>
                                        <td className="text-left">{payment.external.DsFormaPagamento} [{payment.budget_payment_installment}x]</td>
                                        <td className="text-right">{numberFormat({value: payment.budget_payment_value, currency: 'BRL', style: 'currency'})}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="divider"></div>                        
                        <div className="nfce-info">
                            <b>NFC-e: {printNFCe.budget.document.NrDocumento} Série: {printNFCe.budget.document.serie} Emissão {moment(printNFCe.budget.document.dhRecbto).format('DD/MM/YYYY')}</b><br/>
                            Consulte pela chave de acesso em:<br/>
                            http://www.fazenda.rj.gov.br/nfce/consulta<br/>
                            {printNFCe.budget.document.chNFe.substring(0,4)}&nbsp;
                            {printNFCe.budget.document.chNFe.substring(4,8)}&nbsp;
                            {printNFCe.budget.document.chNFe.substring(8,12)}&nbsp;
                            {printNFCe.budget.document.chNFe.substring(12,16)}&nbsp;
                            {printNFCe.budget.document.chNFe.substring(16,20)}&nbsp;
                            {printNFCe.budget.document.chNFe.substring(20,24)}&nbsp;
                            {printNFCe.budget.document.chNFe.substring(24,28)}&nbsp; 
                            {printNFCe.budget.document.chNFe.substring(28,32)}&nbsp;
                            {printNFCe.budget.document.chNFe.substring(32,36)}&nbsp;
                            {printNFCe.budget.document.chNFe.substring(36,40)}&nbsp;
                            {printNFCe.budget.document.chNFe.substring(40,44)}<br/>
                            Protocolo de autorização: {printNFCe.budget.document.nProt}<br/>
                            {moment((printNFCe.budget.document.dhRecbto).replace('T',' ').substring(0,19)).format('DD/MM/YYYY HH:mm:ss')}
                        </div>
                        <div className="divider"></div>
                        <div className="person">
                            <b>Cliente</b><br/>
                                {printNFCe.budget.person.NmPessoa}
                                {!printNFCe.budget.person.StConsumidor && !!printNFCe.budget.person.address && 
                                    <React.Fragment>
                                        <br/>{printNFCe.budget.person.address.NmLogradouro}, {printNFCe.budget.person.address.NrLogradouro}
                                        <br/>{printNFCe.budget.person.address.NmBairro} - {printNFCe.budget.person.address.NmCidade} - {printNFCe.budget.person.address.IdUF}
                                        <br/>CEP: {printNFCe.budget.person.address.CdCEP}
                                    </React.Fragment>
                                }                        
                        </div>
                        <div className="divider"></div>
                        {!!printNFCe.budget.document.qrCodePath &&
                            <div className="qr-code">
                                <img alt="Qr Code" src={`${host}qrcode/${printNFCe.budget.company_id}/${printNFCe.budget.document.qrCodePath}`} />
                            </div>
                        }
                        <div className="divider"></div>
                        <div className="ibpt">
                            Trib. Totais Incid. - Lei 12.741/2012 Fonte: IBPT<br/>
                            Tot. aprox. trib. federais {numberFormat({value: printNFCe.budget.document.vFedTrib, currency: `BRL`, style: `currency`})}<br/>
                            Tot. aprox. trib. estaduais {numberFormat({value: printNFCe.budget.document.vEstTrib, currency: `BRL`, style: `currency`})}<br/>
                            Tot. aprox. trib. municipais {numberFormat({value: printNFCe.budget.document.vMunTrib, currency: `BRL`, style: `currency`})}<br/>
                        </div>
                        <div className="cpl">
                            INFORMAÇÕES ADICIONAIS DO INTERESSE DO CONTRIBUINTE<br/>
                            PROCON: Av. Rio Branco,25 Centro RJ. Tel: 151 ALERJ - Rua da Alfandega, 8 Tel. 0800 2827060
                        </div>
                    </>
                }
            </div>
            <button ref={buttonRef} className="button-print" onClick={() => handleClickPrint()}><FaPrint/></button>
            <button className="button-print-close" onClick={() => handleClickClose()}><FaTimes/></button>
        </div>
    );
}

export default printNFCe;