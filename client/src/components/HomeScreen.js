import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import Box from '@mui/material/Box'
import List from '@mui/material/List';
import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid"
import NavBar from './NavBar'
import { useState } from "react";

/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/

const useStyles = makeStyles({ //could create styles here and insert them into main function 
    OuterBox: {
        overflow: "auto",
        width: '100',
    },

    OuterDiv: {

    }
});

const filterData = (query, data) => { //filters data
    // filter data that the search goes thru
  };


const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const classes = useStyles() //to use the styles within the component (invoking the hook)
    const [searchQuery, setSearchQuery] = useState(""); //to import the searchQuery
    let data = []
    const dataFiltered = filterData(searchQuery, data);

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }
    let listCard = "";
    if (store) {
        listCard = 
            <List sx={{ width: '90%', left: '5%', bgcolor: 'background.paper' }}>
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
            
            <Grid container spacing={1}>

               <NavBar></NavBar>

                <Grid item xs={6}>
                    <div>
                        Yo
                    </div>
                </Grid>

                <Grid item xs={6}>
                    <div>
                        Yo2
                    </div>
                </Grid>
                
            </Grid>

        </div>
        </Box>
        )
}
export default HomeScreen
