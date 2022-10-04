import React, { useState, useEffect } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import pt from 'date-fns/locale/pt';
import Api from '../../ServiceApi.js';

import "./ModalDav.css";
import "react-datepicker/dist/react-datepicker.css";

registerLocale('pt', pt);

const ModalDav = () => {
    
    useEffect(() => {
        getDavs();
    },[]);

    const [Davs, setDavs] = useState([]);
    const [DtReferencia, setDtReferencia] = useState(new Date());

    const handleModalDavSubmit = () => {
        getDavs();
    };

    const getDavs = () => {
        Api.post({script: 'dav', action: 'getList'}).then((res) => {
            setDavs(res.data);
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
                            onChange={(date:Date) => setDtReferencia(date)} 
                        />
                    </div>
                    <div className="Group G-3 padding-left-5">
                        <label>&nbsp;</label>
                        <button className="btn btn-green" onClick={() => handleModalDavSubmit()}>Pesquisar</button>
                    </div>
                </div>
            </div>
            <div className="davs">
                {Davs.map((Dav, key) => (
                    <div key={key} className="dav">
                        <b onClick="concole.log({Dav})">{Dav.NrDocumentoAuxVenda}</b><br/>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ModalDav;