import React, { useState } from 'react';
import {IconButton,
  TextField,
  makeStyles} 
  from '@material-ui/core';

import SearchIcon from '@material-ui/icons/Search';


const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

const Header = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TextField id="outlined-basic" label="单号" variant="outlined" size="small"/>
      <IconButton color="primary" aria-label="add to shopping cart">
        <SearchIcon />
      </IconButton>
    </div>
  )
    
};

export default Header;