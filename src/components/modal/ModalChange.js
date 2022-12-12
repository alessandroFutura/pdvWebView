import React, {useContext, useState, useEffect}  from "react";

import { Form, InputNumber } from 'rsuite';

import { RiExchangeDollarFill } from 'react-icons/ri';

import Context from '../../contexts/Context.js';
import {numberFormat} from '../../contexts/Global.js';

import "./ModalChange.css";

const ModalChange = () => { 
    
    const {modalChange, setModalChange} = useContext(Context);
    
    const [paidValue, setPaidValue] = useState(0);
    const [changeValue, setChangeValue] = useState(0);

    useEffect(() => {
        if(modalChange.opened){
            setPaidValue(0);
            setTimeout(() => {
                document.getElementById('paid-value').focus();
                document.getElementById('paid-value').select();
            },300);
        }
    }, [modalChange]);

    useEffect(() => {
        let changeValue = 0;
        let tmpPaidValue = paidValue.toString().replace(',','.');
        if(isNaN(Number(tmpPaidValue))){
            setPaidValue(0);   
        } else {
            changeValue = parseFloat(tmpPaidValue) - modalChange.chargedValue;
            setChangeValue(changeValue > 0 ? changeValue : 0);
        }
    }, [paidValue]);
    
    const handleChange = (value) => {
        setPaidValue(value);
    }

    const handleKeyUp = (e) => {
        if(e.keyCode === 13){
            // 13 : ENTER
            setModalChange({
                opened: paidValue === 0,
                paidValue: parseFloat(paidValue),
                changeValue: changeValue,
                chargedValue: modalChange.chargedValue
            });
        } 
        if(e.keyCode === 27){
            // 27 : ESC
            setModalChange({
                opened: false,
                paidValue: 0,
                changeValue: 0,
                chargedValue: 0
            });
        }        
    }

    return (
        <div className={`shadow ${modalChange.opened ? 'opened' : ''}`} style={{zIndex: 11}}>
            <div className={`modal modal-change box-shadow`}>
                <div className="header">
                    <RiExchangeDollarFill/>
                </div>
                <div className="body">
                    <Form>
                        <Form.Group controlId="charged-value">
                            <Form.ControlLabel>Valor Devido</Form.ControlLabel>
                            <Form.Control disabled={true} name="charged-value" value={numberFormat({value: modalChange.chargedValue})}  style={{width: 120}}/>
                        </Form.Group>
                        <Form.Group controlId="paid-value">
                            <Form.ControlLabel>Valor Recebido</Form.ControlLabel>
                            <InputNumber onKeyUp={(e) => handleKeyUp(e)} value={paidValue} onChange={(value) => handleChange(value)} step={0.01} />
                        </Form.Group>
                        <Form.Group controlId="change-value">
                            <Form.ControlLabel>Valor do Troco</Form.ControlLabel>
                            <Form.Control disabled={true} name="change-value" value={numberFormat({value: changeValue})} style={{width: 120}}/>
                        </Form.Group>
                    </Form>
                </div>                
            </div>
        </div>
    )
};

export default ModalChange;