import React, {useContext, useRef, useEffect}  from "react";

import Context from '../../contexts/Context.js';

import { BsCheck2Circle } from 'react-icons/bs';

import "./ModalSuccess.css";

const ModalSuccess = () => {  

    const ref = useRef(null);

    const {
        printOE, setPrintOE,
        printNFCe, setPrintNFCe,
        modalSuccess, setModalSuccess
    } = useContext(Context);

    const close = () => {
        setModalSuccess({
            opened: false,
            data: modalSuccess.data
        });
    };

    const handleCloseClick = () => {
        close();
    };

    const handlePrintPreviewClick = () => {
        if(modalSuccess.data.DsModelo === '65'){
			setPrintNFCe({
				opened: true,
				reprint: false,
				budget: printNFCe.budget,
				budget_id: modalSuccess.data.budget_id
			});
		} else {
			setPrintOE({
				opened: true,
                reprint: false,
				budget: printOE.budget,
				budget_id: modalSuccess.data.budget_id
			});
		}
        close();
    };

    useEffect(() => {
        if(modalSuccess.opened){
            setTimeout(() => {
                ref.current.focus();
            },300);
        }
    }, [modalSuccess]);

    return (
        <div className={`shadow shadow-modal ${modalSuccess.opened ? 'opened' : ''}`}>
            <div className="modal modal-success box-shadow">
                <div className="header">
                    <BsCheck2Circle/>
                </div>
                <div className="body">
                    <p>
                        Documento Faturado com sucesso!
                        <br/><b>{modalSuccess.data.NrDocumento}</b>
                    </p>
                </div>
                <div className="footer">
                    <button onClick={(e) => handleCloseClick()}>Fechar</button>
                    <button ref={ref} onClick={(e) => handlePrintPreviewClick()}>Visualizar Impressão</button>
                </div>
            </div>
        </div>
    )
}

export default ModalSuccess;