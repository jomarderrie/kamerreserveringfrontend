import React, {useContext, useEffect, useState} from 'react'
import styled from 'styled-components'
import {useTable, usePagination} from 'react-table'
import DatePicker from "react-datepicker";
import {getAllKamerByNaamAndGetAllReserverationsOnCertainDay, maakNieuweReservatie} from "../../functions/kamers";

import EditAndDeleteButton from "../kamer/EditAndDeleteButton";
import moment from "moment";

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;
    width: ${props =>
            props.width ? '50vw' : '90vw'};

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
                   email,
                   token,
                   EditAndDeleteButton,
                   startDate,
                   endDate,
                   setStartDate,
                   setEndDate,
                   setReservaties,
                   singleRoom,
                   user,
                   room
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

    // useEffect(() => {
    //     if (singleRoom && data.length !== 0) {
    //         let excludeDates = calcaluteExcludingDates(data)
    //         console.log(excludeDates, "data123")
    //     }
    // }, [singleRoom, data])

    const onEditButtonClickWithReservations = (items) => {
        let excludeDates = calcaluteExcludingDates(items)
        setKamerReserveringenStart(excludeDates[0])
        setKamerReserveringenEind(excludeDates[1])
    }

    useEffect(()=>{
        if (data!==undefined && data.length>0){

            console.log(startDate, "start")
        getAllKamerByNaamAndGetAllReserverationsOnCertainDay
        (data[0].naam,
            (new Date(startDate).toLocaleDateString()).split("/").join("-"), token).then((res, err) => {
                let excludeDates = calcaluteExcludingDates(res.data)
                setKamerReserveringenStart(excludeDates[0])
                setKamerReserveringenEind(excludeDates[1])
            }
        )   }
    }, [startDate])

    useEffect(()=>{
        if (data!==undefined && data.length>0){

            console.log(endDate, "enddate")
            getAllKamerByNaamAndGetAllReserverationsOnCertainDay
            (data[0].naam,
                (new Date(endDate).toLocaleDateString()).split("/").join("-"), token).then((res, err) => {
                    let excludeDates = calcaluteExcludingDates(res.data)
                    setKamerReserveringenStart(excludeDates[0])
                    setKamerReserveringenEind(excludeDates[1])
                }
            ) }
    }, [endDate])


    const onEditButtonClick = (items, type) =>{
    if(type === "start"){
        getAllKamerByNaamAndGetAllReserverationsOnCertainDay
    (items.naam,
            (new Date(startDate).toLocaleDateString()).split("/").join("-"), token).then((res, err) => {
                let excludeDates = calcaluteExcludingDates(res.data)
                setKamerReserveringenStart(excludeDates[0])
                setKamerReserveringenEind(excludeDates[1])
            }
        )
    }else{
        getAllKamerByNaamAndGetAllReserverationsOnCertainDay
        (items.naam,
            (new Date(items.end).toLocaleDateString()).split("/").join("-"), token).then((res, err) => {
                let excludeDates = calcaluteExcludingDates(res.data)
                setKamerReserveringenStart(excludeDates[0])
                setKamerReserveringenEind(excludeDates[1])
            }
        )
    }

    }


    const calcaluteExcludingDates = (items) =>{
        let eindArr = []
        let startArr = []
        console.log(items, "items")
        items.map((item, index) => {
            if ((new Date(startDate)) !== new Date(item.start)) {
                startArr.push(new Date(item.start))
            }
            if ((new Date(endDate)) !== new Date(item.end)) {
                eindArr.push(new Date(item.end))
            }
        })
        if (new Date().toLocaleDateString() === new Date(endDate).toLocaleDateString()){
            startArr.push(new Date(endDate))
        }
        if (new Date().toLocaleDateString() ===  new Date(endDate).toLocaleDateString()){
            eindArr.push(new Date(startDate))
        }


        //
        // eindArr.push(new Date())
        // startArr.push(new Date())
        // console.log(start)
        // if (new Date().toLocaleDateString() === setStartDate.toLocaleString()){
        //     reserveringListObj.push({
        //         start: moment(getDate(new Date(kamer.startTijd).getHours())).toDate(),
        //         end: moment(getDate(new Date().getHours() +1)).toDate(),
        //     });
        // }


        return [startArr, eindArr]
    }

    // const checkIfReservationIsFull = (reserveringList) => {
    //     let totalHours = 0;
    //     let timeLineInterval = limite2[1].getHours() - limite2[0].getHours();
    //     if (reserveringList.length !== 0) {
    //         reserveringList.map((item) => {
    //             totalHours += item.end.getHours() - item.start.getHours();
    //         });
    //     }
    //     console.log(totalHours, "total");
    //     return totalHours >= timeLineInterval;
    // };

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
                    return data[i].isEditing ? <tr key={row.values.key}>
                            <td>{row.values.naam}</td>
                            <td >
                                <DatePicker
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    showTimeSelect
                                    minTime={new Date(data[i].startTijd)}
                                    maxTime={new Date(data[i].sluitTijd)}
                                    minDate={new Date(data[i].startTijd)}
                                    maxDate={new Date(data[i].sluitTijd)}
                                    timeIntervals={60}
                                    dateFormat="MMMM d, yyyy h:mm aa" excludeTimes={kamerStartReserveringen}
                                />
                            </td>
                            <td>
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
                            <td>
                                <EditAndDeleteButton originalRow={data[i]} rowIndex={i} startDate={startDate}
                                                     endDate={endDate} token={token} email={email}
                                                     setReservaties={setReservaties} user={user}/>
                            </td>
                        </tr> :
                        (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}
                                    >{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                })}
                {
                    (singleRoom && room) &&
                    <tr>
                        <td>
                            <td>
                                Voeg nieuwe reservering toe
                            </td>
                        </td>
                        <td onClick={() => onEditButtonClickWithReservations(data)}>
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                showTimeSelect
                                minTime={new Date(room.startTijd)}
                                maxTime={new Date(room.sluitTijd)}
                                minDate={new Date(room.startTijd)}
                                maxDate={new Date(room.sluitTijd)}
                                timeIntervals={60}
                                dateFormat="MMMM d, yyyy h:mm aa" excludeTimes={kamerStartReserveringen}
                            />
                        </td>
                        <td>
                            <DatePicker
                                onClick={() => onEditButtonClickWithReservations(data)}
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                                showTimeSelect
                                minTime={new Date(room.startTijd)}
                                maxTime={new Date(room.sluitTijd)}
                                minDate={new Date(room.startTijd)}
                                maxDate={new Date(room.sluitTijd)}
                                timeIntervals={60}
                                dateFormat="MMMM d, yyyy h:mm aa"
                                excludeTimes={kamerEindReserveringen}
                            />
                        </td>
                        <td>
                            <button onClick={(e) => console.log(e)}>Reserveer</button>
                        </td>
                    </tr>
                }
                {!singleRoom && <tr>
                    {loading ? (
                        // Use our custom loading state to show a loading indicator
                        <td colSpan="10000">Loading...</td>
                    ) : (
                        <td colSpan="10000">
                            Showing {page.length} of ~{controlledPageCount * pageSize}{' '}
                            results
                        </td>
                    )}
                </tr>}

                </tbody>
            </table>
            {!singleRoom &&
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
            }
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
                Header: 'Acties',
                accessor: (originalRow, rowIndex) => (
                    <EditAndDeleteButton originalRow={originalRow} rowIndex={rowIndex} token={props.token}
                                         email={props.email} setReservaties={props.setReservaties} user={props.user}
                                         setStartDate={setStartDate} setEndDate={setEndDate}
                                         singleRoom={props.singleRoom}/>
                ),
                id: 'action',
            },
        ],
        []
    );

    const columns1 = React.useMemo(
        () => [{
            Header: "Kamernaam2",
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
                Header: 'Acties',
                accessor: (originalRow, rowIndex) => (
                    // {(originalRow[rowIndex].naam === props.user.naam && originalRow[rowIndex].achterNaam === props.user.achterNaam && props.singleRoom) ?

                    <EditAndDeleteButton originalRow={originalRow} rowIndex={rowIndex} token={props.token}
                                         email={props.email} setReservaties={props.setReservaties} user={props.user}
                                         setStartDate={setStartDate} setEndDate={setEndDate}
                                         singleRoom={props.singleRoom}/>
                ),
                id: 'action2',
            },
        ],
        []
    );

    return (
        <Styles width={props.singleRoom}>
            {props.singleRoom ? <Table
                    columns={columns}
                    data={props.reservaties}
                    singleRoom={props.singleRoom}
                    user={props.user}
                    loading={props.loading123}
                    pageCount={props.pageCount}
                    fetchData={props.getPaginatedReservaties}
                    email={props.email}
                    token={props.token}
                    setReservaties={props.setReservaties}
                    EditAndDeleteButton={EditAndDeleteButton}
                    endDate={endDate}
                    startDate={startDate}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                    room={props.room}
                /> :
                <Table
                    columns={columns1}
                    data={props.reservaties}
                    singleRoom={props.singleRoom}
                    user={props.user}
                    loading={props.loading123}
                    pageCount={props.pageCount}
                    fetchData={props.getPaginatedReservaties}
                    email={props.email}
                    token={props.token}
                    setReservaties={props.setReservaties}
                    EditAndDeleteButton={EditAndDeleteButton}
                    endDate={endDate}
                    startDate={startDate}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}

                />}

        </Styles>
    )
}

export default ReserveringTable