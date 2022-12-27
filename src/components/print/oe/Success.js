import React from "react";

const Success = ({data}) => { 
    return (
        <div className="success">
            <p>
                Documento Faturado com sucesso!
                <br/><b>{data.NrDocumento}</b>
            </p>
        </div>
    );
}

export default Success;