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

    // const [openedToggle, setOpenedToggle] = useState(true);

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
            reference: filters.reference,
            show_opened: filters.show_opened,
            show_billed: filters.show_billed,
            show_others: filters.show_others
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
    };

    const handleToggleOpenClick = (checked) => {
        setFilters({
            company_id: filters.company_id,
            reference: filters.reference,
            show_opened: checked ? 'Y' : 'N',
            show_billed: filters.show_billed,
            show_others: filters.show_others
        });
    };

    const handleToggleBilledClick = (checked) => {
        setFilters({
            company_id: filters.company_id,
            reference: filters.reference,
            show_opened: filters.show_opened,
            show_billed: checked ? 'Y' : 'N',
            show_others: filters.show_others
        });
    };

    const handleToggleOthersClick = (checked) => {
        setFilters({
            company_id: filters.company_id,
            reference: filters.reference,
            show_opened: filters.show_opened,
            show_billed: filters.show_billed,
            show_others: checked ? 'Y' : 'N'
        });
    };

    return (
        <div className="header" id="header">
            <div className="container">
                <div className="logo"></div>
                <div className="buttons">
                    <button onClick={() => handleButtonLogoutClick()}><MdLogout/></button>
                    <button onClick={() => handlePostMessage('about')}><BiInfoCircle /></button>
                    <button onClick={() => handlePostMessage('selectPrinter')}><BiPrinter/></button>
                    <button onClick={() => handleButtonOpenDevToolsClick()}><BiCodeAlt/></button>
                </div>
                <div className="filter">
                    <div className="grid reference">
                        <label>DATA</label>
                        <Stack direction="column" alignItems="flex-start" spacing={6}>
                            <DatePicker 
                                oneTap={true}
                                cleanable={false}
                                format="dd/MM/yyyy"
                                defaultValue={new Date()}
                                onChange={(date) => setFilters({
                                    company_id: filters.company_id,
                                    reference: moment(date).format('YYYY-MM-DD'),
                                    show_opened: filters.show_opened,
                                    show_billed: filters.show_billed,
                                    show_others: filters.show_others
                                })}
                            />
                        </Stack>
                    </div>
                    <div className="grid companies">
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
                    <div className="grid toggle">
                        <Toggle checked={filters.show_opened === 'Y'} onChange={(checked) => {
                            handleToggleOpenClick(checked);                            
                        }}/><b onClick={() => handleToggleOpenClick(filters.show_opened === 'N')}>Abertos</b>
                    </div>
                    <div className="grid toggle">
                        <Toggle checked={filters.show_billed === 'Y'} onChange={(checked) => {
                            handleToggleBilledClick(checked);
                        }}/><b onClick={() => handleToggleBilledClick(filters.show_billed === 'N')}>Faturados</b>
                    </div>
                    <div className="grid toggle">
                        <Toggle checked={filters.show_others === 'Y'} onChange={(checked) => {
                            handleToggleOthersClick(checked);
                        }}/><b onClick={() => handleToggleOthersClick(filters.show_others === 'N')}>Todos</b>
                    </div>
                    <button onClick={(e) => handleButtonRefrehClick()}>
                        <HiOutlineRefresh />
                    </button>
                </div>
                <div className="date">
                    {moment().locale('pt-br').format('dddd')} - {moment().format('DD/MM/YYYY')} - {time}
                </div>               
            </div>
        </div>
    )
}

export default Header;