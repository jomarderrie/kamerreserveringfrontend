import React, {useContext, useEffect, useState} from 'react'
import styled from 'styled-components'
import {useTable, usePagination} from 'react-table'
import DatePicker from "react-datepicker";
import {getAllKamerByNaamAndGetAllReserverationsOnCertainDay} from "../../functions/kamers";

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
                   email, token, EditAndDeleteButton, startDate, endDate, setStartDate, setEndDate
               }) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        row,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        editableRowIndex,
        setEditableRowIndex,
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
        fetchData(email, pageIndex, 5, "", token)
    }, [pageIndex, pageSize])

    // React.useEffect(() => {
    //     console.log("test123")
    //     getPaginatedReservaties(pageIndex, pageSize, "", email, token)
    //     // fetchData(pageIndex, pageSize, "", email, token)
    // }, [fetchData, pageIndex, pageSize])


    const [kamerStartReserveringen, setKamerReserveringenStart] = useState([]);

    const [kamerEindReserveringen, setKamerReserveringenEind] = useState([]);

    const testClick = (items, index) => {
        // console.log(data, "index")
        // console.log(    data[0], "loollolo")
        // console.log( items.start.toLocaleString().split("T")[0], "ekek")
        // console.log(data[index].startTijd, "test")

        console.log(items, "items")
        let eindArr = []
        let startArr =[]
        console.log(startDate, "hek")
        getAllKamerByNaamAndGetAllReserverationsOnCertainDay(items.naam,
            (new Date(items.start).toLocaleDateString()).split("/").join("-"), token).then((res, err) => {
                res.data.map((item, index) => {
                    console.log(item, "item123")
                    // start dates should not include
                    // all end dates time and selected end time
                    //
                    // that are selected by start date
                    // if ()
                    if ((new Date(startDate)) !== new Date(item.start)){
                        startArr.push(new Date(item.start))
                    }
                    if ((new Date(endDate)) !== new Date(item.end)){
                        eindArr.push(new Date(item.end))
                    }

                    // arr.push(new Date(item.start))
                })
                // console.log(res.data, "oekzilla")
            console.log(startArr, "startarr")
            console.log(eindArr, "eindarr")
            startArr.push(new Date(endDate))
            eindArr.push(new Date(startDate))
                setKamerReserveringenStart(startArr)
            setKamerReserveringenEind(eindArr)
                // setStartDate(new Date(items.))
            }
        )

        // timeRangeSliderDate.toLocaleDateString().split("/").join("-")

        // console.log(items.start.split("/").join("-"))
        //
        // console.log(new Date(items.start).getHours(), "hours")
    }
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
                    // {row.values.isEditing}
                    return row.values.isEditing ? <tr key={row.values.key}>
                            <td>{row.values.naam}</td>
                            <td onClick={() => testClick(row.values, i)}>
                                <DatePicker
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    showTimeSelect
                                    minTime={new Date(data[i].startTijd)}
                                    maxTime={new Date(data[i].sluitTijd)}
                                    minDate={new Date(data[i].startTijd)}
                                    maxDate={new Date(data[i].sluitTijd)}
                                    timeIntervals={60}
                                    dateFormat="MMMM d, yyyy h:mm aa"
                                    excludeTimes={kamerStartReserveringen}
                                />
                            </td>
                            <td onClick={() => testClick(row.values, i)}>
                                <DatePicker
                                    selected={endDate}
                                    onChange={(date) => setEndDate(date)}
                                    showTimeSelect
                                    minTime={new Date(data[i].startTijd)}
                                    maxTime={new Date(data[i].sluitTijd)}
                                    minDate={new Date(data[i].startTijd)}
                                    maxDate={new Date(data[i].sluitTijd)}
                                    timeIntervals={60}
                                    dateFormat="MMMM d, yyyy h:mm aa"
                                    excludeTimes={kamerEindReserveringen}
                                />
                            </td>
                            <td></td>
                            <td>
                                <EditAndDeleteButton originalRow={data[i]} rowIndex={i}/>
                            </td>
                        </tr> :
                        (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    // {...cell.getCellProps().map(item => {console.log(item)})}
                                    // console.log(...cell.getCellProps(), "props dog")
                                    return <td {...cell.getCellProps()}
                                    >{cell.render('Cell')}</td>
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

const ReserveringTable = (props) => {
    const [startDate, setStartDate] = useState(
        new Date()
    );

    const [endDate, setEndDate] = useState(
        new Date()
    );

    const columns = React.useMemo(
        () => [{
            Header: "Kamernaam",
            accessor: "naam"
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
                accessor: "isEditing"
            },
            {
                Header: 'Acties',
                accessor: (originalRow, rowIndex) => (
                    <EditAndDeleteButton originalRow={originalRow} rowIndex={rowIndex}/>
                ),
                id: 'action',
            },
        ],
        []
    );

    const EditAndDeleteButton = ({originalRow, rowIndex}) => {
        // console.log(originalRow, " kek")
        // console.log(rowIndex, "oekoek")
        // props.reservaties[rowIndex]
        // props.reservaties[rowIndex]
        return <div>
            <button
                onClick={() => handleClickEditRow(originalRow, rowIndex)}>
                {originalRow.isEditing ? "Save" : "Edit"}
            </button>

            <button
                onClick={() => props.deleteReservatie(originalRow.naam, originalRow.id, props.token, props.email)}>
                Delete
            </button>
        </div>
    }

    const handleClickEditRow = (originalRow, rowIndex) => {
        if (originalRow.isEditing) {
            props.setReservaties(prev => prev.map((r, index) => ({...r, isEditing: !rowIndex === index})))
            // check if start is before end
            console.log(originalRow, "org 123")
            // new Date(originalRow.startDate).isBefore(originalRow)
            // send async request
            // if good setstart and enddate
            // else keep date and send error
        } else {
            props.setReservaties(prev => prev.map((r, index) => ({...r, isEditing: rowIndex === index})))
            setStartDate(new Date(originalRow.start))
            setEndDate(new Date(originalRow.end))

        }
    }

    return (
        <Styles>
            <Table
                columns={columns}
                data={props.reservaties}
                loading={props.loading123}
                pageCount={props.pageCount}
                fetchData={props.getPaginatedReservaties}
                email={props.email} token={props.token}
                EditAndDeleteButton={EditAndDeleteButton}
                endDate={endDate}
                startDate={startDate}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
            />
        </Styles>
    )
}

export default ReserveringTable