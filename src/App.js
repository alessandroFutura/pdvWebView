import React, {useEffect, useState} from "react";
import Api from './ServiceApi.js';

import './App.css';

import Modal from "./modal/Modal.js";
import Bar from './components/Bar.js';
import Form from './components/Form.js';
import Right from './components/Right.js';
import Company from './components/Company.js';

const App = () => {    
    
    useEffect(() => {
        getUser();
    },[]);
    
    const [user, setUser] = useState({});
    const [budget, setBudget] = useState({});
    const [loading, setLoading] = useState(0);
    const [company, setCompany] = useState({});
    const [modalData, setModalData] = useState({});
    const [modalStyle, setModalStyle] = useState({});   

    const getUser = () => {
        setLoading(loading+1);
        Api.post({script: 'user', action: 'get'}).then((res) => {
            setLoading(loading-1);
            setUser(res.data);
            setCompany(res.data.companies.filter(function(company){
                return company.user_company_main === 'Y';
            })[0]);
        });
    };

    const showModal = () => {
        setModalStyle({
            zIndex: 1,
            opacity: 1,
            display: 'block'
        }); 
    };

    return (
        <div className="container">
            <Modal modalData={modalData} modalStyle={modalStyle} setModalStyle={setModalStyle}/>
            <Form />
            <Bar showModal={showModal} setModalData={setModalData}/>
            <Company company={company}/>
            <Right />
        </div>
    );
};

export default App;