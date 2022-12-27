import React, {useContext} from "react";

import Context from '../contexts/Context.js';

import "./Footer.css";

const Footer = () => {

    const {user, company} = useContext(Context);

    return (
        <div id="footer">
            <div className="container">
                <div className="legend">
                    <div className="item opened"><span></span>Aberto</div>
                    <div className="item billed"><span></span>Faturado</div>
                    <div className="item rejected"><span></span>Rejeitado</div>
                    <div className="item canceled"><span></span>Cancelado</div>
                </div>
                <div className="company">
                    <div className="company-image" style={{backgroundImage: `url(${company.image})`}}></div>
                    <div className="company-name">{company.company_code} - {company.company_short_name.toUpperCase()}</div>
                </div>
                <div className="user">
                    <div className="user-image" style={{backgroundImage: `url(${user.image})`}}></div>
                    <div className="user-name">{user.user_name.toUpperCase()}</div>
                </div>                
            </div>
        </div>
    );
}

export default Footer;