import React from "react"
import Box from '@mui/material/Box'
import { Button } from "@mui/material"
import YoutubeComments from './YoutubeComments';
import { useState } from "react";
import YoutubePlayer from "./YoutubePlayer";

export default function YoutubeCombined() {
    const [changeSet, setterFunc]= useState(false)

    const handleplyr = () => {
        setterFunc(false)
    }

    const handleCmments = () => {
        setterFunc(true)
    }
    
    return(
        <Box>
            <Button variant="contained" onClick={handleplyr}>
                Player
            </Button>
            <Button variant="contained" onClick={handleCmments}>
                Comments
            </Button>

            <Box sx={{mx:'auto'}}>
                <div style={ changeSet ? {display: "inline"} : { display: "none" }}>
                    <YoutubeComments></YoutubeComments>
                </div>
                <div style={ changeSet ? { display: "none"} : { display: "inline"}}>
                    <YoutubePlayer></YoutubePlayer>
                </div>
            </Box>

        </Box>

    )
}

    
