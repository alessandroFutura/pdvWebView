import React, {useContext} from "react";

import moment from 'moment';
import 'moment/locale/pt-br';
import pt from 'date-fns/locale/pt';
import { SelectPicker } from 'rsuite';
import Context from '../contexts/Context.js';
import DatePicker, { registerLocale } from "react-datepicker";

import "./Header.css";
import 'rsuite/dist/rsuite.min.css';
import "react-datepicker/dist/react-datepicker.css";

registerLocale('pt', pt);

const Header = () => {
    
    const {time, user, company, setCompany, dtReferencia, setDtReferencia} = useContext(Context);

    const data = user.companies.map(
        item => ({label: `${item.company_code} - ${item.company_name.toUpperCase()}`, value: item.company_id})
    );

    return (
        <div className="header">
            <div className="container">
                <div className="logo"></div>
                <div className="reference">
                    <label>DATA</label>
                    <DatePicker 
                        locale="pt" 
                        dateFormat="dd/MM/yyyy" 
                        selected={dtReferencia}
                        onChange={(date) => setDtReferencia(date)} 
                    />
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