import React, { useState } from 'react';
import { ITableProps, kaReducer, Table } from 'ka-table';
import { DataType, EditingMode, SortingMode } from 'ka-table/enums';
import { DispatchFunc } from 'ka-table/types';

import "ka-table/style.css";

const DataGrid = ({columns, dataArray}) => {

  const tablePropsInit: ITableProps = {
    columns: columns,
    data: dataArray,
    editingMode: false,
    rowKeyField: 'id',
    sortingMode: SortingMode.Single,
  };
  
  const [tableProps, changeTableProps] = useState(tablePropsInit);

  const dispatch: DispatchFunc = (action) => {
    changeTableProps((prevState: ITableProps) => kaReducer(prevState, action));
  };

  return (
    <Table
      {...tableProps}
      dispatch={dispatch}
    />
  );
};

export default DataGrid;