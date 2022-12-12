import React, {useContext, useState, useEffect}  from "react";

import { Form, InputNumber } from 'rsuite';

import { RiMoneyDollarCircleLine } from 'react-icons/ri';

import Context from '../../contexts/Context.js';

import "./ModalOpening.css";

const ModalOpening = () => { 
    
    const {modalOpening, setModalOpening} = useContext(Context);
    
    const [openingValue, setOpeningValue] = useState(0);

    useEffect(() => {
        if(modalOpening.opened){
            setOpeningValue(0);
            setTimeout(() => {
                document.getElementById('opening-value').select();
            },300);
        }
    }, [modalOpening]);
    
    const handleChange = (value) => {
        setOpeningValue(value);
    };

    const handleKeyUp = (e) => {
        if(e.keyCode === 13 && openingValue > 0){
            setModalOpening({
                opened: true,
                submit: true,
                terminal_operation_type: 'A',
                terminal_operation_value: openingValue
            });
        }     
    };

    return (
        <div className={`shadow ${modalOpening.opened ? 'opened' : ''}`}>
            <div className={`modal modal-opening box-shadow`}>
                <div className="header">
                    <RiMoneyDollarCircleLine/>
                </div>
                <div className="body">
                    <Form>
                        <Form.Group controlId="opening-value">
                            <Form.ControlLabel>Abertura de Caixa</Form.ControlLabel>
                            <InputNumber onKeyUp={(e) => handleKeyUp(e)} value={openingValue} onChange={(value) => handleChange(value)} step={0.01} />
                        </Form.Group>
                    </Form>
                </div>                
            </div>
        </div>
    )
};

export default ModalOpening;