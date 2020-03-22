import React from 'react';
import {Paper,Typography,Popper,ClickAwayListener,Button,MenuItem,Table,TableBody,TableContainer,TableCell,TableHead,TableRow} from '@material-ui/core';
import Users from "./users"
import Shared from "./sharedExpenses"

export default class Menus extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            users:false,
            sharedExpenses:false,
        }
    }

    handleOpenUsers = ()=>{
        this.setState({users:true,sharedExpenses:false})
    }
    handleOpenShared = ()=>{
        this.setState({sharedExpenses:true,users:false})
    }
    render(){
        const {users,sharedExpenses} = this.state
        return(
            <>
            <Paper>
            <Button
             variant={users ? "contained" : "outlined"}
             color={users ? "primary" : "default"}
             onClick={this.handleOpenUsers}>
                Users Data
            </Button>
            <Button
             variant={sharedExpenses ? "contained" : "outlined"}
             color={sharedExpenses ? "primary" : "default"}
             onClick={this.handleOpenShared}>
                Shared Data
            </Button>
            </Paper>
            {users ? <Users /> : null }
            {sharedExpenses ? <Shared /> :null}
        </>
        )
    }

}

