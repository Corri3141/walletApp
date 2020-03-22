import React,{useState} from 'react';
import {Paper,
       Typography,
       Popper,
       Button,
       MenuItem,
       IconButton,
       ButtonGroup} from '@material-ui/core';
import CanvasJSReact from "./canvasjs-2.3.2 (2)/canvasjs.react";
import { Link } from "react-router-dom"
import gql from 'graphql-tag'
import { useQuery  } from '@apollo/react-hooks';
import TodayIcon from '@material-ui/icons/Today';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;
CanvasJSReact.CanvasJS.addColorSet("greenShades",
["#2F4F4F",
"#008080",
"#2E8B57",
"#3CB371",
"#90EE90" ])
CanvasJSReact.CanvasJS.addColorSet("redLine",["red"])


const userExpense = gql`
    query($user:String,$date:Period){
        expenseByUser(user:$user,date:$date){
            period
            expense{
                id
                name
                cardAmount
                cash            
            }
        }
      }
    
`;

export default function UserData(props){
    const today = new Date()
    const dateTransformer = (date) =>{
        const month = (date.getMonth()+1) >= 10 ? (date.getMonth()+1) : ("0"+(date.getMonth()+1))
        return date.getFullYear()+ "-"+month
    }
    const [selected,setSelected] = useState(dateTransformer(today))

    const { loading, error, data } = useQuery(userExpense,{variables: {user:props.data.id,date:selected} });
    const [reference,setReference] = useState("income")

    if(loading){return "Loading..."}
    if (error) return `Error! ${error}`;
    let dataPoints = []
    let totalExpense = 0
    for(let expense of data.expenseByUser[0].expense){
        totalExpense+=expense.cardAmount
        totalExpense+=expense.cash

    }
    for(let expense of data.expenseByUser[0].expense){
        dataPoints.push({y:(expense.cash+expense.cardAmount),label:expense.name,p:(((expense.cash + expense.cardAmount)*100)/props.data[reference]).toFixed(0)})
        }
    const options = {
        colorSet: "greenShades",
        exportEnabled: true,
        animationEnabled: true,
        backgroundColor:"black",
        title: {
            text: props.data.firstName+"´s Individual Expenses",
            fontFamily:"calibri",
            fontColor:"white"
        },
        subtitles: [{
            fontColor:props.data[reference]-totalExpense  < 0 ? "red":"green",
            text: "$"+String(props.data[reference]-totalExpense),
            verticalAlign: "center",
            fontSize: 24,
            dockInsidePlotArea: true
        }],
        data: [{
            indexLabel:"{p}%",
            innerRadius: "65%",
            indexLabelPlacement: "inside",
            type: "doughnut",
            startAngle: 75,
            indexLabelFontColor:"white",
            showInLegend: "true",
            legendText: "{label}",
            indexLabelFontSize: 16,
            toolTipContent: "{label} - {y}$",
            dataPoints: dataPoints
        }]
    }

    var dataByPeriod = []
    var position = 0
    for(let periodData of data.expenseByUser){
        let totalPeriodCost = 0
        for(let expenseData of periodData.expense){
            totalPeriodCost += expenseData.cash
            totalPeriodCost += expenseData.cardAmount
        }
        dataByPeriod.push({label:periodData.period,y:totalPeriodCost,click:()=>{setSelected(periodData.period)}})
        position+=1
    }
    const LineOption = {
        animationEnabled: true,  
        backgroundColor:"black",
        colorSet:"redLine",
        title:{
            text: "Expense Evolution",
            fontFamily:"Calibri",
            fontColor:"white"
        },
        axisY: {
            prefix: "$",
        },
        data: [{
            type: "spline",
            dataPoints:dataByPeriod.reverse()
        }]

    }
    return(
        <div style={{width:"100%",backgroundColor:"black",height:window.screen.height,position:"relative"}}>
        <div style={{width:"100%",marginLeft:"2%"}}>
            <div style={{position:"absolute",backgroundColor:"transparent",zIndex:999,width:"100%"}}>
                <Typography variant="h5" style={{color:"white",marginLeft:"5%",marginTop:"2%"}}>Total Expense : ${totalExpense}, {reference} representation : {((totalExpense*100)/(props.data[reference])+"%")}
                       <div style={{marginLeft:"80%"}}> Today:<IconButton onClick={()=>setSelected(dateTransformer(today))} style ={{color:"white"}}><TodayIcon /></IconButton> </div>  
                </Typography>
            </div>
        </div>
        <Button onClick={()=>setReference("savings")} style={{marginLeft:"10%",color:"white",marginTop:"5%",position:"absolute",zIndex:999}}>Savings Reference</Button>
        <Button onClick={()=>setReference("income")} style={{marginLeft:"33%",color:"white",marginTop:"5%",position:"absolute",zIndex:999}}>Income Reference</Button>
        <CanvasJSChart containerProps={{width:"50%",marginTop:"10%",float:"left"}} id="doughnut" options = {options} />
        <CanvasJSChart containerProps={{width:"50%",marginTop:"10%",float:"right"}} id="LineGraph" options = {LineOption} />
        </div>
    )
}