import React, {useContext, useEffect, useState} from 'react'
import styled from 'styled-components'
import {useTable, usePagination} from 'react-table'
import DatePicker from "react-datepicker";
import {getAllKamerByNaamAndGetAllReserverationsOnCertainDay, maakNieuweReservatie} from "../../functions/kamers";
import {endOfToday, set} from "date-fns";
import EditAndDeleteButton from "../kamer/EditAndDeleteButton";
import moment from "moment";
import {toast} from "react-toastify";

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
                   room,
                   sliderDate
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
        // Get the state from the instance
        state: {pageIndex, pageSize = 5, tableData},
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
        if (singleRoom===false){

        fetchData(email, pageIndex, 5, "", token)
        }
    }, [pageIndex, pageSize])


    const [kamerStartReserveringen, setKamerReserveringenStart] = useState([]);

    const [kamerEindReserveringen, setKamerReserveringenEind] = useState([]);

    useEffect(() => {
        console.log(singleRoom, "singleroom")
        if (data !== undefined && data.length > 0 && !singleRoom) {
            console.log(startDate, "start")
            getAllKamerByNaamAndGetAllReserverationsOnCertainDay
            (data[0].naam,
                (new Date(sliderDate).toLocaleDateString()).split("/").join("-"), token).then((res, err) => {
                    let excludeDates = calcaluteExcludingDates(res.data)
                    setKamerReserveringenStart(excludeDates[0])
                    setKamerReserveringenEind(excludeDates[1])
                }
            )
        }else{
            console.log(room, "rom123")
            if (room!==undefined) {


                getAllKamerByNaamAndGetAllReserverationsOnCertainDay
                (room.naam,
                    (new Date(startDate).toLocaleDateString()).split("/").join("-"), token).then((res, err) => {
                        let excludeDates = calcaluteExcludingDates(res.data)
                        setKamerReserveringenStart(excludeDates[0])
                        setKamerReserveringenEind(excludeDates[1])
                    }
                )
            }
        }
    }, [startDate])

    const handleNieuweReservation = (naam, startDate, endDate) =>{
        maakNieuweReservatie(naam, set(new Date(startDate), {hours: new Date(startDate).getHours() +2}), set(new Date(endDate), {hours: new Date(endDate).getHours() +2})
            , token).then ( (res,err)=>{
            if (err){
                toast.error(err.response)
            }else{
                if (room!==undefined){
                fetchData(   room.naam,
                    (new Date(sliderDate).toLocaleDateString()).split("/").join("-"), token)
                toast.success("succesvol reservatie")
            }
            }
        } ).catch(err =>{
            toast.error(err.response.data.message)
        })
    }

    useEffect(() => {
        console.log(data.length >0, "data")
        console.log(data !== undefined && data.length > 0 && !singleRoom, "ok")
        if (data !== undefined && data.length > 0 && !singleRoom) {
            console.log(endDate, "enddate")
            getAllKamerByNaamAndGetAllReserverationsOnCertainDay
            (data[0].naam,
                (new Date(endDate).toLocaleDateString()).split("/").join("-"), token).then((res, err) => {
                    let excludeDates = calcaluteExcludingDates(res.data)
                    setKamerReserveringenStart(excludeDates[0])
                    setKamerReserveringenEind(excludeDates[1])
                }
            )
        }else{
            if (room !== undefined){

            getAllKamerByNaamAndGetAllReserverationsOnCertainDay
            (room.naam,
                (new Date(startDate).toLocaleDateString()).split("/").join("-"), token).then((res, err) => {
                    let excludeDates = calcaluteExcludingDates(res.data)
                    setKamerReserveringenStart(excludeDates[0])
                    setKamerReserveringenEind(excludeDates[1])
                }
            )
            }
        }
    }, [endDate])

    const calcaluteExcludingDates = (items) => {
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
        if (new Date().toLocaleDateString() === new Date(endDate).toLocaleDateString()) {
            startArr.push(new Date(endDate))
        }
        if (new Date().toLocaleDateString() === new Date(endDate).toLocaleDateString()) {
            eindArr.push(new Date(startDate))
        }
        return [startArr, eindArr]
    }

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
                            <td>
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

                        <td></td>

                        <td>
                        <td>
                            Voeg nieuwe reservering toe
                        </td>
                    </td>
                        <td
                            // onClick={() => onEditButtonClickWithReservations(data)}
                        >
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                showTimeSelect
                                minTime={new Date(room.startTijd)}
                                maxTime={new Date(room.sluitTijd)}
                                minDate={new Date(room.startTijd)}
                                maxDate={new Date(room.sluitTijd)}
                                timeIntervals={60}
                                dateFormat="MMMM d, yyyy h:mm aa"
                                excludeTimes={kamerStartReserveringen}
                            />
                        </td>
                        <td>
                            <DatePicker
                                // onClick={() => onEditButtonClickWithReservations(data)}
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
                            <button onClick={(e) => handleNieuweReservation(room.naam, startDate, endDate)}>Reserveer</button>
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
        set(new Date(), {
            seconds: 0,
            hours: new Date().getHours(),
            milliseconds: 0,
            minutes: 0,
        })
    );

    const [endDate, setEndDate] = useState(
        set(new Date(), {
            seconds: 0,
            hours: new Date().getHours()+1,
            milliseconds: 0,
            minutes: 0,
        })
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
            Header: "naam",
            accessor: "naam"
        },
            {
                Header: "achternaam",
                accessor: "achterNaam"
            },
            {
                Header: "start tijd",
                accessor: "start"
            },
            {
                Header: "einde tijd",
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

    useEffect(() =>{
        console.log(props, "props")
    }, [props])

    return (
        <Styles width={props.singleRoom}>
            {props.singleRoom ? <Table
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
                    room={props.room}
                    sliderDate={props.sliderDate}
                /> :
                <Table
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

                />}

        </Styles>
    )
}

export default ReserveringTable