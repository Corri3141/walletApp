import React from 'react';
import {Paper,Typography,Popper,ClickAwayListener,Button,MenuItem,Table,TableBody,TableContainer,TableCell,TableHead,TableRow} from '@material-ui/core';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

// const CURRENT_USER = gql`
// {
//     currentUser{
//         id
//         firstName
//         lastName
//     }
// }
// `

export default function Home(props){
    // const {loading,error,data} = useQuery(CURRENT_USER)
    // if(loading){return "Loading..."}
    // if(error){return ("Error!"+error)}
    return (
        "Hello"
    )
}