import React, {useContext, useEffect, useState} from 'react'
import styled from 'styled-components'
import { useTable, usePagination } from 'react-table'
import {ReservatiesContext} from "../../context/ReservatiesContext";

const Styles = styled.div`
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
        state: { pageIndex, pageSize = 5 },
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0 }, // Pass our hoisted table state
            manualPagination: true, // Tell the usePagination
            // hook that we'll handle our own data fetching
            // This means we'll also have to provide our own
            // pageCount.
            pageCount: controlledPageCount,
        },
        usePagination
    )
    const {reservaties, pageReservatieInfo, setPageReservatieInfo,getPaginatedReservaties, loading123 } = useContext(ReservatiesContext)

    // Listen for changes in pagination and use the state to fetch our new data
    React.useEffect(() => {
        console.log("test123")
        getPaginatedReservaties(email,0, 5, "", token).then(() => {
            console.log("okay")})

    }, [])

    // Render the UI for your table
    return (
        <>
      <pre>
        <code>
          {JSON.stringify(
              {
                  pageIndex,
                  pageSize,
                  pageCount,
                  canNextPage,
                  canPreviousPage,
              },
              null,
              2
          )}
        </code>
      </pre>
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
                </button>{' '}
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    {'<'}
                </button>{' '}
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    {'>'}
                </button>{' '}
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {'>>'}
                </button>{' '}
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
                        style={{ width: '100px' }}
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

const ReserveringTable = (props) => {
    const [propsLoading, setPropsLoading] = useState(true);

    useEffect(() => {
        return () => {
            console.log(props, "props123")
            setPropsLoading(false)
        };
    }, [props]);



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
                Header: "Kamernaam",
                accessor: "naam"
            },
        ],
        []
    );



    return (
        <Styles>
            { <Table
                columns={columns}
                data={props.reservaties}

                loading={props.loading123}
                pageCount={props.pageCount}
                email={props.email} token={props.token} />}
        </Styles>
    )
}

export default ReserveringTable