import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';

function CommentCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const { comment, user } = props;

    return (
        <div className='list-card2'>
            <span>User: {props.user}</span> 
            <br></br>
            <span>Comment: {props.comment}</span>
        </div>
    );
}

export default CommentCard;