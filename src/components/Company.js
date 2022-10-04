import React from "react";

import "./Company.css";

const Company = ({company}) => {
    
    return (
        <div className="company">
            <div className="content">
                <div className="company-image" style={{backgroundImage: `url(${company.image})`}}></div>
                <div className="company-name">{company.company_code} - {company.company_name}</div>
            </div>
        </div>
    );
};

export default Company;