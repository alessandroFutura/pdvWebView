import React, {useState} from 'react';

import {Table} from 'rsuite';

import "./DataGridPayments.css";

const {Column, HeaderCell, Cell} = Table;

const DataGridPayments = ({payments}) => {

    const [sortType, setSortType] = useState();
	const [sortColumn, setSortColumn] = useState();

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
		</Table>
	);

}

export default DataGridPayments;