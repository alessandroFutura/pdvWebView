import React, { useState, useEffect, useContext } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import pt from 'date-fns/locale/pt';
import moment from 'moment';
import Api from '../../ServiceApi.js';
import {numberFormat} from "../../contexts/Global.js";
import Context from '../../contexts/Context.js';

// import DataGrid from '../../DataGrid.js';

import "./ModalDav.css";
import "react-datepicker/dist/react-datepicker.css";

registerLocale('pt', pt);

const ModalDav = () => {
    
    const {company, setDav, setLoading, setModalData} = useContext(Context);

    const [Davs, setDavs] = useState([]);
    const [DtReferencia, setDtReferencia] = useState(new Date());

    useEffect(() => {        
        getDavs();
    },[]);

    const handleDavClick = (dav) => {
        getDav(dav);
    };

    const handleModalDavSubmit = () => {
        getDavs();        
    };    

    const getDav = (dav) => {
        Api.post({
            script: 'dav', 
            action: 'get',
            data: dav
        }).then((data) => {
            setDav(data);
            setModalData({
                data: {},
                style: {
                    zIndex: 0,
                    opacity: 0,
                    display: 'none'
                }
            });
        });
    }

    const getDavs = () => {
        setLoading(loading => loading+1);
        Api.post({
            script: 'dav', 
            action: 'getList',
            data: {
                CdEmpresa: company.company_id,
                DtEmissao: moment(DtReferencia).format('YYYY-MM-DD')
            }
        }).then((data) => {
            setDavs(data);
            setLoading(loading => loading-1);
        });
    }

    return (
        <div className="ModalDav">
            <div className="filter">
                <div className="row">
                    <div className="Group G-6 padding-right-5">
                        <label>Nº DAV</label>
                        <input type="text" name="NrDocumentoAuxVenda" />
                    </div>
                    <div className="Group G-3 padding-5">
                        <label>Data</label>
                        <DatePicker 
                            locale="pt" 
                            dateFormat="dd/MM/yyyy" 
                            selected={DtReferencia} 
                            onChange={(date) => setDtReferencia(date)} 
                        />
                    </div>
                    <div className="Group G-3 padding-left-5">
                        <label>&nbsp;</label>
                        <button className="btn btn-green" onClick={() => handleModalDavSubmit()}>Pesquisar</button>
                    </div>
                </div>
            </div>
            <div className="davs">
                <table>
                    <thead>
                        <tr>
                            <th>DAV</th>
                            <th>Pessoa</th>
                            <th>Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Davs.map((Dav, key) => (
                            <tr key={key} onClick={() => {handleDavClick(Dav)}}>
                                <td>{Dav.NrDocumentoAuxVenda}</td>
                                <td>{Dav.NmPessoa}</td>
                                <td>{numberFormat({value: Dav.VlDocumento})}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>                
            </div>
        </div>
    );
};

export default ModalDav;