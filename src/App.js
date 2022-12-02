import React, {useEffect, useState} from "react";

import moment from 'moment';
import Api from './ServiceApi.js';
import Context from './contexts/Context.js';

import Header from './components/Header.js';
import Tabs from './components/Tabs.js';
import Budget from './components/Budget.js';
import Bar from './components/Bar.js';
import Footer from './components/Footer.js';
import Loading from "./components/Loading.js";
import ModalChange from "./components/modal/ModalChange.js";
import ModalConfirm from "./components/modal/ModalConfirm.js";
import ModalMessage from "./components/modal/ModalMessage.js";
import ModalPayment from "./components/modal/ModalPayment.js";
import ModalAuthorization from "./components/modal/ModalAuthorization.js";

import './App.css';
import './components/modal/Modal.css';

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
        terminal: {},
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
        },
        external: {
            StAgendaEntrega: '',
            DsObservacaoPedido: '',
            DsObservacaoDocumento: ''
        }
    });

    const [filters, setFilters] = useState({
        states: ['A'],
        company_id: null,
        reference: moment().format('YYYY-MM-DD')
    });
    
    const [modalAuthorization, setModalAuthorization] = useState({
        title: '',
        action: '',
        message: '',
        opened: false,
        buttonDenyText: '',
        buttonConfirmText: '',
        data: null
    });

    const [modalChange, setModalChange] = useState({
        opened: false,
        paidValue: 0,
        changeValue: 0,
        chargedValue: 0
    });

    const [modalConfirm, setModalConfirm] = useState({
        title: '',
        message: '',
        opened: false,
        confirmed: false,
        buttonDenyText: '',
        buttonConfirmText: '',
        data: null
    });

    const [modalMessage, setModalMessage] = useState({
        title: '',
        message: '',
        opened: false
    });

    const [modalResponse, setModalResponse] = useState({
        class: '',
        title: '',
        message: '',
        opened: false
    });

    const [modalPayment, setModalPayment] = useState({
        opened: false
    });

    const [loading, setLoading] = useState(0);
    const [budgets, setBudgets] = useState([]);
    const [budget_id, setBudgetId] = useState(null);     
    const [loadingStyle, setLoadingStyle] = useState({});    
    const [time, setTime] = useState(moment().format('HH:mm'));

    const afterModalAuthorized = () => {
        switch(modalAuthorization.action){
            case "documentCancel": 
                cancelDocument(modalAuthorization.data); 
            break;
            default: break;
        }
    };

    const afterModalConfirm = () => {
        switch(modalConfirm.id){
            case 'budget-submit': 
                let moneyValue = getMoneyValue();
                if(moneyValue > 0){
                    setModalChange({
                        opened: true,
                        paidValue: 0,
                        changeValue: 0,
                        chargedValue: moneyValue
                    });
                } else {
                    submitBudget();
                }
            break;
            case 'budget-cancel': 
                initBudget(); 
            break;
            case 'document-cancel': 
                setModalAuthorization({
                    action: 'documentCancel',
                    title: 'Autorização',
                    message: 'Para cancelar o documento será necessário a autorização',
                    opened: true,
                    authorized: false,
                    buttonDenyText: 'Cancelar',
                    buttonConfirmText: 'Autorizar',
                    data: modalConfirm.data
                });
            break;
            default: break;
        }
    }

    const apiErrorMessage = (data) => {
        setModalMessage({
            class: 'danger',
            title: !!data && !!data.title ? data.title : 'Atenção!',
            message: !!data && !!data.message ? data.message :'Resposta inesperada do servidor.',
            opened: true
        });
    }

    const cancelDocument = (data) => {
        initBudget();
        setLoading(loading => loading+1);
        Api.post({script: 'document', action: 'cancel', data: data}).then((res) => {
            if(res.status === 200){
                getBudgets();
                setModalResponse({
                    class: 'success',
                    title: res.data.nNF,
                    message: 'Documento cancelado com sucesso!',
                    opened: true
                });
            } else {
                setModalMessage({
                    class: 'warning',
                    title: !!res.response && !!res.response.data && !!res.response.data.title ? res.response.data.title : 'Atenção!',
                    message: !!res.response && !!res.response.data && !!res.response.data.message ? res.response.data.message : 'Resposta inesperada do servidor.',
                    opened: true
                });
            }
            setLoading(loading => loading-1);
        });
    }
    
    const getUser = () => {
        setLoading(loading => loading+1);
        Api.post({script: 'user', action: 'get'}).then((res) => {
            if(res.status === 200){
                setUser(res.data);
                setCompany(res.data.companies.filter((company) => {
                    return company.user_company_main === 'Y'
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
        initBudget();        
        setLoading(loading => loading+1);
        Api.post({script: 'budget', action: 'getList', data: filters}).then((res) => {
            if(res.status === 200){
                setBudgets(res.data);
            } else {
                setModalMessage({
                    class: 'warning',
                    title: 'Atenção!',
                    message: 'Resposta inesperada do servidor.',
                    opened: true
                })
            }
            setLoading(loading => loading-1);
        });
    };

    const getMoneyValue = () => {
        let payment = budget.payments.filter((payment) => {
            return payment.modality_id === '00A0000001'
        });
        return payment.length > 0 ? payment[0].budget_payment_value : 0
    }    

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
            },
            external: {
                StAgendaEntrega: '',
                DsObservacaoPedido: '',
                DsObservacaoDocumento: ''
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
        let data = budget;
        data.company = company;
        data.change = {
            paidValue: modalChange.paidValue,
            changeValue: modalChange.changeValue,
            chargedValue: modalChange.chargedValue
        };
        setLoading(loading => loading+1);
        setModalPayment({opened: false});
        Api.post({script: 'document', action: 'submit' + (budget.external_type === 'D' ? 'NFCe' : 'OE'), data: data}).then((res) => {
            if(res.status === 200){
                getBudgets();
                setModalMessage({
                    class: 'success',
                    title: res.data.NrDocumento,
                    message: 'Documento faturado com sucesso!',
                    opened: true
                });
            } else {
                setModalMessage({
                    class: 'danger',
                    title: res.response.data.title || 'Atenção',
                    message: res.response.data.message,
                    opened: true
                });
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
            initBudget();
            getBudgets();
        }
    }, [filters]);

    useEffect(() => {
        if(!!budget_id){
            getBudget();
        }
    }, [budget_id]);

    useEffect(() => {
        if(!modalChange.opened && modalChange.paidValue > 0){
            submitBudget();
        }
    }, [modalChange]);

    useEffect(() => {
        if(modalConfirm.confirmed){
            afterModalConfirm();
        }
    }, [modalConfirm]);

    useEffect(() => {
        if(modalAuthorization.authorized){
            afterModalAuthorized();
        }
    }, [modalAuthorization]);

    return (
        <Context.Provider value={{
            time,
            user,
            budget,
            budgets,
            setLoading,
            company, setCompany, 
            filters, setFilters,
            budget_id, setBudgetId,
            modalChange, setModalChange,
            modalConfirm, setModalConfirm,
            modalMessage, setModalMessage,
            modalPayment, setModalPayment,
            modalResponse, setModalResponse,
            modalAuthorization, setModalAuthorization
        }}>
            <Header/>
            <div className="body">
                <Tabs initBudget={initBudget}/>
                <Budget/>
            </div>
            <Bar/>
            <Footer/>
            <ModalChange/>
            <ModalConfirm/>
            <ModalMessage/>
            <ModalPayment/>
            <ModalAuthorization/>
            <Loading loadingStyle={loadingStyle}/>
        </Context.Provider>
    );
};

export default App;