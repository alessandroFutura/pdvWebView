import React, {useContext}  from "react";
import Context from '../contexts/Context.js';

import "./Budget.css";

const Budget = () => {
    
    const {budget} = useContext(Context);

    return (
        <div className="budget">
            <div className="gary-gary"></div>
            <div className="gary-gary"></div>
            <div className="content box-shadow">
                <div className="empty">SELECIONE UM DOCUMENTO PARA FATURAR</div>
            </div>
        </div>
    );
};

export default Budget;