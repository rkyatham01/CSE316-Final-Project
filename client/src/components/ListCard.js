import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import { makeStyles } from "@mui/styles";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import React from 'react';
import { List } from '@mui/material';
import SongCard from './SongCard';
import EditToolbar from './EditToolbar'
import AuthContext from '../auth';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MUIEditSongModal from './MUIEditSongModal';
import MUIErrorModal from './MUIErrorModal';
import MUIRemoveSongModal from './MUIRemoveSongModal';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import { getPlaylistById, getPlaylistPairs } from '../store/store-request-api';

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/

const useStyles = makeStyles({ //could create styles here and insert them into main function 

    NonpublishedCss: {

    }

});

function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const { idNamePair, selected } = props;
    const { auth } = useContext(AuthContext);
    const classes = useStyles() //to use the styles within the component (invoking the hook)
    const [nullOrOpenPlaylist, settingPlaylist] = useState(false)
    const [validOrNot, setter] = useState(false); //for CSS

    const [publishOrNot, setterForPublish] = useState(false); //for publish

    function handleLoadList(event, id) {
             store.setCurrentList(idNamePair)
            // CHANGE THE CURRENT LIST
        }
    
    function publishPlaylist(){
       store.updatePlaylistPublished()
    }

      //set it to a color, set the buttons, (keep duplicate and delete)
    
        //render based on publish or not
        //set the 2 other screens
        
        //filter the store.idnamepairs, pass that published lists into the other 2 screens

    let editToolbar = "";
    if (auth.loggedIn) {
        if (store.currentList) {
            editToolbar = <EditToolbar />;
        }
    }
    <Box sx={{ flexGrow: 1 }}>{editToolbar}</Box>

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }
    
    async function handleDeleteList(event, id) {
        event.stopPropagation();
        let _id = event.target.id;
        _id = ("" + _id).substring("delete-list-".length);
        store.markListForDeletion(id);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            store.changeListName(id, text);
            toggleEdit();
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }

    let selectClass = "unselected-list-card";
    if (selected) {
        selectClass = "selected-list-card";
    }

    let modalJSX = "";
    if (store.isEditSongModalOpen()) {
        modalJSX = <MUIEditSongModal />;
    }
    else if (store.isRemoveSongModalOpen()) {
        modalJSX = <MUIRemoveSongModal />;
    }

    let cardStatus = false;
    if (store.isListNameEditActive) {
        cardStatus = true;
    }

    function EditPlaylistName(event) {
        if (event.detail==2){
            handleToggleEdit(event)
          }
    }

    function handleAddNewSong() {
        store.addNewSong();
    }
    function handleUndo() {
        store.undo();
    }
    function handleRedo() {
        store.redo();
    }
    function handleClose() {
        store.closeCurrentList();
    }

    function deletePlaylist(event) {
        handleDeleteList(event, store.currentList._id);
    }

    let shouldDrop = (store.currentList !== null) && (store.currentList._id == idNamePair._id)

    function settingFunction(){
        store.setCurrentList(idNamePair);
    }
    
    function CreateDupPlaylist(){
        store.createDupList(idNamePair);
    }

    function handlerClose(){
        store.closeCurrentList();
    }

    function ClosesOtherOne(){
        store.setCurrentPLaylis(idNamePair);
    }

    let expandedElement = ""

    if(shouldDrop){
    expandedElement = <>
    <Box sx={{ flexDirection: 'column'}}>
    <Box id ='song-cards-container' sx = {{overflowY:'auto', maxHeight: 250}}>
      <List 
          id="playlist-cards" 
          sx={{ width: '100%', bgcolor: 'background.paper', height:'%5' }}
      >
          {
              idNamePair.songs.map((song, index) => (
                  <SongCard
                      id={'playlist-song-' + (index)}
                      key={'playlist-song-' + (index)}
                      index={index}
                      song={song}
                  />
              ))  
          }
      </List>
   </Box>

   {modalJSX}
   <Box sx={{ flexDirection: 'row',  display: 'flex', gap:2, paddingTop:1}}>
      <Button variant="contained"
          disabled={!store.canAddNewSong()}
          onClick={handleAddNewSong}
      sx={{backgroundColor:"goldenrod"}} size="small">Add</Button>
      <Button variant="contained" sx={{backgroundColor:"goldenrod"}} size="small"
          id='add-song-button'
          disabled={!store.canUndo()}
          onClick={handleUndo}
      >Undo</Button>
      <Button variant="contained" sx={{backgroundColor:"goldenrod"}}  size="small"
          disabled={!store.canRedo()}
          onClick={handleRedo}
      >Redo</Button>
      <Button variant="contained" sx={{backgroundColor:"goldenrod"}}  size="small"
      onClick={deletePlaylist}
      >Delete</Button>
      <Button variant="contained" sx={{backgroundColor:"goldenrod"}} onClick={publishPlaylist} size="small">Publish</Button>
      <Button variant="contained" sx={{backgroundColor:"goldenrod"}} onClick={CreateDupPlaylist} size="small">Duplicate</Button>
   </Box>

   <Box sx={{ flexDirection: 'row', display: 'flex', gap:'30%', paddingTop:2}}>
      <Typography>Published: {store.currentList.publish.publishDate} </Typography>
      <Typography> Listens: Insert Number </Typography>
   </Box>
   </Box>
   </>
 }

 if (store.currentList && store.currentList.publish.isPublished === true && expandedElement !== ""){
    expandedElement = <>
    <Box sx={{ flexDirection: 'column'}}>
    <Box id ='song-cards-container' sx = {{overflowY:'auto', maxHeight: 250}}>
      <List 
          id="playlist-cards" 
          sx={{ width: '100%', bgcolor: 'background.paper', height:'%5' }}
      >
          {
              idNamePair.songs.map((song, index) => (
                  <SongCard
                      id={'playlist-song-' + (index)}
                      key={'playlist-song-' + (index)}
                      index={index}
                      song={song}
                  />
              ))  
          }
      </List>
   </Box>

   {modalJSX}
   <Box sx={{ flexDirection: 'row',  display: 'flex', gap:2, paddingTop:1}}>
      <Button variant="contained" sx={{backgroundColor:"goldenrod"}}  size="small"
      onClick={deletePlaylist}
      >Delete</Button>
      <Button variant="contained" sx={{backgroundColor:"goldenrod"}} onClick={CreateDupPlaylist} size="small">Duplicate</Button>
   </Box>

   <Box sx={{ flexDirection: 'row', display: 'flex', gap:'30%', paddingTop:2}}>
      <Typography>Published: {store.currentList.publish.publishDate} </Typography>
      <Typography> Listens: Insert Number </Typography>
     </Box>
   </Box>
   </>
 }

    let cardElement =

    <Box style={idNamePair.publish && idNamePair.publish.isPublished ? {backgroundColor: 'red'} : {}}>
        <ListItem 
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{ marginTop: '15px', display: 'flex', p: 1, bgcolor:'#F1E5AC'}}
            style={{ width: '100%', fontSize:'48pt'}}
            button
            onDoubleClick={ClosesOtherOne}
            >

            <Box sx={{ p: 1, flexGrow: 1 }}>
                <Box sx={{fontSize:30}}>
                    <div onClick={EditPlaylistName}>
                        {idNamePair.name}
                    </div>
                </Box>
                <Box sx = {{fontSize:20}}>
                    by {idNamePair.username}
                </Box>
            </Box>
            
            <Box sx={{ p: 1 }}>
                <IconButton onClick={handleToggleEdit} aria-label='like'>
                    <ThumbUpIcon style={{fontSize:'25pt'}} />
                </IconButton>
            </Box>

            <Box sx={{ p: 1 }}>
                <IconButton onClick={handleToggleEdit} aria-label='dislike'>
                    <ThumbDownIcon style={{fontSize:'25pt'}} />
                </IconButton>
            </Box>

            <Box sx={{ p: 1 }}>
                <IconButton onClick={handleToggleEdit} aria-label='edit'>
                    <EditIcon style={{fontSize:'25pt'}} />
                </IconButton>
            </Box>

            <Box sx={{ p: 1 }}>
                <IconButton 
                 aria-label='upOrDown'>
                    {!shouldDrop ? <KeyboardDoubleArrowDownIcon onClick={settingFunction} style={{fontSize:'25pt'}}> </KeyboardDoubleArrowDownIcon> : <KeyboardDoubleArrowUpIcon onClick={handlerClose} style={{fontSize:'25pt'}}> </KeyboardDoubleArrowUpIcon>}
                </IconButton>
            </Box>            
          </ListItem>
          {expandedElement}
    </Box>

    if (editActive) {
        cardElement =
            <TextField
                margin="normal"
                required
                fullWidth
                id={"list-" + idNamePair._id}
                label="Playlist Name"
                name="name"
                autoComplete="Playlist Name"
                className='list-card'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={idNamePair.name}
                inputProps={{style: {fontSize: 18}}}
                InputLabelProps={{style: {fontSize: 18}}}
                autoFocus
            />
    }

    return (
        cardElement
    );
}

export default ListCard;