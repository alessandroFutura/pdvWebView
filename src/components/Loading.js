import React from "react";

import "./Loading.css";

const Loading = ({loadingStyle}) => {
    
    return (
        <div className="loading" style={loadingStyle}>
            <div className="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default Loading;