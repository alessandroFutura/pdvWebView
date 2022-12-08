import React, {useContext} from "react";

import Context from '../contexts/Context.js';

import "./Footer.css";

const Footer = () => {

    const {user, company} = useContext(Context);

    return (
        <div className="footer">
            <div className="container">
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