import React,{useState} from 'react';
import {Paper,Typography,Popper,ClickAwayListener,Button,MenuItem,Table,TableBody,TableContainer,TableCell,TableHead,TableRow} from '@material-ui/core';
import { Link } from "react-router-dom"
import HomeIcon from '@material-ui/icons/Home';
export default function Navbar(props){
    return(
        <div style={{backgroundColor:"#0b017a",width:"98%",height:"2%",padding:"1%",posotion:"relative"}}>
            <Link to="/home"><HomeIcon style={{color:"white",float:"left",marginLeft:"1%",marginRight:"1%"}} /></Link>
            <Link to="/users">
                    <Button style={{color:"white",marginLeft:"2%"}}>Users</Button>
            </Link>
            <Link to="/addExpense">
                    <Button style={{color:"white",marginLeft:"2%"}}>Add Expense</Button>
            </Link>
        </div>
    )
}