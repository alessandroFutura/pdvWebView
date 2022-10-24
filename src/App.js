import React, {useEffect, useState} from "react";

import moment from 'moment';
import {Modal} from 'rsuite';
import Api from './ServiceApi.js';
import Context from './contexts/Context.js';



import Header from './components/Header.js';
import Tabs from './components/Tabs.js';
import Budget from './components/Budget.js';
import Bar from './components/Bar.js';
import Footer from './components/Footer.js';
import Loading from "./components/Loading.js";
// import ModalPayment from "./components/ModalPayment.js";
import ModalConfirm from "./components/modal/ModalConfirm.js";
import ModalMessage from "./components/modal/ModalMessage.js";

import './App.css';

const App = () => {    
    
    useEffect(() => {
        getUser();
        setInterval(function(){
            setTime(moment().format('HH:mm'));
        },1000)
    },[]);

    const [user, setUser] = useState({
        image: '',
        user_id: '',
        person_id: '',
        user_active: '',
        user_name: '',
        access: {},
        companies: []
    });

    const [company, setCompany] = useState({
        image: '',
        parent_id: '',
        company_id: '',
        company_code: '',
        company_name: '',
        company_color: '',
        user_company_main: '',
        company_short_name: ''
    });

    const [budget, setBudget] = useState({
        term_id: '',
        budget_id: '',
        client_id: '',
        seller_id: '',
        company_id: '',
        budget_value: '',
        document_code: '',
        external_type: '',
        budget_value_total: '',
        budget_value_discount: '',
        term: {
            IdPrazo: '',
            CdChamada: '',
            DsPrazo: ''
        },
        items: [],
        payments: [],
        person: {
            image: '',
            IdPessoa: '',
            CdChamada: '',
            NmPessoa: ''
        },
        seller: {
            image: '',
            IdPessoa: '',
            CdChamada: '',
            NmPessoa: ''
        }
    });

    const [filters, setFilters] = useState({
        states: ['L'],
        company_id: null,
        reference: moment().format('YYYY-MM-DD')
    });
    
    const [modalConfirm, setModalConfirm] = useState({
        title: '',
        message: '',
        opened: false,
        confirmed: false,
        buttonDenyText: '',
        buttonConfirmText: ''
    });

    const [modalMessage, setModalMessage] = useState({
        title: '',
        message: '',
        opened: false
    });

    const [loading, setLoading] = useState(0);
    const [budgets, setBudgets] = useState([]);
    const [budget_id, setBudgetId] = useState(null);   
    // const [modalData, setModalData] = useState({});
    const [loadingStyle, setLoadingStyle] = useState({});

    const [time, setTime] = useState(moment().format('HH:mm'));

    const afterModalConfirm = () => {
        switch(modalConfirm.id){
            case 'budget-submit': submitBudget(); break;
            case 'budget-cancel': initBudget(); break;
            default: break;
        }
    }

    const apiErrorMessage = () => {
        setModalMessage({
            title: 'Atenção!',
            message: 'Resposta inesperada do servidor.',
            opened: true
        });
    }

    const getUser = () => {
        setLoading(loading => loading+1);
        Api.post({script: 'user', action: 'get'}).then((res) => {
            if(res.status === 200){
                setUser(res.data);
                setCompany(res.data.companies.filter((company) => {
                    return company.user_company_main == 'Y'
                })[0]);
            } else {
                apiErrorMessage();
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
                apiErrorMessage();
            }
            setLoading(loading => loading-1);
        });
    };

    const getBudgets = () => {
        setLoading(loading => loading+1);
        Api.post({script: 'budget', action: 'getList', data: filters}).then((res) => {
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

    const initBudget = () => {
        setBudget({
            term_id: '',
            budget_id: '',
            client_id: '',
            seller_id: '',
            company_id: '',
            budget_value: '',
            document_code: '',
            external_type: '',
            budget_value_total: '',
            budget_value_discount: '',
            term: {
                IdPrazo: '',
                CdChamada: '',
                DsPrazo: ''
            },
            items: [],
            payments: [],
            person: {
                image: '',
                IdPessoa: '',
                CdChamada: '',
                NmPessoa: ''
            },
            seller: {
                image: '',
                IdPessoa: '',
                CdChamada: '',
                NmPessoa: ''
            }
        });
        setBudgetId(null);
    }

    const showLoading = () => {
        setLoadingStyle({
            display: loading > 0 ? 'block' : 'none'
        }); 
    };

    const submitBudget = () => {
        setLoading(loading => loading+1);
        Api.post({script: 'budget', action: 'submit', data: budget}).then((res) => {
            if(res.status === 200){
                          
            } else {
                console.log(res);
            }
            setLoading(loading => loading-1);
        });
    }

    useEffect(() => {
        showLoading();
    }, [loading]);

    useEffect(() => {
        if(!!company.company_id){
            setFilters({
                company_id: company.company_id,
                states: filters.states,
                reference: filters.reference
            });
        }
    }, [company]);

    useEffect(() => {
        if(!!filters.company_id){
            if(filters.states.length > 0){
                getBudgets();
            } else {
                setModalMessage({
                    title: 'Atenção!',
                    message: 'Pelo menos um status deverá ser selecionado.',
                    opened: true
                })
            }
        }
    }, [filters]);

    useEffect(() => {
        if(!!budget_id){
            getBudget();
        }
    }, [budget_id]);

    useEffect(() => {
        if(modalConfirm.confirmed){
            afterModalConfirm();
        }
    }, [modalConfirm]);

    return (
        <Context.Provider value={{
            time,
            user,
            budget,
            budgets,
            company, setCompany, 
            filters, setFilters,
            budget_id, setBudgetId,
            modalConfirm, setModalConfirm,
            modalMessage, setModalMessage,
        }}>
            <Header/>
            <div className="body">
                <Tabs initBudget={initBudget}/>
                <Budget/>
            </div>
            <Bar/>
            <Footer/>
            <Modal/>
            <ModalConfirm/>
            <ModalMessage/>
            <Loading loadingStyle={loadingStyle}/>
        </Context.Provider>
    );
};

export default App;