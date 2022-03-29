import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import {
  useTable,
  usePagination,
  useSortBy,
  useFilters,
  useGroupBy,
  useExpanded,
  useRowSelect,
} from 'react-table'
import { toast } from "react-toastify";
import { getAllUsers } from '../../functions/user';
import { FlexBox } from '../../styled/styles';


function Gebruikers() {
    const [loading, setLoading] = useState(false);
  const [data, setData] = useState([])





  return (
    <FlexBox>


      hey

    </FlexBox>
  )
}


export default Gebruikers
