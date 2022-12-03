import React, { useState } from 'react';
import { AppBar } from '@mui/material';
import { IconButton } from '@mui/material';
import { makeStyles } from "@mui/styles";
import { Toolbar } from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SearchBar from './SearchBar';

const useStyles = makeStyles({
    navBarStyle: {
        backgroundColor: 'lightblue',
        width: "100%",
    }

});

const Navbar = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <AppBar position="static" className={classes.navBarStyle}
    >
      <Toolbar
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="home"
        >
        <HomeOutlinedIcon/>
        </IconButton>

        <IconButton
          edge="start"
          color="inherit"
          aria-label="groupPeople"
        >
        <GroupsOutlinedIcon/>
        </IconButton>

        <IconButton
          edge="start"
          color="inherit"
          aria-label="groupPeople"
        >
        <PersonOutlinedIcon/>
        </IconButton>

        <SearchBar></SearchBar>

      </Toolbar>
    </AppBar>
  );
};

export default Navbar;