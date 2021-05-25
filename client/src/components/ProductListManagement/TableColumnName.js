import React from 'react';
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableSortLabel from "@material-ui/core/TableSortLabel";

const headCells = [
    { id: "name", numeric: false, disablePadding: true, label: "Productos" },
    { id: "descripcion", numeric: false, disablePadding: false, label: "descripcion"},
    { id: "price", numeric: true, disablePadding: false, label: "precio" },
    { id: "Stock", numeric: true, disablePadding: false, label: "Stock" },
  ];
function TableColumnName({classes, order, orderBy, onRequestSort}) {

    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
  
    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align="right"
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === "desc" ? " descending " : " ascending "}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
          <TableCell align="center" className={classes.column}>
            Accion
          </TableCell>
        </TableRow>
      </TableHead>
    ); 
  }

  export default TableColumnName