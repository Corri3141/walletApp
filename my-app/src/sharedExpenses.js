import React from 'react';
import {Paper,Typography,Popper,ClickAwayListener,Button,MenuItem,Table,TableBody,TableContainer,TableCell,TableHead,TableRow} from '@material-ui/core';
import gql from 'graphql-tag'
import { useQuery  } from '@apollo/react-hooks';

const allExpenses =  gql`
{
    users{
      firstName
      savings
      income
      expenses {
        id
        name
        food
      }
    }
}
`;

export default function Shared(props){

    const { loading, error, data } = useQuery(allExpenses);
    if(loading){return "Loading..."}
    if (error) return `Error! ${error}`;

        const {items} = this.state
        return(
            <>
            {this.state.loading ? <div>Loading ...</div> :
                                 <TableContainer component={Paper}>
                                 <Table aria-label="Users Data">
                                     <TableHead>
                                     <TableRow>
                                         <TableCell>User Name</TableCell>
                                         <TableCell align="right">Shared Expenses</TableCell>
                                         <TableCell align="right">Cost</TableCell>
                                     </TableRow>
                                     </TableHead>
                                     
                                     {items.map(data=>{return(
                  <> 
<TableBody>
                            <TableRow>
                            <TableCell>{data.user}</TableCell>
                            <TableCell align="right">{data.sharedExpenses}</TableCell>
                            <TableCell align="right">${data.value}</TableCell>
                            </TableRow>
                        
                        </TableBody>


                  </> ) } ) }                    </Table>
                    </TableContainer>}
            </>
        )
    }
