import React from "react";
import moment from 'moment';

const Signature = ({data}) => { 
    return (
        <table className="signature border">
            <tbody>
                <tr>
                    <td>
                        <table>
                            <tbody>
                                <tr>
                                    <td colSpan="2" className="border-bottom">Nome Legível</td>
                                </tr>
                                <tr>
                                    <td>Data de Emissão: {moment(data.DtEmissao).format('DD/MM/YYYY')}</td>
                                    <td className="border-left">Data do Recebimento: ____/____/________</td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                    <td width="130" className="border-left text-right">Documento<span>{data.NrDocumento}</span></td>
                </tr>
            </tbody>
        </table>
    );
}

export default Signature;