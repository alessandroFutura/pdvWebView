import React from "react";
import {numberFormat} from '../../../contexts/Global.js';

const Note = ({data}) => { 
    return (
        <div className="note">
            <table className="border">
                <tbody>
                    <tr>
                        <td className="border-right"><span>SUBTOTAL</span>{numberFormat({value: data.VlDocumento, currency: 'BRL', style: 'currency'})}</td>
                        <td className="border-right"><span>ACRÉSCIMO</span>{numberFormat({value: 0, style: 'percent'})}</td>
                        <td className="border-right"><span>ACRÉSCIMO</span>{numberFormat({value: 0, currency: 'BRL', style: 'currency'})}</td>
                        <td className="border-right"><span>DESCONTO</span>{numberFormat({value: data.AlDesconto, style: 'percent'})}</td>
                        <td className="border-right"><span>DESCONTO</span>{numberFormat({value: data.VlDesconto, currency: 'BRL', style: 'currency'})}</td>
                        <td><span>VALOR TOTAL</span>{numberFormat({value: data.VlTotal, currency: 'BRL', style: 'currency'})}</td>
                    </tr>
                </tbody>
            </table>
            <div className="text border">Obs.: {data.DsObservacaoDocumento || ''}</div>
        </div>
    );
}

export default Note;