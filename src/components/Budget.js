import React, {useContext}  from "react";
import Context from '../contexts/Context.js';
import {numberFormat} from '../contexts/Global.js';

import "./Budget.css";

const Budget = () => {
    
    const {budget} = useContext(Context);    

    return (
        <div className="budget">
            <div className="gary-gary"></div>
            <div className="gary-gary"></div>
            <div className="content box-shadow">
                <div style={{display:(!!budget.items > 0 ? 'none' : 'block')}} className="empty">
                    SELECIONE UM DOCUMENTO PARA FATURAR
                </div>
                <div style={{display:(!!budget.items > 0 ? 'block' : 'none')}} className="items">
                    {(budget.items || []).map((item, key) => (
                        <div key={key} className="item">
                            <div className="CdChamada">{item.product.CdChamada}</div>
                            <div className="NmProduto">{item.product.NmProduto}</div>
                            <div className="QtUnidade">{numberFormat({value: item.budget_item_quantity})} {item.product.unit.CdSigla}</div>
                            <div className="VlItem">R$ {numberFormat({value: item.budget_item_value})}</div>
                            <div className="VlTotalItem">R$ {numberFormat({value: item.budget_item_value_total})}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Budget;