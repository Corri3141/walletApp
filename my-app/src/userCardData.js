import React,{useState} from 'react';
import CanvasJSReact from "./canvasjs-2.3.2 (2)/canvasjs.react";
import gql from 'graphql-tag'
import { useQuery  } from '@apollo/react-hooks';
import { Button, IconButton, Popper, ClickAwayListener, Paper} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom"
import AddCard from "./addCard"

var CanvasJSChart = CanvasJSReact.CanvasJSChart;


const userCards = gql`
    query($user:String,$date:Period){
        cardExpenseByUser(user:$user,date:$date){
            period
            card{
            id
            name
            bank
            expense{
              id
              cardAmount
              }
          }
          }
      }
    
`;
const today = new Date()
const dateTransformer = (date) =>{
    const month = (date.getMonth()+1) >= 10 ? (date.getMonth()+1) : ("0"+(date.getMonth()+1))
    return date.getFullYear()+ "-"+month
}

export default function UserCardsData(props) {
    const [selectedDay,setSelectedDay] = useState(dateTransformer(today))
    const { loading, error, data } = useQuery(userCards,{variables: {user:props.data.id,date:selectedDay} });
    const [isOpenAddCard,setOpenAddCard] = useState(false)
    if(loading){return "Loading..."}
    if (error) return `Error! ${error}`;

    var cards = new Set()
    var dataPoints = []
    var total = 0
    for(let card of data.cardExpenseByUser[0].card){
        let cardTotal = 0
        for(let expense of card.expense){
            cardTotal +=expense.cardAmount
        }
        cards.add(JSON.stringify({name:card.name,id:cards.id,bank:card.bank,totalCost:cardTotal}))
    }
    for(let card of cards){
        let info = JSON.parse(card)
        dataPoints.push({label:(info.name+" "+info.bank),y:info.totalCost})
        total+=info.totalCost
    }
    const stackedOptions = {
    animationEnabled: true,
    backgroundColor:"black",
    colorSet:"greenShades",
	title:{
		text: "Credit Card Totals",
		fontFamily: "Calibti",
		fontColor: "white"
    },
    subtitles: [{
        fontColor:"white",
        text: "$"+total,
        verticalAlign: "center",
        fontSize: 24,
        dockInsidePlotArea: true
    }],
	axisY:{
		prefix:"$",
	},
	data: [{
        type: "doughnut",
        showInLegend: "true",
        legendText: "{label}",
        indexLabelFontSize: 16,
        indexLabelFontColor:"white",
        toolTipContent: "{label} - {y}$",
        dataPoints: dataPoints
    }]
    }
    return(
        <div style={{width:"100%",backgroundColor:"black",height:window.screen.height,position:"relative"}}>
            <IconButton style={{float:"right"}} onClick={()=>setOpenAddCard(true)} color="primary"><AddCircleIcon fontSize="large"/></IconButton>

            { isOpenAddCard ? 
                    <Paper style={{position:"absolute",width:"50%",height:"fit-content",zIndex:999,margin:"6%"}}>
                        <ClickAwayListener onClickAway={()=>setOpenAddCard(false)}>
                            <AddCard onClose={()=>setOpenAddCard(false)} data={props.data} />
                        </ClickAwayListener>
                    </Paper>   : 
            <CanvasJSChart containerProps={{width:"100%",marginTop:"3%",float:"right",backgroundColor:"black"}} id="stackedData" options = {stackedOptions} />
              }
    


        </div>
    )
}