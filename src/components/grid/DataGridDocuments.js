import React, {useContext} from 'react';

import {Table} from 'rsuite';
import Context from '../../contexts/Context.js';

import moment from 'moment';
import 'moment/locale/pt-br';

import { BsFillStopFill } from 'react-icons/bs';
import { BiMessageRoundedError } from 'react-icons/bi';
import { FaPrint, FaRegTimesCircle, FaRegTrashAlt } from 'react-icons/fa';

import "./DataGridDocuments.css";

const {Column, HeaderCell, Cell} = Table;

const DataGridDocuments = ({columnBudgetTitle, dataRows, setDataRow}) => {

	const [sortType, setSortType] = React.useState();
	const [sortColumn, setSortColumn] = React.useState();

	const dataColumns = [
        {dataKey:'NrDocumento', HeaderCell:'DOC'},
        {dataKey:'NmUsuario', HeaderCell:'USUÁRIO'},
        {dataKey:'NmCliente', HeaderCell:'CLIENTE'},
        {dataKey:'external_code', HeaderCell:columnBudgetTitle},
        {dataKey:'NmVendedor', HeaderCell:'VENDEDOR'},
        {dataKey:'VlDocumento', HeaderCell:'VALOR'}
    ];

	const {
		budget,
		config,
		setModalConfirm, setModalMessage
	} = useContext(Context);

	const getData = () => {
		if(sortColumn && sortType){
			return dataRows.sort((a, b) => {
				let x = a[sortColumn];
				let y = b[sortColumn];
				if(sortColumn === 'VlDocumento'){
					x = parseFloat(x.replace(',','.'));
					y = parseFloat(y.replace(',','.'));
				}
				if(['NmCliente','NmVendedor'].indexOf(sortColumn) >= 0){
					if(typeof x === 'string'){
						x = x.charCodeAt();
					}
					if(typeof y === 'string'){
						y = y.charCodeAt();
					}
				}				
				if(sortType === 'asc'){
					return x - y;
				} else {
					return y - x;
				}
			});
		}
		return dataRows;
	};

	const handleSortColumn = (sortColumn, sortType) => {
		setSortColumn(sortColumn);
		setSortType(sortType);
	};

	const handleRowClick = (data) => {
		setDataRow(data);
	};

	const handleButtonPrintClick = (data) => {
		setModalConfirm({
            id: 'documentPrint',
            message: (`
				Para reimprimir o documento será necessário autorização especial.
				O que deseja fazer?
			`),
            opened: true,
            confirmed: false,
            buttonDenyText: 'Cancelar',
            buttonConfirmText: 'Solicitar Permissão',
			data: data
        });		
	};

	const handleButtonDeleteClick = (data) => {
		setModalConfirm({
            id: 'documentRecover',
            message: 'Deseja realmente recuperar o documento?',
            opened: true,
            confirmed: false,
            buttonDenyText: 'Não',
            buttonConfirmText: 'Sim',
			data: data
        });
	};

	const getTimeoutText = (minutes) => {
		if(minutes > 60){
			//converter em horas
			return `${parseInt(minutes/60)} horas`;
		} else {
			// minutos
			return `${minutes} minutos`;
		}
	};

	const handleButtonCancelClick = (data) => {
		console.log(data);
		let cancellationTimeout = 0;
		if(data.modelo === 'OE'){
			cancellationTimeout = parseInt(config.pdv.cancellationTimeoutOE);
		} else {
			cancellationTimeout = parseInt(config.pdv.cancellationTimeoutNFCe);
		}
		let timeOut = moment().diff(moment(data.dhRecbto || data.terminal_document_date), 'minutes');
		if(timeOut > cancellationTimeout){
			setModalMessage({
				class: 'warning',
				message: (`
					Ops!<br/>
					Não será possível cancelar o documento.<br/>
					Tempo limite de <b>${getTimeoutText(cancellationTimeout)}</b> excedido!<br/>
				`),
				opened: true
			});
		} else {
			setModalConfirm({
				id: 'documentCancel',
				message: (data.budget_credit === 'Y' ? (
					'Atenção!<br/>' + 
					'Este documento possui carta de crédito como pagamento.<br/>' +
					'A carta de crédito será recuparada para que possa ser reutilizada em um novo orçamento.<br/><br/>'
				) : '') + 'Deseja realmente cancelar o documento?',
				opened: true,
				confirmed: false,
				buttonDenyText: 'Não',
				buttonConfirmText: 'Sim',
				data: data
			});
		}
	};

	const handleButtonInfoClick = (data) => {
		setModalMessage({
			class: data.StCancelado === 'S' ? 'info' : 'danger',
			title: data.StCancelado === 'S' ? 'Documento cancelado' : `Rejeição ${data.cStat}`,
			message: data.StCancelado === 'S' ? (`
				Data: ${moment(data.DtCancelamento).format('DD/MM/YYYY HH:mm:ss')}<br/>
				Autorização: ${data.NmUsuarioCancelamento}
			`) : data.xMotivo,
			opened: true
		});
	};

	const getRowClass = (data) => {
		let classes = [];
		if(!!data){
			if(data.NrDocumento === '--'){
				classes.push('row-opened');
			}
			if(data.budget_id === budget.budget_id){
				classes.push('row-selected');
			}
			if(!!data.CdStatus){
				if(data.CdStatus < 9){
					classes.push('row-billing');
				}
				if(data.StCancelado === 'S'){
					classes.push('row-canceled');
				} else {
					if(data.CdStatus === 9){
						classes.push('row-billed');
					} else if(data.CdStatus >= 900){
						classes.push('row-canceling');
					}
				}						
			}					
			if(!!data.cStat && data.cStat !== 100){
				classes.push('row-rejected');
			}
		}
		return classes.join(' ');
	}

	return (
		<Table
			fillHeight={true}
			data={getData()}
			sortColumn={sortColumn}
			sortType={sortType}			
			onSortColumn={handleSortColumn}
			rowClassName={(data) => getRowClass(data)}
			onRowClick={(rowData) => handleRowClick(rowData)}
		>
			<Column width={80} align="center" fixed="left">
				<HeaderCell></HeaderCell>
				<Cell><BsFillStopFill/></Cell>
			</Column>
			{(dataColumns || []).map((column, key) => (
				<Column key={key} flexGrow={1} align="center" fixed sortable>
					<HeaderCell>{column.HeaderCell}</HeaderCell>
					<Cell dataKey={column.dataKey} />
				</Column>
			))}
			<Column width={80} align="center" fixed="right">
				<HeaderCell></HeaderCell>
				<Cell>
					{rowData => (
						<div className="buttons">
							<button onClick={(e) => {
								e.preventDefault(); 
								e.stopPropagation();
								handleButtonPrintClick(rowData);
							}}><FaPrint/></button>
							<button onClick={(e) => {
								e.preventDefault(); 
								e.stopPropagation();
								handleButtonDeleteClick(rowData);
							}}><FaRegTrashAlt/></button>
							<button onClick={(e) => {
								e.preventDefault(); 
								e.stopPropagation();
								handleButtonCancelClick(rowData);
							}}><FaRegTimesCircle/></button>							
							<button onClick={(e) => {
								e.preventDefault(); 
								e.stopPropagation();
								handleButtonInfoClick(rowData);
							}}><BiMessageRoundedError/></button>	
						</div>
					)}
				</Cell>
			</Column>
		</Table>
	);
}

export default DataGridDocuments;