import React from "react";

import "./Bar.css";

const Bar = ({showModal, setModalData}) => {

    const handleShortCutClick = (key) => {
        switch(key){
            case 1: 
                setModalData({
                    title: 'Procurar DAV',
                    element: 'ModalDav'
                });
                showModal();
            break;
            case 2: 
                setModalData({
                    title: 'Procurar Pedido',
                    element: 'ModalPedido'
                });
                showModal();
            break;
            case 8:
                window.afterLogout();
            break;
            default: break;
        }        
    };
    
    return (
        <div className="bar">
            <div className="content">
                <button onClick={() => handleShortCutClick(1)}>F1</button>
                <button onClick={() => handleShortCutClick(2)}>F2</button>
                <button onClick={() => handleShortCutClick(3)}>F3</button>
                <button onClick={() => handleShortCutClick(4)}>F4</button>
                <button onClick={() => handleShortCutClick(5)}>F5</button>
                <button onClick={() => handleShortCutClick(6)}>F6</button>
                <button onClick={() => handleShortCutClick(7)}>F7</button>
                <button onClick={() => handleShortCutClick(8)}>F8</button>
            </div>
        </div>
    );
};

export default Bar;