import React, { useState } from 'react';
import {Container,
        makeStyles,
        Paper,
        Divider
} 
  from '@material-ui/core';

import Header from './header.jsx'
import ListView from './listView'

const useStyles = makeStyles((theme) => ({
  container: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));


const OrderList = () => {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Paper elevation={3}>
        <Header/>
      </Paper>
      <Divider/>
      <Paper>
        <ListView/>
      </Paper>

      

    </Container>
  )
    
};

export default OrderList;
