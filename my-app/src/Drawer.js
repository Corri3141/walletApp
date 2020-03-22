import React, { useState } from 'react';
import {Paper,Typography,Popper,ClickAwayListener,Button,MenuItem,Table,TableBody,TableContainer,TableCell,TableHead,TableRow} from '@material-ui/core';
import UserData from "./userData"
import CreditCardIcon from '@material-ui/icons/CreditCard';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import UserCardsData from "./userCardData"
import EditIcon from '@material-ui/icons/Edit';
import EditSeletedUser from "./editUser"

export default function Drawer(props){
    const [selected,setSelected] = useState("expenses")
    const [over,setOver] = useState("null")
    return(
        <>
        <div style={{marginTop:"2%",width:"4%",height:"auto",backgroundColor:"rgba(102,204,255,0.5)",zIndex:1000,zIndex:1000,position:"absolute"}}>
            <MonetizationOnIcon onMouseEnter={()=>setOver("expense")}
                                onMouseLeave={()=>setOver(null)}
                                fontSize="large"
                                onClick={()=>setSelected("expenses")}
                                style={{marginTop:"20%",marginLeft:"15%",color: over =="expense" ? "black" : "white" }} />
            <CreditCardIcon onMouseEnter={()=>setOver("card")}
                            onMouseLeave={()=>setOver(null)}
                            fontSize="large"
                            onClick={()=>setSelected("cards")} 
                            style={{marginLeft:"15%",color: over =="card" ? "black" : "white" }} />
            <EditIcon onMouseEnter={()=>setOver("edit")}
                            onMouseLeave={()=>setOver(null)}
                            fontSize="large"
                            onClick={()=>setSelected("edit")} 
                            style={{marginLeft:"15%",marginBottom:"20%",color: over =="edit" ? "black" : "white" }}  />
        </div>
        {selected == "expenses" ? <UserData data={props.data}/> :null}
        {selected == "cards" ? <UserCardsData data={props.data} /> :null}
        {selected == "edit" ? <EditSeletedUser data={props.data} /> : null}
        </>
    )
}