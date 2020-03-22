import React, { useState, useEffect } from 'react';
import {TextField,Button,Popper,ClickAwayListener,Paper, IconButton} from '@material-ui/core';
import gql from 'graphql-tag';
import { useMutation,useQuery } from '@apollo/react-hooks';
import {Link} from "react-router-dom"
import PersonIcon from '@material-ui/icons/Person';
import CreditCardIcon from '@material-ui/icons/CreditCard';

const ALL_CARDS =gql`
    {
        allCards{
          name
          bank
          id
          owner {
            id
            firstName
          }
        }
      }
`;

export default function CardPicker(props){
    const { loading, error, data } = useQuery(ALL_CARDS);
    const [anchorEl,setAnchorEL] = useState(null)
    const [selected,setSelected] = useState(false)

    const handleSelectUser = (id,name,bank,ownerfirstName) => {
        setAnchorEL(null)
        setSelected({id:id,owner:ownerfirstName,bank:bank,name:name})
    }
    
    useEffect(()=>{
        props.onSelected(selected)
    },[selected])

    const handleClick = (event) => {
        setAnchorEL(event.currentTarget)
    }

    const handleSetNull = () => {
        setAnchorEL(null)
        setSelected(null)
    }
    if(loading){return "Loading..."}
    if (error) return `Error! ${error}`;
    


    return(
    <>
    <IconButton color={selected ? "primary" : "secondary"} style={{...props.style}}  onClick={handleClick}><CreditCardIcon /></IconButton>
    <Popper open={Boolean(anchorEl)} anchorEl={anchorEl} right-start>
        <ClickAwayListener onClickAway={()=>setAnchorEL(false)}>
            <Paper>
              <Button onClick={handleSetNull} style={{textAlign:"center",margin:"1%",width:"100%"}}> --- </Button>
              {data.allCards.map(card =><div> <Button onClick={()=>{handleSelectUser(card.id,card.name,card.bank,card.owner.firstName)}} style={{textAlign:"center",margin:"1%",width:"100%"}}>{card.owner.firstName+"--"+card.name+" "+card.bank}</Button> </div>)}
            </Paper>
        </ClickAwayListener>
    </Popper>

    </>)
}
