import React, {useContext} from "react";

import moment from 'moment';
import 'moment/locale/pt-br';

import Context from '../contexts/Context.js';

import {SelectPicker, DatePicker, Stack} from 'rsuite';

import "./Header.css";
import 'rsuite/dist/rsuite.min.css';

const Header = () => {
    
    const {time, user, company, setCompany, setDtReferencia} = useContext(Context);

    const data = user.companies.map(
        item => ({label: `${item.company_code} - ${item.company_name.toUpperCase()}`, value: item.company_id})
    );

    return (
        <div className="header">
            <div className="container">
                <div className="logo"></div>
                <div className="reference">
                    <label>DATA</label>
                    <Stack direction="column" alignItems="flex-start" spacing={6}>
                        <DatePicker 
                            cleanable={false}
                            format="dd/MM/yyyy"
                            defaultValue={new Date()}
                            onChange={(date) => setDtReferencia(date)}
                        />
                    </Stack>
                </div>
                <div className="companies">
                    <label>EMPRESA</label>
                    <SelectPicker 
                        data={data} 
                        cleanable={false}
                        value={company.company_id}                        
                        onChange={(value) => {setCompany(user.companies.filter(function(company){
                            return company.company_id === value;
                        })[0])}}
                        placeholder="--" 
                    />
                </div>
                <div className="date">
                    <div className="day-of-week">{moment().locale('pt-br').format('dddd')}</div>
                    <div className="day-of-year">{moment().format('DD/MM/YYYY')}</div>
                    <div className="time">{time}</div>
                </div>
            </div>
        </div>
    )
}

export default Header;