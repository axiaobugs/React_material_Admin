import React, { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  List,
  ListItem,
  Typography,
  makeStyles,
  Collapse
} from '@material-ui/core';
import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon
} from 'react-feather';
import NavItem from './NavItem';
import { ExpandLess, ExpandMore } from '@material-ui/icons'

import items from '../../../config/menulist'

const user = {
  avatar: '/static/images/avatars/avatar_5.png',
  jobTitle: '首席电焊工',
  name: '方言啸'
};

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  },
  subItem:{
    paddingLeft:'30px'
  }
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();
  const [open, setOpen] = React.useState(false)
  const handleClick = () => {
    setOpen(!open)
}
  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        p={2}
      >
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={user.avatar}
          to="/app/account"
        />
        <Typography
          className={classes.name}
          color="textPrimary"
          variant="h5"
        >
          {user.name}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {user.jobTitle}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {items.map(({title,href,icon,children:subItems}) => {
            if(!subItems){
              return (
                <ListItem>
                   <NavItem
                    href  = {href}
                    key   = {title}
                    title = {title}
                    icon  = {icon}
                  />
                </ListItem>
               
              )
            }else if(subItems){
              return(
                <React.Fragment key={title}>           
                  <ListItem >
                    <NavItem
                    href  = {href}
                    key   = {title}
                    title = {title}
                    icon  = {icon}
                    onClick = {handleClick}                  
                    >
                    </NavItem>
                    {open?<ExpandLess/>:<ExpandMore/>}
                  </ListItem>  
                  {/* TODO:  多个二级菜单时 如何添加状态控制折叠?*/}                
                  <Collapse in={open} timeout='auto' mountOnEnter unmountOnExit>
                    <List >
                      {subItems.map((subItem)=>{
                      return(
                        <NavItem
                        href  = {subItem.href}
                        key   = {subItem.title}
                        title = {subItem.title}
                        icon  = {subItem.icon}
                        className={classes.subItem}
                        
                        />
                        )                       
                      })}
                    </List>                   
                  </Collapse>
                </React.Fragment>
                
              ) 
            }
            
          })}
        </List>
      </Box>
      
      
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default NavBar;
