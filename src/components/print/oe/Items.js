import React from "react";
import {numberFormat} from '../../../contexts/Global.js';

const Items = ({items}) => { 
    return (
        <table className="items">
            <thead>
                <tr>
                    <th>Item</th>
                    <th>Código</th>
                    <th>Produto</th>
                    <th>Unidade</th>
                    <th>Qtd</th>
                    <th>Valor</th>
                    <th colSpan="2">Desconto</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                {items.map((item, key) => (
                    <tr key={key}>
                        <td>{key+1}</td>
                        <td>{item.product.CdChamada}</td>
                        <td>{item.product.NmProduto}</td>
                        <td>{item.product.CdSigla}</td>
                        <td>{numberFormat({value: item.budget_item_quantity, minDecimals: 3, maxDecimals: 3})}</td>
                        <td>{numberFormat({value: item.budget_item_value, 'currency': 'BRL', style: 'currency'})}</td>
                        <td>{numberFormat({value: item.budget_item_aliquot_discount, style: 'percent'})}</td>
                        <td>{numberFormat({value: item.budget_item_value_discount, 'currency': 'BRL', style: 'currency'})}</td>
                        <td>{numberFormat({value: item.budget_item_value_total, 'currency': 'BRL', style: 'currency'})}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Items;