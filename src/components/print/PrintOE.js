import React, {useContext, useLayoutEffect, useRef} from "react";

import Context from '../../contexts/Context.js';
import {host, numberFormat} from '../../contexts/Global.js';

import {FaPrint,FaTimes} from 'react-icons/fa';

import Header from './oe/Header.js';
import Signature from './oe/Signature.js';

import "./PrintOE.css";

const PrintOE = ({getEmptyBudget}) => { 

    const buttonRef = useRef(null);

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
                    </div>
                </div>
            }
            <button ref={buttonRef} className="button-print" onClick={() => handleClickPrint()}><FaPrint/></button>
            <button className="button-print-close" onClick={() => handleClickClose()}><FaTimes/></button>
        </div>
    );
}

export default PrintOE;