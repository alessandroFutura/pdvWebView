import React from "react";

const Person = ({person}) => { 
    return (
        <table className="person border">
            <tbody>
                <tr>
                    <td className="border-bottom border-right"><span>CLIENTE</span>{person.NmPessoa}</td>
                    <td className="border-bottom border-right"><span>CÓDIGO</span>{person.CdChamada}</td>
                    <td className="border-bottom"><span>{person.TpPessoa === 'F' ? 'CPF' : 'CNPJ'}</span>{person.CdCPF_CGC}</td>
                </tr>
                <tr>
                    <td colSpan="2">
                        <span>ENDEREÇO DE ENTREGA</span>
                        {person.address.NmLogradouro}, 
                        {person.address.NrLogradouro} -  
                        {person.address.NmBairro} -  
                        {person.address.NmCidade} -  
                        {person.address.IdUF}
                    </td>
                    <td className="border-left"><span>CEP</span>{person.address.CdCEP}</td>
                </tr>
            </tbody>
        </table>
    );
}

export default Person;