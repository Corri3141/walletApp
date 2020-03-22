import React, { useState, useEffect } from 'react';
import {TextField,Button,Popper,ClickAwayListener,Paper} from '@material-ui/core';
import gql from 'graphql-tag';
import { useMutation,useQuery } from '@apollo/react-hooks';
import {Link} from "react-router-dom"
import PersonIcon from '@material-ui/icons/Person';

const CURRENT_USER =gql`{
        users {
          id
          firstName
          lastName
        }
  }
`;

export default function UserPicker(props){
    const { loading, error, data } = useQuery(CURRENT_USER);
    const [anchorEl,setAnchorEL] = useState(null)
    const [selected,setSelected] = useState(false)

    const handleSelectUser = (id,firstName) => {
        setAnchorEL(null)
        setSelected({id:id,name:firstName})
    }
    useEffect(()=>{
        props.onSelected(selected.id)
    },[selected])

    const handleClick = (event) => {
        setAnchorEL(event.currentTarget)
    }
    if(loading){return "Loading..."}
    if (error) return `Error! ${error}`;
    


    return(
    <>
    <Button color={selected ? "primary" : "secondary"} onClick={handleClick}><PersonIcon style={{...props.style,margin:"1%"}} />{selected ? selected.name : "Responsable"}</Button>
    <Popper open={Boolean(anchorEl)} anchorEl={anchorEl}>
        <ClickAwayListener onClickAway={()=>setAnchorEL(false)}>
            <Paper>
              {data.users.map(user =><div> <Button onClick={()=>{handleSelectUser(user.id,user.firstName)}} style={{textAlign:"center",margin:"1%",width:"100%"}}>{user.firstName}</Button> </div>)}
            </Paper>
        </ClickAwayListener>
    </Popper>

    </>)
}
