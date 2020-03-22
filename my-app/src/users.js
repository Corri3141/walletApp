import React,{useState,useEffect,useRef} from 'react';
import {Paper,Typography,Popper,ClickAwayListener,Button,MenuItem,Table,TableBody,TableContainer,TableCell,TableHead,TableRow} from '@material-ui/core';
import gql from 'graphql-tag'
import { useQuery  } from '@apollo/react-hooks';
import UserData from "./userData"
import Drawer from "./Drawer"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom"

const allUsers = gql`
{
    users{
      id
      firstName
      lastName
      email
      savings
      income
      password
      expenses {
        id
        name
        cardAmount
        cash
      }
    }
    }
`;
export default function Users(props){
    const { loading, error, data } = useQuery(allUsers);
    const [graphData,setGraphData] = useState(null)
    const tableRow = useRef(null)
    const MouseOver = (e) => {
     e.currentTarget.style["background-color"] = "rgba(11, 46, 162, 0.12)"
    }
    const MouseLeave = (e) => {
      e.currentTarget.style["background-color"] = "white"

    }
    if(loading){return "Loading..."}
    if (error) return `Error! ${error}`;
    return(
        <>
                {graphData ? 
                    <Drawer data={graphData} />
                        :   <TableContainer component={Paper}>
                        <Table aria-label="Users Data">
                            <TableHead >
                                <TableRow>
                                    <TableCell>First Name</TableCell>
                                    <TableCell >Last Name</TableCell>
                                    <TableCell >Email</TableCell>
                                </TableRow>
                                </TableHead>
                                
                            {data.users.map(user=>{return(
                              <> 
                                    <TableBody style={{backgroundColor:"white"}} ref={tableRow} onMouseLeave={(e)=>MouseLeave(e)} onMouseEnter={(e)=>MouseOver(e)}>
                                        <TableRow style={{cursor:"pointer"}} onClick={(event)=>{setGraphData(user)}}>
                                        <TableCell >{user.firstName}</TableCell>
                                        <TableCell >{user.lastName}</TableCell>
                                        <TableCell >{user.email}</TableCell>
                                        </TableRow>
                                    
                                    </TableBody>
            
            
                              </> ) } ) }                    </Table>
                                </TableContainer>
                    }

            </>

        )
                                 
    }
