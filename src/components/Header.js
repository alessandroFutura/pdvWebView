import React, {useContext} from "react";

import { Toggle } from 'rsuite';

import moment from 'moment';
import 'moment/locale/pt-br';

import { MdLogout } from 'react-icons/md';
import { HiOutlineRefresh } from 'react-icons/hi';
import { BiInfoCircle, BiPrinter, BiCodeAlt } from 'react-icons/bi';

import Context from '../contexts/Context.js';

import {SelectPicker, DatePicker, Stack} from 'rsuite';

import "./Header.css";
import 'rsuite/dist/rsuite.min.css';

const Header = () => {
    
    const {
        time, 
        user, 
        company, setCompany, 
        filters, setFilters,
        setModalConfirm, setModalAuthorization
    } = useContext(Context);

    const data = user.companies.map(
        item => ({label: `${item.company_code} - ${item.company_short_name.toUpperCase()}`, value: item.company_id})
    );

    const handleButtonLogoutClick = () => {
        setModalConfirm({
            id: 'close',
            message: 'Deseja realmente encerrar o caixa?',
            opened: true,
            confirmed: false,
            buttonDenyText: 'Não',
            buttonConfirmText: 'Sim'
        });
    };

    const handlePostMessage = (msg) => {        
        window.electronMessage(msg,'appWindow');
    };

    const handleButtonRefrehClick = () => {
        setFilters({
            company_id: filters.company_id,
            states: filters.states,
            reference: filters.reference
        });
    };

    const handleButtonOpenDevToolsClick = () => {
        setModalAuthorization({
            action: 'openDevTools',
            title: 'Autorização',
            message: 'Para acessar a ferramenta será necessário a autorização',
            opened: true,
            authorized: false,
            buttonDenyText: 'Cancelar',
            buttonConfirmText: 'Autorizar',
            data: {}
        });
    }

    return (
        <div className="header" id="header">
            <div className="container">
                <div className="logo"></div>
                <div className="reference">
                    <label>DATA</label>
                    <Stack direction="column" alignItems="flex-start" spacing={6}>
                        <DatePicker 
                            oneTap={true}
                            cleanable={false}
                            format="dd/MM/yyyy"
                            defaultValue={new Date()}
                            onChange={(date) => setFilters({
                                company_id: filters.company_id,
                                states: filters.states,
                                reference: moment(date).format('YYYY-MM-DD')
                            })}
                        />
                    </Stack>
                </div>
                <div className="companies">
                    <label>EMPRESA</label>
                    <SelectPicker 
                        data={data} 
                        cleanable={false}
                        value={company.company_id}                        
                        onChange={(value) => {
                            let company = user.companies.filter(function(company){
                                return company.company_id === value;
                            })[0];
                            setCompany(company);                            
                        }}
                        placeholder="--" 
                    />
                </div>
                <button className="refresh" onClick={(e) => handleButtonRefrehClick()}>
                    <HiOutlineRefresh />
                </button>
                <div className="toggles">
                    <div className="toggle">
                        <Toggle defaultChecked onChange={(checked) => {
                            setFilters({
                                company_id: filters.company_id,
                                states: checked ? filters.states.concat(['A']) : (filters.states.length === 1 ? [] : ['F']),
                                reference: filters.reference
                            })
                        }}/><b>Abertos</b>
                    </div>
                    <div className="toggle">
                        <Toggle onChange={(checked) => {
                            setFilters({
                                company_id: filters.company_id,
                                states: checked ? filters.states.concat(['F']) : (filters.states.length === 1 ? [] : ['A']),
                                reference: filters.reference
                            })
                        }}/><b>Faturados</b>
                    </div>
                </div>
                <div className="date">
                    {moment().locale('pt-br').format('dddd')} - {moment().format('DD/MM/YYYY')} - {time}
                    <button onClick={() => handleButtonLogoutClick()}><MdLogout/></button>
                    <button onClick={() => handlePostMessage('about')}><BiInfoCircle /></button>
                    <button onClick={() => handlePostMessage('selectPrinter')}><BiPrinter/></button>
                    <button onClick={() => handleButtonOpenDevToolsClick()}><BiCodeAlt/></button>
                </div>
            </div>
        </div>
    )
}

export default Header;