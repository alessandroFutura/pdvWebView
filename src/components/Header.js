import React, {useContext} from "react";

import { Toggle } from 'rsuite';

import moment from 'moment';
import 'moment/locale/pt-br';

import { HiOutlineRefresh } from 'react-icons/hi';

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
        setModalResponse
    } = useContext(Context);

    const data = user.companies.map(
        item => ({label: `${item.company_code} - ${item.company_short_name.toUpperCase()}`, value: item.company_id})
    );

    const handleAbout = () => {
        setModalResponse({
            class: 'success',
            title: 'Sucesso!',
            message: 'Documento faturado com sucesso!',
            opened: true
        });
        //window.postMessage('about');
    }

    const handleButtonRefrehClick = () => {
        setFilters({
            company_id: filters.company_id,
            states: filters.states,
            reference: filters.reference
        });
    };

    return (
        <div className="header">
            <div className="container">
                <div className="logo" onClick={() => handleAbout()}></div>
                <div className="reference">
                    <label>DATA</label>
                    <Stack direction="column" alignItems="flex-start" spacing={6}>
                        <DatePicker 
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
                <button onClick={(e) => handleButtonRefrehClick()}>
                    <HiOutlineRefresh />
                </button>
                <div className="toggles">
                    <div className="toggle">
                        <Toggle defaultChecked onChange={(checked) => {
                            setFilters({
                                company_id: filters.company_id,
                                states: checked ? filters.states.concat(['L']) : (filters.states.length === 1 ? [] : ['B']),
                                reference: filters.reference
                            })
                        }}/><b>Abertos</b>
                    </div>
                    <div className="toggle">
                        <Toggle onChange={(checked) => {
                            setFilters({
                                company_id: filters.company_id,
                                states: checked ? filters.states.concat(['B']) : (filters.states.length === 1 ? [] : ['L']),
                                reference: filters.reference
                            })
                        }}/><b>Faturados</b>
                    </div>
                </div>
                <div className="date">
                    {moment().locale('pt-br').format('dddd')} - {moment().format('DD/MM/YYYY')} - {time}
                </div>
            </div>
        </div>
    )
}

export default Header;