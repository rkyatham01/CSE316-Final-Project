import React from "react"
import Box from '@mui/material/Box'
import { Button } from "@mui/material"
import YoutubeComments from './YoutubeComments';
import { useState } from "react";
import YoutubePlayer from "./YoutubePlayer";

export default function YoutubeCombined() {
    const [set, setterFunc]= useState(false)

    const handlePlayer = () => {
        setterFunc(false)
    }

    const handleComments = () => {
        setterFunc(true)
    }

    return(
        <Box>
            <Button variant="contained" onClick={handlePlayer}>
                Player
            </Button>
            <Button variant="contained" onClick={handleComments}>
                Comments
            </Button>

            <Box sx={{mx:'auto'}}>
                <div style={ set ? {display: "inline"} : { display: "none" }}>
                    <YoutubeComments></YoutubeComments>
                </div>
                <div style={ set ? { display: "none"} : { display: "inline"}}>
                    <YoutubePlayer></YoutubePlayer>
                </div>
            </Box>

        </Box>

    )
}

    
