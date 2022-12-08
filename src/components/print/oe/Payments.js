import React from "react";
import moment from 'moment';
import {numberFormat} from '../../../contexts/Global.js';

const Payments = ({term, payments}) => {
    return (
        <div className="data-payments">
            PRAZO: {!!term ? term.DsPrazo : 'NÃO INFORMADO'}
            <table className="payments">
                <thead>
                    <tr>
                        <th>Parcela</th>
                        <th>Modalidade</th>
                        <th>Valor</th>
                        <th>Vencimento</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map((payment, key) => (
                        <tr key={key}>
                            <td>{key+1}</td>
                            <td>{payment.external.DsFormaPagamento}</td>
                            <td>{numberFormat({value: payment.budget_payment_value, currency: 'BRL', style: 'currency'})}</td>
                            <td>{moment(payment.budget_payment_deadline).format('DD/MM/YYYY')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Payments;