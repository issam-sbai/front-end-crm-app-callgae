// import React, { useMemo } from "react";
// import { AgGridReact } from "ag-grid-react";
// import { ModuleRegistry } from "ag-grid-community";
// import { ClientSideRowModelModule } from "ag-grid-community";

// // Register the required module
// ModuleRegistry.registerModules([ClientSideRowModelModule]);

// import "ag-grid-community/styles/ag-grid.css";
// import "ag-grid-community/styles/ag-theme-alpine.css";

// const TableComponent2 = ({ columns, data, onRowClick }) => {
//   const columnDefs = useMemo(() => {
//     return columns.map(col => ({
//       headerName: col.header,
//       field: col.field,
//       cellRenderer: col.render ? (params) => col.render(params.data) : undefined,
//       sortable: true,
//       filter: true,
//       resizable: true,
//     }));
//   }, [columns]);

//   return (
//     <div className="ag-theme-alpine" style={{ width: "100%", height: "500px" }}>
//       <AgGridReact
//         rowData={data}
//         columnDefs={columnDefs}
//         defaultColDef={{ flex: 1, minWidth: 100 }}
//         rowSelection="single"
//         onRowClicked={(event) => onRowClick(event.data)}
//         rowHeight={50} 
//       />
//     </div>
//   );
// };

// export default TableComponent2;
