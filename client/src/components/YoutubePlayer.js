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
import Typography from '@mui/material/Typography';

export default function YoutubePlayer() {
    // THIS IS THE INDEX OF THE SONG CURRENTLY IN USE IN THE PLAYLIST
    const { store } = useContext(GlobalStoreContext)
    const [youTubePlayer, setPlayer] = useState();

    let playlist = []
    if (store.newListForPlaying){
        playlist = store.newListForPlaying.songs
    }

    if (store.newListForPlaying && playlist.length!=0){

    let currSongIndx = 0
    const playerOptions = {
        height: '230',
        width: '400',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    };
    
    function pauseSong() {
        youTubePlayer.pauseVideo();
    }

    function playSong() {
        youTubePlayer.playVideo();
    }

    function loadAndPlayCurrentSong(player) {
            let song = playlist[currSongIndx].youTubeId;
            player.loadVideoById(song);
            player.playVideo();
    }

    function incSong() { 
            currSongIndx = currSongIndx + 1
            if (currSongIndx >= playlist.length){
                currSongIndx = playlist.length-1
            }
       }

    function nextSongBut() {
            currSongIndx = currSongIndx + 1
            if (currSongIndx >= playlist.length){
                currSongIndx = playlist.length-1
            }
        loadAndPlayCurrentSong(youTubePlayer);
    }

    function prevSongBut() {
            currSongIndx = currSongIndx - 1
            if (currSongIndx <= 0){
                currSongIndx = currSongIndx=0 //force sets it to 0 if this happens
        }
        loadAndPlayCurrentSong(youTubePlayer);
    }


    function onPlayerReady(event) {
        loadAndPlayCurrentSong(event.target);
        event.target.playVideo();
        setPlayer(event.target);
    }
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
            player.playVideo();
        }
    }

    if (playlist.length != 0 && store.newListForPlaying){ //play and display only if valid
        return(
          <Box>
            <Box>
            <YouTube
            videoId={playlist[currSongIndx].youTubeId}
            opts={playerOptions}
            onReady={onPlayerReady}
            onStateChange={onPlayerStateChange}></YouTube>    
            <Typography sx={{fontsize:18}}> Now Playing: </Typography> 
            </Box>

            <Box>
                <Typography sx={{fontSize:10}}> Playlist: {store.newListForPlaying.name} </Typography>
                <Typography sx={{fontSize:10}}> Song #: {currSongIndx} </Typography>
                <Typography sx={{fontSize:10}}> Title: {store.newListForPlaying.songs[currSongIndx].title} </Typography>
                <Typography sx={{fontSize:10}}> Artist: {store.newListForPlaying.songs[currSongIndx].artist} </Typography>
            </Box>

            <Box  sx={{ flexDirection: 'row', display: 'flex'}}>
                <IconButton onClick={prevSongBut} aria-label='backward-button'>
                    <SkipPreviousIcon style={{fontSize:'15pt'}} />
                </IconButton>

                <IconButton onClick={pauseSong} aria-label='stop'>
                    <StopIcon style={{fontSize:'15pt'}} />
                </IconButton>

                <IconButton onClick={playSong} aria-label='play'>
                    <PlayArrowIcon style={{fontSize:'15pt'}} />
                </IconButton>

                <IconButton onClick={nextSongBut} aria-label='forward-button'>
                    <SkipNextIcon style={{fontSize:'15pt'}} />
                </IconButton>
            </Box>
        </Box>
        )
      }
    }
    return (
        <div> No Player Currently Playing! </div>
    )
}