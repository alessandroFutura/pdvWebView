import React, {useEffect, useState, useContext} from "react";

import DataGrid from './DataGrid.js';
import Context from '../contexts/Context.js';
import {numberFormat} from '../contexts/Global.js';

import "./Tabs.css";

const Tabs = ({initBudget}) => {
    
    const [tab, setTab] = useState(1);
    const [styleButton1, setStyleButton1] = useState({zIndex:2});
    const [styleButton2, setStyleButton2] = useState({zIndex:0});
    const [styleTab1, setStyleTab1] = useState({display:'block', zIndex:1, opacity:1});
    const [styleTab2, setStyleTab2] = useState({display:'none', zIndex:0, opacity:0});

    const columns = [
        {dataKey: 'NrDocumento', HeaderCell:'DOCUMENTO'},
        {dataKey: 'NmCliente', HeaderCell:'CLIENTE'},
        {dataKey: 'NrDav', HeaderCell:'DAV'},
        {dataKey: 'NmVendedor', HeaderCell:'VENDEDOR'},
        {dataKey: 'VlDocumento', HeaderCell:'VALOR'}
    ];

    const [davs, setDavs] = useState([]);
    const [pedidos, setPedidos] = useState([]);
    const [dataRow, setDataRow] = useState({});
    const {budgets, setBudgetId} = useContext(Context);

    useEffect(() => {
        initBudget();
        setStyleButton1({zIndex: tab === 1 ? 2 : 0});
        setStyleButton2({zIndex: tab === 2 ? 2 : 0});
        setStyleTab1(tab === 1 ? {display:'block', zIndex:1, opacity:1} : {display:'none', zIndex:0, opacity:0});
        setStyleTab2(tab === 2 ? {display:'block', zIndex:1, opacity:1} : {display:'none', zIndex:0, opacity:0});
    }, [tab]);

    const afterGetPedidos = () => {
        let tmpDavs = [];
        let tmpPedidos = [];
        budgets.forEach(budget => {
            let data = {
                budget_id: budget.budget_id,
                NrDocumento: budget.nNF || '--',
                NmCliente: budget.NmPessoa,
                NrDav: budget.external_code,
                NmVendedor: budget.NmRepresentante.split(' ')[0],
                VlDocumento: numberFormat({value: budget.budget_value_total})
            };
            if(budget.external_type === 'D'){
                tmpDavs.push(data);
            } else {
                tmpPedidos.push(data);
            }
        });
        setDavs(tmpDavs);
        setPedidos(tmpPedidos);
    }

    useEffect(() => {
        afterGetPedidos();
    }, [budgets]);

    useEffect(() => {
        if(!!dataRow.budget_id){
            setBudgetId(dataRow.budget_id);
            setDataRow({});
        }
    }, [dataRow]);

    return (
        <div className="tabs">
            <button className="btn" style={styleButton1} onClick={() => setTab(1)}>CUPOM</button>
            <button className="btn" style={styleButton2} onClick={() => setTab(2)}>ORDEM DE ENTREGA</button>
            <div className="tab box-shadow" style={styleTab1}>
                <DataGrid dataColumns={columns} dataRows={davs} setDataRow={setDataRow} />
            </div>
            <div className="tab box-shadow" style={styleTab2}>
                <DataGrid dataColumns={columns} dataRows={pedidos} setDataRow={setDataRow}/>
            </div>
        </div>
    );
};

export default Tabs;