import React from "react";

import Context from '../contexts/Context.js';

import "./Right.css";

const Right = () => {
    
    const {budget} = useContext(Context);

    return (
        <div className="right">
            <div className="print"></div>
            <div className="paper">
                <div className="top"></div>
                <div className="header">LISTA DE ÍTENS</div>
                <div className="body"></div>
            </div>
        </div>
    );
};

export default Right;