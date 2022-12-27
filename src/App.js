import React, {useEffect, useState} from "react";

import moment from 'moment';
import Api from './ServiceApi.js';
import Context from './contexts/Context.js';

import Bar from './components/Bar.js';
import Tabs from './components/Tabs.js';
import Footer from './components/Footer.js';
import Header from './components/Header.js';
import Loading from "./components/Loading.js";
import PrintOE from './components/print/PrintOE.js';
import PrintNFCe from './components/print/PrintNFCe.js';
import ModalBudget from "./components/modal/ModalBudget.js";
import ModalChange from "./components/modal/ModalChange.js";
import ModalConfirm from "./components/modal/ModalConfirm.js";
import ModalMessage from "./components/modal/ModalMessage.js";
import ModalOpening from "./components/modal/ModalOpening.js";
import ModalPayment from "./components/modal/ModalPayment.js";
import ModalSuccess from "./components/modal/ModalSuccess.js";
import ModalAuthorization from "./components/modal/ModalAuthorization.js";

import './App.css';
import './components/modal/Modal.css';
import './components/print/Print.css';
import './components/grid/DataGrid.css';

const App = () => {    
    
    useEffect(() => {
        getData();
        printing();
        setInterval(() => setTime(moment().format('HH:mm')), 1000);
    },[]);

    const getEmptyBudget = () => {
        return {
            term_id: '',
            budget_id: '',
            client_id: '',
            seller_id: '',
            company_id: '',
            budget_value: 0,
            document_code: '',
            external_type: '',
            budget_value_total: 0,
            budget_value_discount: 0,
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
            },
            document: {
                vFedTrib: 0,
                vEstTrib: 0,
                vMunTrib: 0,
                vlPago: 0,
                vlTroco: 0,
                vlCobrado: 0,
                chNFe: '',
                nProt: '',
                dhRecbto: ''
            },
            instance: {
                instance_id: null,
                user_name: null,
                host_ip: null,
                host_name: null,
                budget_instance_date: null
            }
        };
    };

    const getEmptyCompany = () => {
        return {
            image: 'null',
            company_id: 'null',
            company_code: 'null',
            company_name: 'null',
            company_color: 'null',
            company_short_name: '',
            user_company_main: 'null',
            company_sector_id: 'null',
            external: {
                NrCGC: 'null',
                NmEmpresa: 'null',
                CdUF: 'null',
                CdIBGE: 'null',
                TpLogradouro: '',
                DsEndereco: 'null',
                NrLogradouro: 'null',
                NmBairro: 'null',
                NmCidade: 'null',
                NrCEP: 'null',
                NrTelefone: 'null',
                NrInscrEstadual: 'null',
                TpRegimeEspecialTributacao: 'null',
                AlCreditoICMSSN: 'null',
                CSOSNEmpresa: 'null',
                CSOSNEmpresaPDV: 'null',
                AlFCP: 'null',
                IdContaBancariaCaixa: 'null'
            }
        };
    };

    const getEmptyUser = () => {
        return {
            image: '',
            user_id: '',
            person_id: '',
            user_active: '',
            user_name: '',
            access: {},
            terminal: {},
            companies: []
        };
    };

    const getEmptyTerminal = () => {
        return {
            terminal_id: null,
            user_id: null,
            terminal_active: null,
            terminal_nfe: null,
            terminal_nfce: null,
            terminal_oe: null,
            terminal_name: null,
            terminal_token: null,
            terminal_nickname: null,
            terminal_date: null,
            operation: null
        }
    };
    
    const [instance_id] = useState(('00000'+window.btoa(parseInt(Math.random() * (9999999 - 1000000) + 1000000)).toUpperCase().substring(0,10)).slice(-10));

    const [config, setConfig] = useState(0);    
    const [loading, setLoading] = useState(0);
    const [budgets, setBudgets] = useState([]);
    const [loadingStyle, setLoadingStyle] = useState({});    
    const [time, setTime] = useState(moment().format('HH:mm'));    
    
    const [user, setUser] = useState(getEmptyUser());
    const [budget, setBudget] = useState(getEmptyBudget());
    const [company, setCompany] = useState(getEmptyCompany());        
    const [terminal, setTerminal] = useState(getEmptyTerminal());

    const [filters, setFilters] = useState({
        company_id: null,
        show_opened: "Y",
        show_billed: "N",
        show_others: "N",
        reference: moment().format('YYYY-MM-DD')
    });

    const [printOE, setPrintOE] = useState({
        budget: getEmptyBudget(),
        opened: false,
        reprint: false,
        budget_id: null
    });

    const [printNFCe, setPrintNFCe] = useState({
        budget: getEmptyBudget(),
        opened: false,
        reprint: false,
        budget_id: null
    });
    
    const [modalAuthorization, setModalAuthorization] = useState({
        title: '',
        action: '',
        message: '',
        opened: false,
        canceled: false,
        authorized: false,
        buttonDenyText: '',
        buttonConfirmText: '',
        data: null
    });

    const [modalBudget, setModalBudget] = useState({
        opened: false
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
        canceled: false,
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

    const [modalOpening, setModalOpening] = useState({
        opened: false,
        submit: false,
        terminal_operation_type: null,
        terminal_operation_value: 0
    });

    const [modalSuccess, setModalSuccess] = useState({
        opened: false,
        data: {
            DsModelo: '',
            IdDocumento: '',
            IdLoteEstoque: '',
            NrDocumento: '',
            budget_id: ''
        }
    });

    const [modalPayment, setModalPayment] = useState({
        opened: false
    });

    const afterGetTerminal = () => {
        if(!terminal.operation || terminal.operation.terminal_operation_type === 'E'){
            // CAIXA FECHADO
            // ABERTURA DE CAIXA
            openTerminal();
        } else if(terminal.operation.terminal_operation_type === 'A'){
            // CAIXA ABERTO
            if(terminal.operation.user_id !== user.user_id){
                // ABERTURA DE CAIXA COM USUÁRIO DIFERENTE
                // ABRIR TELA PARA AUTORIZAR A ABERTURA
                // ENCERRAR A ABERTURA ANTERIOR
                setModalConfirm({
                    id: 'closeTerminalAuthorization',
                    message: (`
                        Ops!<br/>    
                        O caixa encontra-se aberto com o usuário ${terminal.operation.user_name}.<br/>
                        Será necessário encerrar o caixa. O que deja fazer?
                    `),
                    opened: true,
                    confirmed: false,
                    buttonDenyText: 'Deslogar do Sistema',
                    buttonConfirmText: 'Encerrar o Caixa'
                });
            } else if(moment(terminal.operation.terminal_operation_date).format('YYYY-MM-DD') !== moment().format('YYYY-MM-DD')){
                // CAIXA NÃO FOI ENCERRADO DA ULTIMA VEZ
                // TELA DE ENCERRAMENTO DO CAIXA
                setModalConfirm({
                    id: 'closeTerminal',
                    message: (`
                        Ops!<br/>    
                        O caixa não foi encerrado anteriormente.<br/>
                        Será necessário encerrar o caixa. O que deja fazer?
                    `),
                    opened: true,
                    confirmed: false,
                    buttonDenyText: 'Deslogar do Sistema',
                    buttonConfirmText: 'Encerrar o Caixa'
                });
            }
        }
    };

    const afterModalAuthorized = () => {
        switch(modalAuthorization.action){
            case "documentCancel": 
                if(modalAuthorization.authorized){
                    cancelDocument(modalAuthorization.data);
                }
            break;
            case "documentPrint": 
                if(modalAuthorization.authorized){
                    if(modalAuthorization.data.modelo === '65'){
                        setPrintNFCe({
                            opened: true,
                            reprint: true,
                            budget: modalBudget.opened ? budget : printNFCe.budget,
                            budget_id: modalAuthorization.data.budget_id || printNFCe.budget_id
                        });
                    } else {
                        setPrintOE({
                            opened: true,
                            reprint: true,
                            budget: modalBudget.opened ? budget : printNFCe.budget,
                            budget_id: modalAuthorization.data.budget_id || printNFCe.budget_id
                        });
                    }
                }
            break;
            case "openDevTools":
                if(modalAuthorization.authorized){
                    window.electronMessage('openDevTools', 'appWindow');
                }
            break;
            case "closeTerminalAuthorization":
                if(modalAuthorization.authorized){
                    closeTerminal({
                        openAfter: true
                    });
                } else {
                    afterGetTerminal();
                }
            break;
            case "emptyTerminal":
                if(modalAuthorization.authorized){
                    empty();
                }
            break;
            default: break;
        }
    };

    const afterModalConfirm = () => {
        switch(modalConfirm.id){
            case 'budgetSubmit': 
                if(modalConfirm.confirmed){
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
                }
            break;
            case 'budgetCancel': 
                if(modalConfirm.confirmed){
                    removeInstance();
                    setModalBudget({
                        opened: false
                    });
                    initBudget();                    
                }
            break;
            case 'closeTerminal':
                if(modalConfirm.confirmed){
                    closeTerminal({
                        logoutAfter: true
                    });
                } else {
                    logout();
                }
            break;            
            case 'closeTerminalAuthorization':
                if(modalConfirm.confirmed){
                    setModalAuthorization({
                        action: 'closeTerminalAuthorization',
                        title: 'Autorização',
                        message: 'Para encerrar o caixa aberto por outro usuário será necessário a autorização.',
                        opened: true,
                        authorized: false,
                        buttonDenyText: 'Cancelar',
                        buttonConfirmText: 'Autorizar',
                        data: {}
                    });
                } else {
                    logout();
                }
            break;
            case 'close':
                if(modalConfirm.confirmed){
                    closeTerminal({
                        logoutAfter: true
                    });
                }
            break;
            case 'documentCancel': 
                if(modalConfirm.confirmed){    
                    setModalAuthorization({
                        action: 'documentCancel',
                        title: 'Autorização',
                        message: 'Para cancelar o documento será necessário a autorização.',
                        opened: true,
                        authorized: false,
                        buttonDenyText: 'Cancelar',
                        buttonConfirmText: 'Autorizar',
                        data: modalConfirm.data
                    });
                }
            break;
            case 'documentPrint': 
                if(modalConfirm.confirmed){    
                    setModalAuthorization({
                        action: 'documentPrint',
                        title: 'Autorização',
                        message: 'Reimpressão do documento.',
                        opened: true,
                        authorized: false,
                        buttonDenyText: 'Cancelar',
                        buttonConfirmText: 'Autorizar',
                        data: modalConfirm.data
                    });
                }
            break;
            case 'documentRecover': 
                if(modalConfirm.confirmed){    
                    recoverBudget(modalConfirm.data);
                }
            break;
            case 'emptyTerminal':
                if(modalConfirm.confirmed){
                    setModalAuthorization({
                        action: 'emptyTerminal',
                        title: 'Autorização',
                        message: 'Para limpar os dados do terminal será necessário a autorização.',
                        opened: true,
                        authorized: false,
                        buttonDenyText: 'Cancelar',
                        buttonConfirmText: 'Autorizar',
                        data: {}
                    });
                }
            break;
            default: break;
        }
    };

    const afterModalMessage = () => {
        switch(modalMessage.afterClose){
            case 'terminalOperation':
                afterGetTerminal();
            break;
            default:
            break;
        }
    };

    const apiErrorMessage = (data) => {
        setModalMessage({
            class: 'danger',
            title: !!data && !!data.title ? data.title : 'Atenção!',
            message: !!data && !!data.message ? data.message :'Resposta inesperada do servidor.',
            opened: true
        });
    };

    const cancelDocument = (data) => {
        initBudget();
        setLoading(loading => loading+1);
        Api.post({script: 'document', action: 'cancel', data: data}).then((res) => {
            if(res.status === 200){
                getBudgets();
                setModalMessage({
                    class: 'success',
                    title: res.data.NrDocumento,
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
    };

    const closeTerminal = (params) => {
        terminalOperation({
            terminal_id: terminal.terminal_id,
            terminal_operation_type: 'E',
            terminal_operation_value: 0,
            openAfter: params.openAfter || false,
            logoutAfter: params.logoutAfter || false
        });
    };

    const empty = () => {
        window.electronMessage('Unauthorized', 'appWindow');
    };
    
    const getData = () => {
        setLoading(loading => loading+1);
        Api.post({script: 'data', action: 'get'}).then((res) => {
            if(res.status === 200){
                setUser(res.data.login);
                setConfig(res.data.config);
                setTerminal(res.data.terminal);
                setCompany(res.data.login.companies.filter((company) => {
                    return company.user_company_main === 'Y'
                })[0]);                
            } else {
                apiErrorMessage();
            }
            setLoading(loading => loading-1);
        });
    };

    const getBudget = (budget_id) => {
        setLoading(loading => loading+1);
        Api.post({script: 'budget', action: 'get', data: {
            budget_id: budget_id,
            instance_id: instance_id
        }}).then((res) => {
            if(res.status === 200){
                if(printOE.opened){
                    setPrintOE({
                        budget: res.data,
                        opened: true,
                        reprint: printOE.reprint
                    });
                } else if(printNFCe.opened){
                    setPrintNFCe({
                        budget: res.data,
                        opened: true,
                        reprint: printNFCe.reprint
                    });
                } else {
                    setBudget(res.data);
                    if(!!res.data.instance && res.data.instance.instance_id !== instance_id){
                        setModalMessage({
                            class: 'danger',
                            message: (`
                                Ops!<br/>
                                O orçamento encontra-se aberto em outro terminal e por esse motivo, nao será possível editá-lo<br/><br/>
                                <b>Usuário:</b> ${res.data.instance.user_name}<br/>
                                <b>Terminal:</b> ${res.data.instance.host_name}<br/>
                                <b>IP:</b> ${res.data.instance.host_ip}<br/>
                                <b>Data:</b> ${res.data.instance.budget_instance_date}
                            `),
                            opened: true
                        });
                    }                                   
                }                
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
    };   

    const initBudget = () => {
        setBudget(getEmptyBudget());
        setPrintNFCe({
            opened: false,
            budget: getEmptyBudget()
        });
    };

    const logout = () => {
        window.electronMessage('afterLogout');
    };

    const openTerminal = () => {
        setModalOpening({
            opened: true,
            submit: false,
            terminal_operation_type: null,
            terminal_operation_value: 0
        });
    };

    const terminalOperation = (data) => {
        setLoading(loading => loading+1);
        Api.post({script: 'terminal', action: 'operation', data: data}).then((res) => {
            if(res.status === 200){
                setModalOpening({
                    opened: false,
                    submit: false,
                    terminal_operation_type: null,
                    terminal_operation_value: 0
                });
                if(data.openAfter){
                    openTerminal();
                }
                if(data.logoutAfter){
                    logout();
                }
            } else {
                setModalMessage({
                    class: 'warning',
                    title: 'Atenção!',
                    message: 'Resposta inesperada do servidor.',
                    opened: true,
                    afterClose: 'terminalOperation'
                });
            }
            setLoading(loading => loading-1);
        });
    };
    
    const printing = () => {
        try{
            window.require('electron').ipcRenderer.on('printing', (e, data) => {
                setPrintNFCe({
                    opened: false,
                    getBudgets: true,
                    budget: getEmptyBudget()
                });
            });
        } catch(e){

        }
        window.onafterprint = (event) => {
            setPrintOE({
                opened: false,
                getBudgets: true,
                budget: getEmptyBudget()
            });
        };
    };

    const recoverBudget = (data) => {
        setLoading(loading => loading+1);
        setModalPayment({opened: false});
        Api.post({script: 'budget', action: 'recover', data: data}).then((res) => {
            if(res.status === 200){
                getBudgets();
                setModalMessage({
                    class: 'success',
                    message: 'Documento recuperado com sucesso!',
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
    };

    const removeInstance = () => {
        Api.post({script: 'budget', action: 'removeInstance', data: {
            budget_id: budget.budget_id,
            instance_id: instance_id
        }}).then((res) => {
            
        });
    };

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
                if(budget.external_type === 'D'){
                    setPrintNFCe({
                        opened: true,
                        reprint: false,
                        budget: printNFCe.budget,
                        budget_id: budget.budget_id
                    });
                } else {
                    setPrintOE({
                        opened: true,
                        reprint: false,
                        budget: printOE.budget,
                        budget_id: budget.budget_id
                    });
                }
                setModalConfirm({
                    id: 'budgetCancel',
                    confirmed: true
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
    };

    useEffect(() => {
        if(!!budget.budget_id){
            setModalBudget({
                opened: true
            });
        }
    }, [budget]);

    useEffect(() => {
        showLoading();
    }, [loading]);

    useEffect(() => {
        if(!!company.company_id){
            setFilters({
                reference: filters.reference,
                company_id: company.company_id,
                show_opened: filters.show_opened,
                show_billed: filters.show_billed,
                show_others: filters.show_others
            });
        }
    }, [company]);

    useEffect(() => {
        if(!!terminal.terminal_id){
            afterGetTerminal();
        }
    }, [terminal]);

    useEffect(() => {
        if(!!filters.company_id){
            initBudget();
            getBudgets();
        }
    }, [filters]);

    useEffect(() => {
        if(printOE.opened && !!printOE.budget_id){
            getBudget(printOE.budget_id);
        }
        if(!!printOE.getBudgets){
            getBudgets();
        }
    }, [printOE]);

    useEffect(() => {
        if(printNFCe.opened && !!printNFCe.budget_id){
            getBudget(printNFCe.budget_id);
        }
        if(!!printNFCe.getBudgets){
            getBudgets();
        }
    }, [printNFCe]);

    useEffect(() => {
        if(!modalChange.opened && modalChange.paidValue > 0){
            submitBudget();
        }
    }, [modalChange]);

    useEffect(() => {
        if(modalConfirm.confirmed || modalConfirm.canceled){
            afterModalConfirm();
        }
    }, [modalConfirm]);

    useEffect(() => {
        if(!!modalMessage.afterClose){
            afterModalMessage();
        }
    }, [modalMessage]);

    useEffect(() => {
        if(
            modalOpening.opened && 
            modalOpening.submit && 
            !!modalOpening.terminal_operation_type &&
            modalOpening.terminal_operation_value > 0
        ){
            terminalOperation({
                terminal_id: terminal.terminal_id,
                terminal_operation_type: modalOpening.terminal_operation_type,
                terminal_operation_value: modalOpening.terminal_operation_value
            });
        }
    }, [modalOpening]);

    useEffect(() => {
        if(modalAuthorization.authorized || modalAuthorization.canceled){
            afterModalAuthorized();
        }
    }, [modalAuthorization]);

    return (
        <Context.Provider value={{
            time,
            user,
            config,
            instance_id,
            budget, getBudget,
            budgets, setLoading,
            company, setCompany, 
            filters, setFilters,
            printOE, setPrintOE,            
            printNFCe, setPrintNFCe,
            modalChange, setModalChange,
            modalBudget, setModalBudget,
            modalConfirm, setModalConfirm,
            modalMessage, setModalMessage,
            modalOpening, setModalOpening,
            modalPayment, setModalPayment,
            modalSuccess, setModalSuccess,
            modalAuthorization, setModalAuthorization
        }}>
            <Header/>
            <div className="body">
                <Tabs initBudget={initBudget}/>
            </div>
            <Bar/>
            <Footer/>
            <PrintOE getEmptyBudget={getEmptyBudget}/>
            <PrintNFCe getEmptyBudget={getEmptyBudget}/>
            <ModalBudget/>
            <ModalChange/>
            <ModalConfirm/>
            <ModalMessage/>
            <ModalOpening/>
            <ModalPayment/>
            <ModalSuccess/>
            <ModalAuthorization/>
            <Loading loadingStyle={loadingStyle}/>
        </Context.Provider>
    );
};

export default App;