import React, { useContext, useState } from 'react';
import { AppBar } from '@mui/material';
import { Button } from '@mui/material';
import { IconButton } from '@mui/material';
import { makeStyles } from "@mui/styles";
import { Toolbar } from '@mui/material';
import { Typography } from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import { red } from '@mui/material/colors';
import { height } from '@mui/system';

const useStyles = makeStyles({
    navBarStyle: {
        background: red,
        height:50
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
    <AppBar position="static" className={classes.navBarStyle}>
      <Toolbar>
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

      </Toolbar>
    </AppBar>
  );
};

export default Navbar;