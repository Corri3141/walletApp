import React, { useState,useEffect,useRef } from 'react';
import {TextField,Button,Typography,Divider} from '@material-ui/core';
import gql from 'graphql-tag';
import { useMutation, useQuery} from '@apollo/react-hooks';
import {Link} from "react-router-dom"
import { Alert, AlertTitle } from '@material-ui/lab';

const EDIT_USER = gql`
  mutation EditUser($user: String,
                         $firstName: String,
                         $lastName:String,
                         $email:String,
                         $password:String,
                         $income:Float,
                         $savings:Float) {
        editUser(
        user: $user,
        firstName: $firstName,
        lastName: $lastName,
        password: $password,
        income: $income,
        savings: $savings,
        email:$email,) {
      user{
          id
      }
    }
  }
`;

export default function EditSeletedUser(props){
    const [editUser, { data }] = useMutation(EDIT_USER);
    const [showAlert,setShowAlert] = useState(false)

    const [variables,setVariables] = useState(
                                            {
                                                firstName:props.data.firstName,
                                                lastName:props.data.lastName,
                                                password:props.data.password,
                                                income:props.data.income,
                                                savings: props.data.savings,
                                                user:props.data.id,
                                                email:props.data.email
                                            }
                                        )


    const onChangeData = (event) =>{
        setVariables({...variables,[event.currentTarget.id]:event.currentTarget.value })
    }             

    const editButon = () => {
        editUser({ variables: variables })
        setTimeout(function() {
            setShowAlert(true) 
        }, 1000);
        setShowAlert(true)
        setTimeout(function() {
            setShowAlert(false) 
        }, 2000);

    }

    return (
    
    <div style={{width:"100%",height:"100%",backgroundColor:"white",marginTop:"2%"}}>
    <Typography style={{textAlign:"center"}} variant="h3"> Edit User </Typography>
    {showAlert ? 
    <div style={{position:"absolute",float:"right",marginLeft:"79%",marginTop:"1%"}}>
    <Alert  severity="success">
        <AlertTitle>Success</AlertTitle>
            You Have Just Edit this User!
    </Alert>
    </div> : null}
    <Divider style={{width:"100%"}}/>
    <div style={{margin:"5%"}}>
        <TextField id="firstName" 
        style={{color:"white"}}
        defaultValue={variables.firstName}
        variant="outlined" 
        label="First Name" 
        onChange={onChangeData}/>
        <TextField id="lastName" 
        style={{color:"white",marginLeft:"2%"}}
        defaultValue={variables.lastName}
        variant="outlined" 
        label="Last Name" 
        onChange={onChangeData}/>
    <TextField 
    id="email" 
    style={{color:"white",marginLeft:"2%"}}
    variant="outlined" 
    label="Email" 
    defaultValue={variables.email}
    onChange={onChangeData}/>
    </div>
    <TextField 
    id="income" 
    style={{color:"white",marginLeft:"5%"}}
    variant="outlined" 
    label="Income" 
    defaultValue={variables.income}
    onChange={onChangeData}/>
    <TextField 
    id="savings"
    defaultValue={variables.savings}
    style={{color:"white",marginLeft:"2%"}} 
    variant="outlined" 
    label="Savings" 
    onChange={onChangeData}/>
    <TextField 
    id="password"
    defaultValue={variables.password}
    style={{color:"white",marginLeft:"2%"}} 
    variant="outlined" 
    label="Password"
    type="password" 
    onChange={onChangeData}/>

    <div style={{textAlign:"right",marginRight:"2%",marginTop:"10%"}}>
            <Button variant="contained"  onClick={editButon} color="primary">Edit</Button>
    </div> 

    
    </div>)
}