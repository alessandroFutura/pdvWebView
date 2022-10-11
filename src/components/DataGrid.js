import React from 'react';

import {Table} from 'rsuite';

import "./DataGrid.css";

const {Column, HeaderCell, Cell} = Table;

const DataGrid = ({dataColumns, dataRows, setDataRow}) => {

	const [sortType, setSortType] = React.useState();
	const [sortColumn, setSortColumn] = React.useState();

	const getData = () => {
		if(sortColumn && sortType){
			return dataRows.sort((a, b) => {
				let x = a[sortColumn];
				let y = b[sortColumn];
				if(typeof x === 'string'){
					x = x.charCodeAt();
				}
				if(typeof y === 'string'){
					y = y.charCodeAt();
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

	return (
		<Table
			height={558}
			data={getData()}
			sortColumn={sortColumn}
			sortType={sortType}
			onSortColumn={handleSortColumn}
			onRowClick={rowData => {
				handleRowClick(rowData);
			}}
		>
			{(dataColumns || []).map((column, key) => (
				<Column key={key} flexGrow={1} align="center" fixed sortable>
					<HeaderCell>{column.HeaderCell}</HeaderCell>
					<Cell dataKey={column.dataKey} />
				</Column>
			))}		  
		</Table>
	  );

}

export default DataGrid;