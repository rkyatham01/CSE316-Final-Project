import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'
import Box from '@mui/material/Box'
import AddIcon from '@mui/icons-material/Add';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography'
import { makeStyles } from "@mui/styles";
import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Grid"
import NavBar from './NavBar'
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/

const useStyles = makeStyles({ //could create styles here and insert them into main function 
    OuterBox: {
        overflow: "auto",
        width: '96.8%',
        left: '1.6%',
    },

    OuterDiv: {

    }
});


const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const classes = useStyles() //to use the styles within the component (invoking the hook)

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

                <Grid item xs={12}>
                    <div>
                    <NavBar></NavBar>
                    </div>
                </Grid>

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

//     <div id="splash-screen">
//         <Typography //typography is used for text custom css
//             className={classes.playlistStyle} //gonna apply properties
//             variant="h2"
//         >
// /* <div id="list-selector-list">
// {
//     listCard
// }
// <MUIDeleteModal />
// </div> */ 
// // { <div id="list-selector-heading">
// // <Fab 
//     color="primary" 
//     aria-label="add"
//     id="add-list-button"
//     onClick={handleCreateNewList}
// >
//     <AddIcon />
// </Fab>
//    <Typography variant="h2">Your Lists</Typography>
// </div>