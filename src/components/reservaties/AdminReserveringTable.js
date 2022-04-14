import React, {useContext, useEffect, useState} from 'react'
import styled from 'styled-components'
import {useTable, usePagination} from 'react-table'

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;
    width: 90vw;
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

  .pagination {
    padding: 0.5rem;
  }
`

function Table({
                   columns,
                   data,
                   fetchData,
                   loading,
                   pageCount: controlledPageCount,
                   email, token
               }) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        // Get the state from the instance
        state: {pageIndex, pageSize = 5},
    } = useTable(
        {
            columns,
            data,
            initialState: {pageIndex: 0}, // Pass our hoisted table state
            manualPagination: true, // Tell the usePagination
            // hook that we'll handle our own data fetching
            // This means we'll also have to provide our own
            // pageCount.
            pageCount: controlledPageCount,
        },
        usePagination
    )

    // Listen for changes in pagination and use the state to fetch our new data
    React.useEffect(() => {
        fetchData(pageIndex, 5, "", token)
    //onSort, sortBy, fetchData, pageIndex, pageSize
    }, [  pageIndex, pageSize])

    // React.useEffect(() => {
    //     console.log("test123")
    //     getPaginatedReservaties(pageIndex, pageSize, "", email, token)
    //     // fetchData(pageIndex, pageSize, "", email, token)
    // }, [fetchData, pageIndex, pageSize])

    // Render the UI for your table
    return (
        <>
            <table {...getTableProps()}>
                <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>
                                {column.render('Header')}
                                <span>
                    {column.isSorted
                        ? column.isSortedDesc
                            ? ' 🔽'
                            : ' 🔼'
                        : ''}
                  </span>
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {page.map((row, i) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                        </tr>
                    )
                })}
                <tr>
                    {loading ? (
                        // Use our custom loading state to show a loading indicator
                        <td colSpan="10000">Loading...</td>
                    ) : (
                        <td colSpan="10000">
                            Showing {page.length} of ~{controlledPageCount * pageSize}{' '}
                            results
                        </td>
                    )}
                </tr>
                </tbody>
            </table>
            {/*
        Pagination can be built however you'd like.
        This is just a very basic UI implementation:
      */}
            <div className="pagination">
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {'<<'}
                </button>
                {' '}
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    {'<'}
                </button>
                {' '}
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    {'>'}
                </button>
                {' '}
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {'>>'}
                </button>
                {' '}
                <span>
          Page{' '}
                    <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
                <span>
          | Go to page:{' '}
                    <input
                        type="number"
                        defaultValue={pageIndex + 1}
                        onChange={e => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0
                            gotoPage(page)
                        }}
                        style={{width: '100px'}}
                    />
        </span>{' '}
                <select
                    value={pageSize}
                    onChange={e => {
                        setPageSize(Number(e.target.value))
                    }}
                >
                    {[10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
        </>
    )
}

const ReserveringAdminTable = (props) => {
    useEffect(() => {
        console.log(props)
    }, []);

    const columns = React.useMemo(
        () => [{
            Header: "Kamernaam",
            accessor: "naam"
        },
            {
              Header: "email",
              accessor: "email"
            },
            {
                Header: "Start tijd",
                accessor: "start"
            },
            {
                Header: "Eind tijd",
                accessor: "end"
            },
            {
                Header: '',
                accessor: (originalRow, rowIndex) => (
                    <div>
                        <button onClick={() => console.log(rowIndex)}>Edit</button>
                        <button onClick={() => props.deleteReservatie(originalRow.id, props.token)}>Delete</button>
                    </div>
                ),
                id: 'action',
            },
        ],
        []
    );

    return (
        <Styles>
            <Table
                columns={columns}
                data={props.reservaties}
                loading={props.loading123}
                pageCount={props.pageCount}
                fetchData={props.getPaginatedReservaties}
                email={props.email} token={props.token}

            />
        </Styles>
    )
}

export default ReserveringAdminTable