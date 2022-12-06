import YouTube from 'react-youtube';
import { Box } from '@mui/system';
import { Grid } from '@mui/material';
import { GlobalStoreContext } from "../store";
import { useContext, useState } from 'react';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import StopIcon from '@mui/icons-material/Stop';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import IconButton from '@mui/material/IconButton';

export default function YoutubePlayer() {
    // THIS IS THE INDEX OF THE SONG CURRENTLY IN USE IN THE PLAYLIST
    const { store } = useContext(GlobalStoreContext)
    const [currSongIndx, setNewSong] = useState(0);
    const [player, setPlayer] = useState("");

    let currentSong = 0;

    let playlist = []
    
    if (store.currentList){
        playlist = store.currentList.songs.map((song) => song.youTubeId);
    }

    const playerOptions = {
        height: '390',
        width: '550',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    };

    function stopVideo(){
        player.pauseVideo();
    }

    function nextSong() { 
        setNewSong(currSongIndx+1);
        setNewSong(currSongIndx % playlist.length);
        loadAndPlayCurrentSong(player);
    }

    // function prevSong() { 
    //     setNewSong(currSongIndx-1)
    //     setNewSong(currSongIndx % playlist.length);
    // }
    
    function prevSong() { 
        setNewSong(currSongIndx-1);
        setNewSong(currSongIndx % playlist.length);
        loadAndPlayCurrentSong(player);
    }

    // THIS FUNCTION LOADS THE CURRENT SONG INTO
    // THE PLAYER AND PLAYS IT
    function loadAndPlayCurrentSong(player) {
        let song = playlist[currentSong];
        player.loadVideoById(song);
        player.playVideo();
    }

    // THIS FUNCTION INCREMENTS THE PLAYLIST SONG TO THE NEXT ONE
    function incSong() {
        currentSong++;
        currentSong = currentSong % playlist.length;
    }

    function playVideoFunc() {
        player.playVideo();
    }

    function onPlayerReady(event) {
        loadAndPlayCurrentSong(event.target);
        event.target.playVideo();
        setPlayer(event.target)
    }

    // THIS IS OUR EVENT HANDLER FOR WHEN THE YOUTUBE PLAYER'S STATE
    // CHANGES. NOTE THAT playerStatus WILL HAVE A DIFFERENT INTEGER
    // VALUE TO REPRESENT THE TYPE OF STATE CHANGE. A playerStatus
    // VALUE OF 0 MEANS THE SONG PLAYING HAS ENDED.
    function onPlayerStateChange(event) {
        let playerStatus = event.data;
        let player = event.target;
        if (playerStatus === -1) {
            // VIDEO UNSTARTED
            console.log("-1 Video unstarted");
        } else if (playerStatus === 0) {
            // THE VIDEO HAS COMPLETED PLAYING
            console.log("0 Video ended");
            incSong();
            loadAndPlayCurrentSong(player);
        } else if (playerStatus === 1) {
            // THE VIDEO IS PLAYED
            console.log("1 Video played");
        } else if (playerStatus === 2) {
            // THE VIDEO IS PAUSED
            console.log("2 Video paused");
        } else if (playerStatus === 3) {
            // THE VIDEO IS BUFFERING
            console.log("3 Video buffering");
        } else if (playerStatus === 5) {
            // THE VIDEO HAS BEEN CUED
            console.log("5 Video cued");
            player.playVideo()
        }
    }

    if(store.currentList && store.currentList.songs.length !== 0 && playlist[currentSong] !== undefined){
        return(
          <Box>
            <YouTube
            videoId={playlist[currentSong].youTubeId}
            opts={playerOptions}
            onReady={onPlayerReady}
            onStateChange={onPlayerStateChange}        
            >
            </YouTube>

            <Box  sx={{ flexDirection: 'row', display: 'flex'}}>
                <IconButton onClick={prevSong} aria-label='backward-button'>
                    <SkipPreviousIcon style={{fontSize:'22pt'}} />
                </IconButton>

                <IconButton onClick={stopVideo} aria-label='stop'>
                    <StopIcon style={{fontSize:'22pt'}} />
                </IconButton>

                <IconButton onClick={playVideoFunc} aria-label='play'>
                    <PlayArrowIcon style={{fontSize:'22pt'}} />
                </IconButton>

                <IconButton onClick={nextSong} aria-label='forward-button'>
                    <SkipNextIcon style={{fontSize:'22pt'}} />
                </IconButton>
            </Box>
        </Box>
        )
    }
    return (<div>
    No Playlist is Selected Currently
    </div>)
}

