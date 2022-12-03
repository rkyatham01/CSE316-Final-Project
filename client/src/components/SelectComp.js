// import { FormControl } from "@mui/material"
// import InputLabel from "@mui/material/InputLabel"
// import { Select } from "@mui/material"
// import { MenuItem } from "@mui/material"
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectComp() {
  return (
    <Box sx={{width: 180}}>
      <FormControl fullWidth size="small">
        <InputLabel id="demo-simple-select-label">Select</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
        >
          <MenuItem value={10}> None</MenuItem>
          <MenuItem value={20}> Name (Z-A) </MenuItem>
          <MenuItem value={30}> User (A-Z) </MenuItem>
          <MenuItem value={40}> User (Z-A) </MenuItem>
          <MenuItem value={50}>Publish Date (Newest)</MenuItem>
          <MenuItem value={60}>Publish Date (Oldest)</MenuItem>
          <MenuItem value={70}>Views</MenuItem>
          <MenuItem value={80}>Likes</MenuItem>
          <MenuItem value={90}>Dislikes</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
