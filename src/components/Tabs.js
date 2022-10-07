import React, {useEffect, useState, useContext} from "react";

import DataGrid from './DataGrid.js';
import {DataType} from 'ka-table/enums';
import Context from '../contexts/Context.js';

import "./Tabs.css";

const Tabs = () => {
    
    const [tab, setTab] = useState(1);
    const [styleButton1, setStyleButton1] = useState({zIndex:2});
    const [styleButton2, setStyleButton2] = useState({zIndex:0});
    const [styleTab1, setStyleTab1] = useState({display:'block', zIndex:1, opacity:1});
    const [styleTab2, setStyleTab2] = useState({display:'none', zIndex:0, opacity:0});

    const columns = [
        {key: 'column1', title: 'DOCUMENTO', dataType: DataType.String},
        {key: 'column2', title: 'CLIENTE', dataType: DataType.String},
        {key: 'column3', title: 'DAV', dataType: DataType.String},
        {key: 'column4', title: 'VENDEDOR', dataType: DataType.String},
        {key: 'column5', title: 'PAGAMENTO', dataType: DataType.String},
        {key: 'column6', title: 'PRAZO', dataType: DataType.String},
        {key: 'column7', title: 'VALOR', dataType: DataType.String}
    ];

    const [davs, setDavs] = useState([{
        column1: '1',
                column2: '2',
                column3: '3',
                column4: '4',
                column5: '5',
                column6: '6',
                column7: '7',
      }]);
    const [pedidos, setPedidos] = useState([]);

    const {budgets} = useContext(Context);

    // const dataArray = [{
    //     column1: `Arroz`,
    //     column2: `Feijão`,
    //     column3: `Chuchu`,
    //     column4: `Inhame`,
    //     column5: `--`,
    //     column6: `--`,
    //     column7: `--`,
    //   },{
    //     column1: `Feijão`,
    //     column2: `Chuchu`,
    //     column3: `Inhame`,
    //     column4: `Arroz`,
    //     column5: `--`,
    //     column6: `--`,
    //     column7: `--`,
    //   },{
    //     column1: `Chuchu`,
    //     column2: `Inhame`,
    //     column3: `Arroz`,
    //     column4: `Feijão`,
    //     column5: `--`,
    //     column6: `--`,
    //     column7: `--`,
    //   },{
    //     column1: `Inhame`,
    //     column2: `Arroz`,
    //     column3: `Feijão`,
    //     column4: `Chuchu`,
    //     column5: `--`,
    //     column6: `--`,
    //     column7: `--`,
    //   }];

    useEffect(() => {
        getDAVs();
        setStyleButton1({zIndex: tab == 1 ? 2 : 0});
        setStyleButton2({zIndex: tab == 2 ? 2 : 0});
        setStyleTab1(tab == 1 ? {display:'block', zIndex:1, opacity:1} : {display:'none', zIndex:0, opacity:0});
        setStyleTab2(tab == 2 ? {display:'block', zIndex:1, opacity:1} : {display:'none', zIndex:0, opacity:0});
    }, [tab]);

    const getDAVs = () => {
        let data = budgets.map(
            item => ({
                column1: '1',
                column2: '2',
                column3: '3',
                column4: '4',
                column5: '5',
                column6: '6',
                column7: '7',
            })
        );console.log(data);
        setDavs([{
                column1: `Inhame`,
                column2: `Arroz`,
                column3: `Feijão`,
                column4: `Chuchu`,
                column5: `--`,
                column6: `--`,
                column7: `--`,
              }]);
    }

    const getPedidos = () => {
        setPedidos([]);
    }

    useEffect(() => {
        getDAVs();
        getPedidos();
        console.log('mudou');
    }, [budgets]);

    return (
        <div className="tabs">
            <button className="btn" style={styleButton1} onClick={() => setTab(1)}>CUPOM</button>
            <button className="btn" style={styleButton2} onClick={() => setTab(2)}>ORDEM DE ENTREGA</button>
            <div className="tab box-shadow" style={styleTab1}>
                <DataGrid columns={columns} dataArray={davs}/>
            </div>
            <div className="tab box-shadow" style={styleTab2}>
                <DataGrid columns={columns} dataArray={pedidos}/>
            </div>
        </div>
    );
};

export default Tabs;