import React, { useState } from 'react';
import {TextField,Button,Typography,Divider, IconButton} from '@material-ui/core';
import gql from 'graphql-tag';
import { useMutation} from '@apollo/react-hooks';
import {Link} from "react-router-dom"
import CancelIcon from '@material-ui/icons/Cancel';
import { Alert, AlertTitle } from '@material-ui/lab';

const CREATE_CARD = gql`
  mutation CreateCard(   $name: String,
                         $user:String,
                         $bank:String) {
    createCard(
        name:$name,
        user:$user,
        bank:$bank) {
      card{
          id
      }
    }
  }
`;

export default function AddCard(props){
    const [createCard, { data }] = useMutation(CREATE_CARD);
    const [variables,setVariables] = useState(
                                            {
                                                bank:null,
                                                name:null,
                                                user:props.data.id,
                                            }
                                        )
    const [showAlert,setShowAlert] = useState(false)
    const onChangeData = (event) =>{
        setVariables({...variables,[event.currentTarget.id]:event.currentTarget.value })
    }             
       
    const cardCreator = () => {
        createCard({ variables: variables })
        setTimeout(function() {
            setShowAlert(true) 
        }, 1000);
        setShowAlert(true)
        setTimeout(function() {
            setShowAlert(false) 
        }, 2000);
        setVariables({
            bank:null,
            name:null,
            user:props.data.id,
        })
    }
    return (
    <div style={{width:"100%",height:"100%",backgroundColor:"transparent"}}>

    <Typography style={{textAlign:"center"}} variant="h3"> Add Card 
    <IconButton style={{float:"right"}} color="secondary"><CancelIcon onClick={()=>props.onClose()} /></IconButton>
    </Typography>
    <Divider style={{width:"100%"}}/>
    <div style={{margin:"5%"}}>
        <TextField id="bank" style={{color:"white"}}  variant="outlined" label="Bank" defaultValue={variables.date} onChange={onChangeData}/>
        <TextField id="name" style={{color:"white",marginLeft:"2%"}} variant="outlined" label="Card Name" onChange={onChangeData}/>
    </div>
    <div style={{textAlign:"right",marginRight:"2%",marginTop:"10%"}}>
            <Button variant="contained" style={{marginBottom:"2%"}} color="primary" onClick={cardCreator}>Create</Button>
    </div>
    {showAlert ? 
    <Alert style={{postion:"absolute"}} severity="success">
        <AlertTitle style={{postion:"absolute"}}>Success</AlertTitle>
            You Have Just Add a New Card!
    </Alert> : null}
    </div>)
}