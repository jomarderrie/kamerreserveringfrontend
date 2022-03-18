import React, {Component, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";

export default function TableView(props) {
    const [propsLoading, setPropsLoading] = useState(true);
    useEffect(() => {
        console.log(props.reservaties, "lo098")
        return () => {
            setPropsLoading(false)
        };
    }, [props]);
    // const columns = React.useMemo(
    //     () => [
    //
    //         {
    //             Header: 'First Name',
    //             accessor: 'firstName',
    //         },
    //
    //     ],
    //     []
    // )
    const columns = React.useMemo(() => [
        {
            Header: "Start tijd",
            accessor: 'start'
        },
        {
            Header: 'Eind tijd',
            accessor: 'End'
        },
        {
            Header: 'Naam',
            accessor: 'naam'
        },
        {

            Header: 'Achternaam',
            accessor: 'achterNaam'
        }
    ])



        return (
            <div>
                {propsLoading ? <div>Table window is loading...</div> : <div>


                </div>
                }
            </div>
        );
    }

