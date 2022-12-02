import React from "react"
import { autocompleteClasses, TextareaAutosize, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { borderRadius, padding, textAlign, width } from "@mui/system";

const useStyles = makeStyles({ //could create styles here and insert them into main function 
    playlistStyle: { //style for playlister header
        marginTop: 25,
        marginBottom: -10,
        fontSize: 55,
        fontWeight: 500,
        color: "#300000"
    },

    introTextStyle: {
        fontSize: 16,
        color: "#300000",
    },


    loginButton: {
        fontSize: 22,
        color: "#300000",
        border: "solid 3px blue",
        borderWidth: 1,
        width: 300,
        textAlign: "center",
    },

    registerButton: {
        fontSize: 22,
        color: "#300000"
    },

    guestLogin: {
        fontSize: 22,
        color: "#300000"
    },

    projectCredits: {
        marginTop: 22,
        fontSize: 13,
        color: "#300000",
        textAlign: "right",
        padding: 35
    }
});

export default function SplashScreen() {
    const classes = useStyles() //to use the styles within the component (invoking the hook)
    //returns object with all the styles on it

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
            An application whose primary focus is for creating, managing, and storing your fun and creative playlists!!!
            </Typography> 
            <div></div>
        <Stack spacing={1.0} 
        >
            <Button
            className={classes.loginButton}
            onClick={() => console.log("You have started to Log in")}

            >LOGIN            
            </Button>
            <div></div>

            <Button
            className={classes.registerButton}
            onClick={() => console.log("You have started to Register")}

            >REGISTER            
            </Button>
            <div></div>
        
            <Button
                className={classes.guestLogin}
                onClick={() => console.log("You are going to Continue as Guest")}

                >CONTINUE AS GUEST            
            </Button>

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

