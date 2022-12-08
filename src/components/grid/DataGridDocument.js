import React, {useContext} from 'react';

import {Table} from 'rsuite';
import Context from '../../contexts/Context.js';

import moment from 'moment';
import 'moment/locale/pt-br';

import { BiMessageRoundedError } from 'react-icons/bi';
import { FaPrint, FaRegTimesCircle, FaRegTrashAlt } from 'react-icons/fa';

import "./DataGridDocument.css";

const {Column, HeaderCell, Cell} = Table;

const DataGridDocument = ({columnBudgetTitle, dataRows, setDataRow}) => {

	const [sortType, setSortType] = React.useState();
	const [sortColumn, setSortColumn] = React.useState();

	const dataColumns = [
        {width:80, dataKey:'nNF', HeaderCell:'DOC'},
        {width:250, dataKey:'NmCliente', HeaderCell:'CLIENTE'},
        {width:100, dataKey:'external_code', HeaderCell:columnBudgetTitle},
        {width:120, dataKey:'NmVendedor', HeaderCell:'VENDEDOR'},
        {width:80, dataKey:'VlDocumento', HeaderCell:'VALOR'}
    ];

	const {
		budget_id, 
		printOE, printNFCe, 
		setPrintOE, setPrintNFCe, 
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
		if(data.external_type === 'D'){
			setPrintNFCe({
				opened: true,
				budget: printNFCe.budget,
				budget_id: data.budget_id
			});
		} else {
			setPrintOE({
				opened: true,
				budget: printOE.budget,
				budget_id: data.budget_id
			});
		}
	};

	const handleButtonDeleteClick = (data) => {
		console.log(data);
	};

	const handleButtonCancelClick = (data) => {
		setModalConfirm({
            id: 'document-cancel',
            message: 'Deseja realmente cancelar o documento?',
            opened: true,
            confirmed: false,
            buttonDenyText: 'Não',
            buttonConfirmText: 'Sim',
			data: data
        });
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
			if(data.budget_id === budget_id){
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
			height={document.documentElement.clientHeight-370}
			data={getData()}
			sortColumn={sortColumn}
			sortType={sortType}
			onSortColumn={handleSortColumn}
			rowClassName={(data) => getRowClass(data)}
			onRowClick={(rowData) => handleRowClick(rowData)}
		>
			{(dataColumns || []).map((column, key) => (
				<Column width={column.width} key={key} align="center" fixed sortable>
					<HeaderCell>{column.HeaderCell}</HeaderCell>
					<Cell dataKey={column.dataKey} />
				</Column>
			))}
			<Column width={80} fixed="right">
				<HeaderCell>...</HeaderCell>
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

export default DataGridDocument;