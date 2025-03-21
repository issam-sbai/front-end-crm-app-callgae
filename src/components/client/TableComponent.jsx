import React from "react";
import { Table } from "react-bootstrap";

const TableComponent = ({ columns, data, onRowClick }) => {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr >
          {columns.map((col, index) => (
            <th style={{ backgroundColor: '#337ab7',color: "white" }} key={index}>{col.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex} onClick={() => onRowClick(row)} style={{ cursor: "pointer" }}>
            {columns.map((col, colIndex) => (
              <td key={colIndex} style={{ height: '5px', verticalAlign: 'middle' }} >
                {col.render ? col.render(row) : row[col.field]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TableComponent;
