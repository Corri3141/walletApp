import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom"
import User from "./users"
import NavBar from "./NavBar"
import AddExpense from "./addExpense"
import Home from "./home"
export default class Routes extends React.Component{
    render(){
        return(
            <Router>
                <NavBar />
                <Switch>
                    <Route path="/home" component={Home} />
                </Switch>
                <Switch>
                    <Route path="/users" component={User} />
                </Switch>
                <Switch>
                    <Route path="/addExpense" component={AddExpense} />
                </Switch>
            </Router>
        )
    }
}
