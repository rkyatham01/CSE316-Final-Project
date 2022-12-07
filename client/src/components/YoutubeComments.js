import YoutubePlayer from "./YoutubePlayer";
import YoutubeCombined from "./YoutubeCombined"
import { GlobalStoreContext } from "../store";
import { useContext } from "react";
import AuthContext from "../auth";
import { TextField } from "@mui/material";
import List from '@mui/material/List'
import CommentCard from './CommentCard'
import Box from '@mui/material/Box'
import { GlobalStoreActionType } from "../store";
import { useState } from "react";

export default function YoutubeComments() {
    const { store } = useContext(GlobalStoreActionType);
    const { auth } = useContext(AuthContext);
    const  [value, setValue ] = useState("");
    

    // const handleChange = e => {
    //     setValue(e.target.value);
    // }

    // function handleKeyPress(e) {
    //     if (e.code === "Enter comment"){
    //         let newCommentText = e.target.value; //geting new comment
    //         let newComment = {user: user, comment: newCommentText};
    //         setValue("");
    //         store.currentList.comments.push(newComment)
    //         store.updateCurrentList();
    //     };
    // }

    // let comments = "";
    // if (store.currentList) { 
    //     comments = store.currentList.comments;
    // }
    // let user="";
    // if (auth.user){
    //     user = auth.user.userName;
    // }

    // let list=<div> NO List Selected! </div>
    // if (user !== ""){
    //     if(comments.length != 0){
    //         list = 
    //         <div>
    //             <List
    //             id="playlist-cards"
    //             sx={{width: '100%', bgcolor: 'background.paper', height: '%5'}}>
    //             {
    //                 comments.map((el, index) => {
    //                     <CommentCard
    //                         comment={el.comment}
    //                         user={el.user}
    //                         index={index}
    //                     ></CommentCard>
    //                 })
    //             }
    //             </List>
    //         <Box textAlign='center'>
    //             <TextField value={value} onKeyPress={handleKeyPress} onChange={handleChange} fullWidth label='Comment here!'> </TextField>
    //         </Box>
    //     </div>
    //     }
    //     else{
    //         list=<div> No Comments Yet! </div>
    //     }
    // }
    return (
       <Box id='song-cards-container' sx={{overflowY: 'auto', maxHeight: 250}}>
        {/* {list} */}
       </Box>
    );
}
