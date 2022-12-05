import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import { makeStyles } from "@mui/styles";
import { border, borderRadius, height, maxWidth, padding, sizeWidth } from '@mui/system';
import { blue, lightBlue } from '@mui/material/colors';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import React from 'react';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { Hidden, List } from '@mui/material';
import SongCard from './SongCard';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import EditToolbar from './EditToolbar'
import AuthContext from '../auth';
import Stack from '@mui/system/Stack';
import EditSharpIcon from '@mui/icons-material/EditSharp';

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/

const useStyles = makeStyles({ //could create styles here and insert them into main function 
    ListCardCss: {
        border: "1px solid black", 
        borderRadius: "1px",
        backgroundColor: lightBlue,
        height: "15%",
        maxHeight: "15%",
        width: "100%",
        fontsize: "20pt", 
        marginLeft: "5%",
        marginBottom: "2%",
        background: 'linear-gradient(to bottom right,  #F0E69D, #FAFAD2)'
    },
    
    ListCardCss2: {
        border: "1px solid black", 
        borderRadius: "1px",
        height: "35%",
        width: "100%",
        marginLeft: "5%",
        marginBottom: "5%",
        background: 'linear-gradient(to bottom right,  #F0E69D, #FAFAD2)',
        paddingBottom: '70%'
    },

    SongCardsStyle: {
        display: 'flex'
    },
    
    songCards: {
        display: 'flex',
    },

    songNoneHide: {
        position:'absolute',
        left:'0%',
        width:'100%',
        maxHeight: '65%',
        flexDirection: 'column',
        overflow:'scroll',
        background: 'transparent',
    }, 

    songHide: {
        display:'none'
    }
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

    // let selectClass = "unselected-list-card";
    // if (selected) {
    //     selectClass = "selected-list-card";
    // }

    let cardStatus = false;
    if (store.isListNameEditActive) {
        cardStatus = true;
    }    
    let songcards = ""
    if (store.currentList !== null && store.currentListid == idNamePair._id){
        songcards = 
            <Box className = {validOrNot ? classes.songNoneHide : classes.songHide}>
                <List>
                    {
                        store.currentList.songs.map((song, index) => (
                            <SongCard
                                className={classes.songCards}
                                id={'playlist-song-' + (index)}
                                key={'playlist-song-' + (index)}
                                index={index}
                                song={song}
                            />
                        ))           
                    }
                
                </List>  
            </Box>
    }
    let cardElement =
        <ListItem 
            className = {validOrNot ? classes.ListCardCss2 : classes.ListCardCss}
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{ marginTop: '0px', display: 'flex', p: 1 }}
            style={{ width: '90%', fontSize: '15pt'}}
            button
            // onClick={(event) => {
            //     handleLoadList(event, idNamePair._id)
            // }}
        >
        <Stack spacing={3}>
            <Box sx={{display: 'flex', flexDirection: 'row'}}>
                
                <Box sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}</Box>
                <Box>
                    By 
                </Box>

                <Box >
                    <IconButton>
                    <ThumbUpIcon></ThumbUpIcon>
                    </IconButton>
                </Box>

                <Box >
                    <IconButton>
                    <ThumbDownIcon></ThumbDownIcon>
                    </IconButton>
                </Box>

                <Box >
                    <IconButton
                    onClick={(event) => {
                        setter(true) //setter is function that sets variable or boolean (UseState)
                        store.setCurrentList(idNamePair._id)
                    }}
                    >
                    <KeyboardDoubleArrowDownIcon></KeyboardDoubleArrowDownIcon>
                    </IconButton>
                </Box>
                <Box >       
                <IconButton
                onClick={(event) => {
                    setter(false) //setter is function that sets variable or boolean (UseState)
                }}
                >
                <KeyboardDoubleArrowUpIcon></KeyboardDoubleArrowUpIcon>
                </IconButton>
                </Box>
                
                <Box sx={{ p: 1 }}>
                <IconButton onClick={handleToggleEdit} aria-label='edit'>
                    <EditIcon style={{fontSize:'13pt'}} />
                </IconButton>
            </Box>
            <Box sx={{ p: 1 }}>
                <IconButton onClick={(event) => {
                        handleDeleteList(event, idNamePair._id)
                    }} aria-label='delete'>
                    <DeleteIcon style={{fontSize:'13pt'}} />
                </IconButton>
            </Box>
            by {idNamePair.username}
            </Box>
            {songcards}
            <Box sx={{ p: 1 }}>
                
                <IconButton onClick={(event) => {
                   //     handleedit(event, idNamePair._id)
                    }} aria-label='edit'>
                    <EditSharpIcon style={{fontSize:'13pt'}} />
                </IconButton>
            </Box>

        </Stack>
        </ListItem>

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