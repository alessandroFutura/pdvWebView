import React, {useState, useContext} from 'react';

import {Table} from 'rsuite';
import Context from '../../contexts/Context.js';

import { FaEdit } from 'react-icons/fa';

import "./DataGridPayments.css";

const {Column, HeaderCell, Cell} = Table;

const DataGridPayments = ({payments, editable}) => {

    const [sortType, setSortType] = useState();
	const [sortColumn, setSortColumn] = useState();

	const {setModalMessage, getModalityGroup} = useContext(Context);

	const dataColumns = [
        {dataKey:'NrParcelas', HeaderCell:''},
        {dataKey:'DsFormaPagamento', HeaderCell:'MODALIDADE'},
        {dataKey:'DtVencimento', HeaderCell:'VENCIMENTO'},
        {dataKey:'NrDias', HeaderCell:'DIAS'},
        {dataKey:'VlParcela', HeaderCell:'VALOR'}
    ];

    const getData = () => {
		if(sortColumn && sortType){
			return payments.sort((a, b) => {
				let x = a[sortColumn];
				let y = b[sortColumn];
				if(sortColumn === 'VlParcela'){
					x = parseFloat(x.replace(',','.'));
					y = parseFloat(y.replace(',','.'));					
                } else {
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
		return payments;
	};

    const handleSortColumn = (sortColumn, sortType) => {
		setSortColumn(sortColumn);
		setSortType(sortType);
	};

	const handleButtonEditClick = (rowData) => {
		if(!!rowData.modality_group_id){
			getModalityGroup(rowData);
		} else {
			setModalMessage({
				class: 'warning',
				message: (`
					Ops!<br/>
					Não será possível editar a parcela.<br/>
					A forma de pagamento <b>${rowData.DsFormaPagamento}</b> não está incluida em nenhum grupo de modalidade.
				`),
				opened: true
			});	
		}
	};

    return (
		<Table
			height={164}
			data={getData()}
			sortColumn={sortColumn}
			sortType={sortType}			
			onSortColumn={handleSortColumn}			
		>
			{(dataColumns || []).map((column, key) => (
				<Column key={key} sortable={key > 0} flexGrow={1} align="center" fixed>
					<HeaderCell>{column.HeaderCell}</HeaderCell>
					<Cell dataKey={column.dataKey} />
				</Column>
			))}
			<Column width={60} align="center" fixed="right">
				<HeaderCell></HeaderCell>
				<Cell>
					{rowData => (
						<button disabled={editable} onClick={(e) => {
							e.preventDefault(); 
							e.stopPropagation();
							handleButtonEditClick(rowData);
						}}><FaEdit/></button>
					)}
				</Cell>
			</Column>
		</Table>
	);

}

export default DataGridPayments;