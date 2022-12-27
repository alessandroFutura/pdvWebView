import React, {useState} from 'react';

import {Table} from 'rsuite';

import "./DataGridItems.css";

const {Column, HeaderCell, Cell} = Table;

const DataGridItems = ({items}) => {

    const [sortType, setSortType] = useState();
	const [sortColumn, setSortColumn] = useState();

	const dataColumns = [
        {dataKey:'key', HeaderCell:''},
        {dataKey:'CdChamada', HeaderCell:'CÓDIGO'},
        {dataKey:'NmProduto', HeaderCell:'PRODUTO'},
        {dataKey:'Qtd', HeaderCell:'QTD'},
        {dataKey:'VlUnitatio', HeaderCell:'VL UNIT'},
        {dataKey:'AlDesconto', HeaderCell:'AL DESC'},
        {dataKey:'VlDesconto', HeaderCell:'VL DESC'},
        {dataKey:'VlTotal', HeaderCell:'VL TOTAL'}
    ];

    const getData = () => {
		if(sortColumn && sortType){
			return items.sort((a, b) => {
				let x = a[sortColumn];
				let y = b[sortColumn];
				if(['CdChamada','NmProduto'].indexOf(sortColumn) >= 0){
					if(typeof x === 'string'){
						x = x.charCodeAt();
					}
					if(typeof y === 'string'){
						y = y.charCodeAt();
					}
                } else {
                    x = parseFloat(x.replace(',','.'));
					y = parseFloat(y.replace(',','.'));
                }			
				if(sortType === 'asc'){
					return x - y;
				} else {
					return y - x;
				}
			});
		}
		return items;
	};

    const handleSortColumn = (sortColumn, sortType) => {
		setSortColumn(sortColumn);
		setSortType(sortType);
	};

    return (
		<Table
			height={220}
			data={getData()}
			sortColumn={sortColumn}
			sortType={sortType}			
			onSortColumn={handleSortColumn}			
		>
			{(dataColumns || []).map((column, key) => (
				<Column width={key === 0 ? 42 : (key === 2 ? 324 : 96)} key={key} align={key === 2 ? 'left' : 'center'} fixed sortable={key>0}>
					<HeaderCell>{column.HeaderCell}</HeaderCell>
					<Cell dataKey={column.dataKey} />
				</Column>
			))}
		</Table>
	);

}

export default DataGridItems;