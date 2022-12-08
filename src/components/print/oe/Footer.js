import React from "react";

const Footer = ({data}) => { 
    return (
        <div className="footer">
            <span>Data de impressão: {data.DtImpressao}</span>
            <span>Página {data.NrPagina}/{data.QtPaginas}</span>
        </div>
    );
}

export default Footer;