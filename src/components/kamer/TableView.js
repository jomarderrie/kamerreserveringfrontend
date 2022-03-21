import React, {Component, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";
import { useTable } from 'react-table'

const TableStyles = styled.div`
padding: 1rem;

table {
  border-spacing: 0;
  border: 1px solid black;

  tr {
    :last-child {
      td {
        border-bottom: 0;
      }
    }
  }

  th,
  td {
    margin: 0;
    padding: 0.5rem;
    border-bottom: 1px solid black;
    border-right: 1px solid black;

    :last-child {
      border-right: 0;
    }
  }
}
`


const TableView = (props) => {
    const [propsLoading, setPropsLoading] = useState(true);
    useEffect(() => {
        return () => {
            console.log(props,"macdonalds")
            setPropsLoading(false)
        };
    }, [props]);

    const Table = ({ columns, data }) =>{
        // Use the state and functions returned from useTable to build your UI
        const { getTableProps, getTableBodyProps, rows, prepareRow, headerGroups, } = useTable({
          columns,
          data
        });
      
        // Render the UI for your table
        return (
          <table {...getTableProps()}>
               <thead>
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row, i) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        );
      }

      

  const columns = React.useMemo(
    () => [
      {
        Header: "Start tijd",
        accessor: "start"
      },
      {
        Header: "Eind tijd",
        accessor: "end"
      },
      {
        Header: "Naam",
        accessor: "naam"
      },
      {
        Header: "Achternaam",
        accessor: "achterNaam"
      }
    ],
    []
  );




        return (
            <div>
                <TableStyles>
                 <Table columns={columns} data={props.reservaties} />
                </TableStyles>
                {/* {propsLoading ? <div>Table window is loading...</div> : 
                <TableStyles>
                 <Table columns={columns} data={props.reservaties} />
                </TableStyles>
                } */}
            </div>
        );
    }
                export default TableView;