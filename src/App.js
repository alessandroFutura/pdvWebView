import React, {useEffect, useState} from "react";

import moment from 'moment';
import {Modal} from 'rsuite';
import Api from './ServiceApi.js';
import Context from './contexts/Context.js'

// import Bar from './components/Bar.js';
// import Form from './components/Form.js';
// import Modal from "./components/Modal.js";
// import Right from './components/Right.js';
// import Company from './components/Company.js';
import Header from './components/Header.js';
import Tabs from './components/Tabs.js';
import Budget from './components/Budget.js';
import Bar from './components/Bar.js';
import Footer from './components/Footer.js';
import Loading from "./components/Loading.js";
import ModalMessage from "./components/modal/ModalMessage.js";

import './App.css';

const App = () => {    
    
    useEffect(() => {
        getUser();
        setInterval(function(){
            setTime(moment().format('HH:mm'));
        },1000)
    },[]);

    const apiError = () => {
        setModalMessage({
            title: 'Atenção!',
            message: 'Resposta inesperada do servidor.',
            opened: true
        });
    }

    const [user, setUser] = useState({
        image: null,
        user_id: null,
        user_name: '',
        access: {},
        companies: []
    });

    const [company, setCompany] = useState({
        image: null,
        company_id: null,
        company_code: null,
        company_name: '',
        company_color: null
    });

    const [budget, setBudget] = useState({});
    const [budgets, setBudgets] = useState([]);
    const [budget_id, setBudgetId] = useState(null);

    const [modalMessage, setModalMessage] = useState({
        title: '',
        message: '',
        opened: false
    });
    
    const [loading, setLoading] = useState(0);    
    // const [modalData, setModalData] = useState({});
    const [loadingStyle, setLoadingStyle] = useState({});

    const [time, setTime] = useState(moment().format('HH:mm'));
    const [dtReferencia, setDtReferencia] = useState(new Date());

    useEffect(() => {
        showLoading();
    }, [loading]);

    useEffect(() => {
        if(!!company.company_id){
            getBudgets();
        }
    }, [company]);

    useEffect(() => {
        if(!!company.company_id){
            getBudgets();
        }
    }, [dtReferencia]);

    useEffect(() => {
        if(!!budget_id){
            getBudget();
        }
    }, [budget_id]);

    const getUser = () => {
        setLoading(loading => loading+1);
        Api.post({script: 'user', action: 'get'}).then((res) => {
            if(res.status === 200){
                setUser(res.data);
                setCompany(res.data.companies.filter(function(company){
                    return company.user_company_main === 'Y';
                })[0]);
            } else {
                apiError();
            }
            setLoading(loading => loading-1);   
        });
    };

    const getBudget = () => {
        setLoading(loading => loading+1);
        Api.post({script: 'budget', action: 'get', data: {
            budget_id: budget_id
        }}).then((res) => {
            if(res.status === 200){
                setBudget(res.data);                
            } else {
                apiError();
            }
            setLoading(loading => loading-1);
        });
    };

    const getBudgets = () => {
        setLoading(loading => loading+1);
        Api.post({script: 'budget', action: 'getList', data: {
            company_id: company.company_id,
            reference: moment(dtReferencia).format('YYYY-MM-DD')
        }}).then((res) => {
            if(res.status === 200){
                setBudgets(res.data);
            } else {
                setModalMessage({
                    title: 'Atenção!',
                    message: 'Resposta inesperada do servidor.',
                    opened: true
                })
            }
            setLoading(loading => loading-1);
        });
    };

    const showLoading = () => {        
        setLoadingStyle({
            display: loading > 0 ? 'block' : 'none'
        }); 
    };

    return (
        <Context.Provider value={{
            time,
            user,
            budget,
            budgets,
            company, setCompany, 
            budget_id, setBudgetId,
            dtReferencia, setDtReferencia,
            modalMessage, setModalMessage,
        }}>
            <Header/>
            <div className="body">
                <Tabs/>
                <Budget/>
            </div>
            <Bar/>
            <Footer/>
            <Modal/>
            <ModalMessage/>
            <Loading loadingStyle={loadingStyle}/>
        </Context.Provider>
    );
};

export default App;