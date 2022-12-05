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
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionDetails from '@mui/material/AccordionDetails';
import Button from '@mui/material/Button';
import MUIEditSongModal from './MUIEditSongModal';
import MUIErrorModal from './MUIErrorModal';
import MUIRemoveSongModal from './MUIRemoveSongModal';


/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/

const useStyles = makeStyles({ //could create styles here and insert them into main function 

});

function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const [validOrNot, setter] = useState(false);
    const { idNamePair, selected } = props;
    const { auth } = useContext(AuthContext);
    const classes = useStyles() //to use the styles within the component (invoking the hook)

    function handleLoadList(event, id) {
        console.log("handleLoadList for " + id);
        if (!event.target.disabled) {
            let _id = event.target.id;
            if (_id.indexOf('list-card-text-') >= 0)
                _id = ("" + _id).substring("list-card-text-".length);

            console.log("load " + event.target.id);
            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
        }
    }

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
    //expandActive && store.currentList && (store.currentList._id == idNamePair._id
    function setCurrentListHandlr() {
        store.setCurrentList(idNamePair._id)
    }

    let cardElement =
    <div>
        <Accordion>
        <AccordionSummary
        expandIcon={<ExpandMoreIcon
        onClick={(event) => {
            setCurrentListHandlr()
        }}
        />}

        aria-controls="panel1a-content"
        id="panel1a-header"
        >
        <ListItem 
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{ marginTop: '15px', display: 'flex', p: 1, bgcolor:'#F1E5AC'}}
            style={{ width: '100%', fontSize:'48pt'}}
            button
            onClick={(event) => {
                handleLoadList(event, idNamePair._id)
            }}
        >   
            <Box sx={{ p: 1, flexGrow: 1 }}>
                <Box sx={{fontSize:30}}>
                {idNamePair.name}
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
          </ListItem>
          </AccordionSummary>
          <AccordionDetails>
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
            
            >Delete</Button>
            <Button variant="contained" sx={{backgroundColor:"goldenrod"}} size="small">Publish</Button>
            <Button variant="contained" sx={{backgroundColor:"goldenrod"}} size="small">Duplicate</Button>
         </Box>

         <Box sx={{ flexDirection: 'row', display: 'flex', gap:'30%', paddingTop:2}}>
            <Typography>Published: Insert Data</Typography>
            <Typography> Listens: Insert Number </Typography>
         </Box>

         </AccordionDetails>
        </Accordion>
    </div>


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