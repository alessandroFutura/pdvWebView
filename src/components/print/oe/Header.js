import React from "react";
import moment from 'moment';

const Header = ({data, company}) => { 
    return (
        <table class="header">
            <tbody>
                <tr>
                    <td colSpan="2"><b>{company.company_name}</b></td>
                    <td><b>{company.external.NrCGC}</b></td>
                </tr>
                <tr>
                    <td className="logo"><img src={company.image}/></td>
                    <td className="company">
                        Loja {company.company_code} - {company.company_short_name}<br/>
                        {company.external.DsEndereco},  {company.external.NrLogradouro}<br/>
                        {company.external.NmBairro},  {company.external.NmCidade} - {company.external.CdUF}<br/>
                        CEP: ${company.external.NrCEP}
                    </td>
                    <td className="document">
                        <div className="box border">
                            Documento
                            <span>{data.NrDocumento}</span>
                        </div>
                        Emissão: {moment(data.DtEmissao).format('DD/MM/YYYY')}
                    </td>
                </tr>
            </tbody>
        </table>
    );
}

export default Header;