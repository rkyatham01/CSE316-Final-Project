import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import Box from '@mui/material/Box'
import List from '@mui/material/List';
import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid"
import NavBar from './NavBar'
import { useState } from "react";
import AuthContext from '../auth';
import MUIDeleteModal from './MUIDeleteModal'
import AddIcon from '@mui/icons-material/Add';
import { Fab, Paper } from '@mui/material';
import Typography from '@mui/material/Typography'
/*

/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/

const useStyles = makeStyles({ //could create styles here and insert them into main function 
    OuterBox: {
        width: '100',
    },

    OuterDiv: {

    }
});

const filterData = (query, data) => { //filters data
    // filter data that the search goes thru
  };

const newStyle = {
    width: 35,
    height: 10  
}

const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const classes = useStyles() //to use the styles within the component (invoking the hook)
    //const [searchQuery, setSearchQuery] = useState(""); //to import the searchQuery
    let data = []
    //const dataFiltered = filterData(searchQuery, data);

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    // let usersLists = []
    // if (auth.user){
    //     //Home Screen should only contain the signed in user's lists
    //     usersLists = store.lists.filter(list => list.owner == auth.user.username);
    // }

    function handleCreateNewList() {
        store.createNewList();
    }
    let listCard = "";
    if (store) {
        listCard = 
            <List sx={{ width: '100%', left: '0%' }}>
            {
                store.idNamePairs.map((pair) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                    />
                ))
            }
            </List>;
    }
    return (
        <Box
            className={classes.OuterBox} //outer Box
        >
        <div
            className={classes.OuterDiv}
        >
            
            <Grid container>
                <Grid item xs={12}>
                <NavBar></NavBar>
               </Grid>

                <Grid item xs={6}>
                    <div id="playlist-selector">

                    <div id="list-selector-list">
                        {
                            listCard
                        }
                        <MUIDeleteModal />
                    </div>
                    </div>
                </Grid>

                <Grid item xs={6}>
                    <div>
                        Yo2
                    </div>
                </Grid>

                <Grid item xs={5}></Grid>
                <Grid item xs={2}>
                <div id="list-selector-heading">
                    <Fab
                        style={newStyle}
                        color="primary" 
                        aria-label="add"
                        onClick={handleCreateNewList}
                    >
                        <AddIcon />
                    </Fab>
                        <Typography style={{fontSize: 25 }}
                         variant="h2">Your Lists</Typography>
                    </div>
                </Grid>
                <Grid item xs={5}></Grid>
            </Grid>
        </div>
        </Box>
        
        )
}
export default HomeScreen
