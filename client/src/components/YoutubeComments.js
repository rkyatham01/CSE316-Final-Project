import YoutubePlayer from "./YoutubePlayer";
import YoutubeCombined from "./YoutubeCombined"
import { useContext } from "react";
import AuthContext from "../auth";
import { TextField } from "@mui/material";
import List from '@mui/material/List'
import CommentCard from './CommentCard'
import Box from '@mui/material/Box'
import { GlobalStoreContext } from "../store";
import { useState } from "react";

export default function YoutubeComments() {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const  [value, setValue ] = useState("");

    const changeHandler = e => {
        setValue(e.target.value);
    }

    let user = "";

    if (auth.user){
        user = auth.user.username;
    } else{
        user="";
    }

    let comments = "";
    if (store.newListForPlaying) { 
        comments = store.newListForPlaying.comments;
    }else{
        comments = "";
    }

    function handlesPressedKeys(e) {
        if (e.key === "Enter"){
            let thenewCommentText = e.target.value; //targets a text field, value refers to what it in 
            setValue(""); //resets the input box
            store.newListForPlaying.comments.push( {user: user, comment: thenewCommentText})
            store.updateNewListForPlaying();
        };
    }
    
    let list=<div> Default, No list Selected </div>

    if (user !== ""){
        if(store.newListForPlaying){
            list = 
            <div>
                <List
                sx={{width: '100%', bgcolor: 'lightgoldenrodyellow', height: '%50'}}>
                {
                    store.newListForPlaying.comments.map((usr, index) => {
                        return(<CommentCard
                            comment={usr.comment}
                            user={usr.user}
                            key={index}
                        ></CommentCard>)
                    })
                }
                </List>
                
            <Box textAlign='center' sx={{border: 1}}>
                <TextField value={value} onKeyPress={handlesPressedKeys} onChange={changeHandler} fullWidth label='Comment here!'> </TextField>
            </Box>
        </div>
         }
     }
    return (
       <Box id='song-cards-container' sx={{overflowY: 'auto', maxHeight: 300}}> 
            {list}
       </Box>
    );
}
