import React from "react";

const Operation = ({data}) => { 
    return (
        <table className="operation border">
            <tbody>
                <tr>
                    <td colSpan="2" className="border-bottom">
                        <span>Documento</span>
                        ({data.TpDocumento}) {data.DsDocumento}
                    </td>
                </tr>
                <tr>
                    <td>
                        <span>OPERAÇÃO</span>
                        {data.TpOperacao}
                    </td>
                    <td className="border-left">
                        <span>DESCRIÇÃO</span>
                        {data.NmOperacao}
                    </td>
                </tr>
            </tbody>
        </table>
    );
}

export default Operation;