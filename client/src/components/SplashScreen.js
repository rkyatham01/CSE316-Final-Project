import React from "react"
import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useContext, useState } from 'react';
import { GlobalStoreContext } from '../store'
import { useHistory } from "react-router-dom";

const HeadToRegister = () => {
    window.location.href = '/register/';
}

const HeadToLogIn = () => {
    window.location.href = '/login/';
};

const useStyles = makeStyles({ //could create styles here and insert them into main function 
    playlistStyle: { //style for playlister header
        fontSize: 55,
        fontWeight: 500,
        color: "#300000",
        marginTop: 25,
        marginBottom: -20
    },

    introTextStyle: {
        fontFamily: "cursive",
        fontSize: 17,
        color: "#300000",
    },

    loginButton: {
        fontSize: 22,
        color: "#300000",
        border: "solid 3px black",
        borderWidth: 1,
        width: 300,
        background: "#ff8c00"
    },

    registerButton: {
        fontSize: 22,
        color: "#300000",
        border: "solid 3px black",
        borderWidth: 1,
        width: 300,
        background: "#ff8c00"
    },

    guestLogin: {
        fontSize: 22,
        color: "#300000",
        border: "solid 5px black",
        background: "#ff8c00",
        borderWidth: 1,
        width: 300,
        marginTop:7
    },

    projectCredits: {
        fontFamily: "cursive",
        fontSize: 13,
        color: "#300000",
        textAlign: "right",
        padding: 30
    }
});

export default function SplashScreen() {
    const { store } = useContext(GlobalStoreContext);
    const classes = useStyles() //to use the styles within the component (invoking the hook)
    //returns object with all the styles on it
    const history = useHistory()

    return (
        <div id="splash-screen">
            <Typography //typography is used for text custom css
                className={classes.playlistStyle} //gonna apply properties
                variant="h2"
            >
            Playlister
            </Typography> 

            <Typography //typography is used for text custom css
                className={classes.introTextStyle} //gonna apply properties
                variant="p"
            >
            An application whose primary focus is for creating, managing, and storing your fun and creative playlists
            </Typography> 
            <div></div>
        <Stack spacing={2.0} 
        >
            <Box //Wwrap it in a box and give it justifyContent center or wherever you want to place it
                m={1} //margin
                display="flex"
                justifyContent="center"
                alignItems="center">
            <Button
            className={classes.loginButton}
            onClick={HeadToLogIn}
            >LOGIN            
            </Button>
            <div></div>
            </Box>

            <Box //Wrap it in a box and give it justifyContent center or wherever you want to place it
                m={1} //margin
                display="flex"
                justifyContent="center"
                alignItems="center">
                <Button
                className={classes.registerButton}
                onClick={HeadToRegister}
                >REGISTER            
                </Button>
                <div></div>
            </Box>
        
            <Box //Wwrap it in a box and give it justifyContent center or wherever you want to place it
                m={1.0} //margin
                display="flex"
                justifyContent="center"
                alignItems="center">
                <Button
                    className={classes.guestLogin}
                    onClick={() => console.log("You are going to Continue as Guest")}

                    >CONTINUE AS GUEST            
                </Button>
            </Box>

            <Typography //typography is used for text custom css
                className={classes.projectCredits} //gonna apply properties
                variant="p"
            >
            Created by Rishith Kyatham
            </Typography> 
         </Stack>
        </div>

    )
}

