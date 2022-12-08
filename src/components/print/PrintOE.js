import React, {useContext, useLayoutEffect, useRef} from "react";

import Context from '../../contexts/Context.js';

import {FaPrint,FaTimes} from 'react-icons/fa';

import moment from 'moment';

import Note from './oe/Note.js';
import Items from './oe/Items.js';
import Footer from './oe/Footer.js';
import Header from './oe/Header.js';
import Person from './oe/Person.js';
import Payments from './oe/Payments.js';
import Operation from './oe/Operation.js';
import Signature from './oe/Signature.js';

import "./PrintOE.css";

const PrintOE = ({getEmptyBudget}) => { 

    const buttonRef = useRef(null);

    const DtImpressao = moment().format('DD/MM/YYYY HH:mm:ss');

    const {company, printOE, setPrintOE} = useContext(Context);

    const handleClickPrint = () => {
        window.print();
    };

    const handleClickClose = () => {
        setPrintOE({
            opened: false,
            budget: getEmptyBudget()
        });
    };

    useLayoutEffect(() => {
        if(printOE.opened && !!printOE.budget && !!printOE.budget.budget_id){
            buttonRef.current.focus();
        }
    },[printOE]);

    return (
        <div className={`shadow overflow-y ${printOE.opened ? 'opened' : ''}`}>
            {!!printOE.budget.budget_id &&
                <div className="print-oe">
                    <div className="data-print">
                        <Signature data={{
                            DtEmissao: printOE.budget.document.terminal_document_date, 
                            NrDocumento: printOE.budget.document.nNF
                        }}/>
                        <hr/>
                        <Header data={{
                            DtEmissao: printOE.budget.document.terminal_document_date, 
                            NrDocumento: printOE.budget.document.nNF
                        }} company={company}/>
                        <Operation data={{
                            TpDocumento: 'OE',
                            DsDocumento: 'ORDEM DE ENTREGA',
                            TpOperacao: 'VENDA',
                            NmOperacao: printOE.budget.operation.NmOperacao
                        }}/>
                        <Person person={printOE.budget.person}/>
                        <Items items={printOE.budget.items}/>
                        <Payments
                            term={printOE.budget.term}
                            payments={printOE.budget.payments}
                        />
                        <Note data={{
                            VlDocumento: printOE.budget.budget_value,
                            AlDesconto: printOE.budget.budget_aliquot_discount,
                            VlDesconto: printOE.budget.budget_value_discount,
                            VlTotal: printOE.budget.budget_value_total,
                            DsObservacaoDocumento: printOE.budget.external.DsObservacaoDocumento
                        }}/>
                        <Footer data={{
                            DtImpressao: DtImpressao,
                            NrPagina: 1,
                            QtPaginas: 1
                        }}/>                        
                    </div>
                </div>
            }
            <button ref={buttonRef} className="button-print" onClick={() => handleClickPrint()}><FaPrint/></button>
            <button className="button-print-close" onClick={() => handleClickClose()}><FaTimes/></button>
        </div>
    );
}

export default PrintOE;