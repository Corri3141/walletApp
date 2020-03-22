import React, { useState } from 'react';
import {TextField,Button,Typography,Divider, IconButton} from '@material-ui/core';
import gql from 'graphql-tag';
import { useMutation} from '@apollo/react-hooks';
import {Link} from "react-router-dom"
import UserPicker from "./components/userPicker"
import CardPicker from "./components/cardPicker"


const CREATE_EXPENSE = gql`
  mutation CreateExpense($date: Period,
                         $name: String,
                         $responsable:String,
                         $cardId:String,
                         $cardAmount:Float,
                         $cash:Float) {
    createExpense(
        date: $date,
        name: $name,
        responsable: $responsable,
        cardId: $cardId,
        cardAmount: $cardAmount,
        cash: $cash,) {
      expense{
          id
      }
    }
  }
`;

const today = new Date()
const dateTransformer = (date) =>{
    const month = (date.getMonth()+1) >= 10 ? (date.getMonth()+1) : ("0"+(date.getMonth()+1))
    return date.getFullYear()+ "-"+month
}

export default function AddExpense(props){
    const [createExpense, { data }] = useMutation(CREATE_EXPENSE);
    const [variables,setVariables] = useState(
                                            {
                                                date:dateTransformer(today),
                                                name:"",
                                                responsable:null,
                                                cardId:null,
                                                cardAmount:0,
                                                cash:0,
                                            }
                                        )

    const onChangeData = (event) =>{
        setVariables({...variables,[event.currentTarget.id]:event.currentTarget.value })
    }             
    const onCreate = (e) => {
        createExpense({ variables: variables })
    }               
    const handleSelect= (data) => {
        data ? setVariables({...variables,cardId:data.id}) : setVariables({...variables,cardId:data,cardAmount:0})
    }
    
    return (
    <div style={{width:"100%",height:"100%",backgroundColor:"white",marginTop:"2%"}}>
    <Typography style={{textAlign:"center"}} variant="h3"> Add Expense </Typography>
    <Divider style={{width:"100%"}}/>
    <div style={{margin:"5%"}}>
        <TextField id="date" style={{color:"white"}}  variant="outlined" label="Year-Month" defaultValue={variables.date} onChange={onChangeData}/>
        <TextField id="name" style={{color:"white",marginLeft:"2%"}} variant="outlined" label="Expense Name" onChange={onChangeData}/>
    </div>
    <div>
    <TextField id="cash" style={{color:"white",marginLeft:"5%"}} variant="outlined" label="Cash" defaultValue={0} onChange={onChangeData}/>
    </div>
    <div style={{marginLeft:"5%",marginTop:"2%",postion:"absolute"}}>
    <CardPicker onSelected={handleSelect} />
    {variables.cardId ? <TextField id="cardAmount" style={{color:"white",marginLeft:"15.8%"}} variant="outlined" label="Card Amount" defaultValue={0} onChange={onChangeData}/> :null}
    </div>
    <div style={{textAlign:"right",marginRight:"2%",marginTop:"8%"}}>
        <UserPicker onSelected={handleSelect} />
        <Link to="/"> 
            <Button variant="contained" color="primary" onClick={onCreate}>Create</Button>
        </Link>
    </div>
    </div>)
}