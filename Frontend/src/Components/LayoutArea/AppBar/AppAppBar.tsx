import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import AppBar from './AppBar';
import Menu from "../Menu/Menu";
import Toolbar from '@material-ui/core/Toolbar';
import store from '../../../Redux/Store';
import UserModel from '../../Models/UserModel';
import { userIsLoggedOut } from '../../../Services/GlobalFunctions';
import { NavLink } from 'react-router-dom';
import { Unsubscribe } from 'redux';

const toolbarStyles = (theme) => ({
  root: {
    height: 64,
    [theme.breakpoints.up('sm')]: {
      height: 70,
    },
  },
});

const styles = (theme) => ({
  title: {
    fontSize: 24,
  },
  placeholder: toolbarStyles(theme).root,
  toolbar: {
    justifyContent: 'space-between',
  },
  left: {
    flex: 1,
  },
  leftLinkActive: {
    color: theme.palette.common.white,
  },
  right: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  rightLink: {
    fontSize: 24,
    color: theme.palette.common.white,
    marginLeft: theme.spacing(3),
  },
  linkSecondary: {
    color: theme.palette.secondary.main,
  },
});
//Show Header links and user name 
function AppAppBar(props) {

  const { classes } = props;

  const userStateArray = useState<UserModel>();
  const setTypes = userStateArray[1];

  // // "componentDidMount"
  useEffect(() => {
    const unsubscribe: Unsubscribe = store.subscribe(() => {
      const user = store.getState().usersState.user;
      setTypes(user);
    })
    return unsubscribe;
  });
  //Links if user is not login show dose links
  const login =
    < div className={classes.right} >
      <NavLink color="inherit" className={classes.rightLink} to={"/login"} >
        {'Sign In'}
      </NavLink>
      <NavLink className={clsx(classes.rightLink, classes.linkSecondary)} to={"/register"} >
        {'Sign Up'}
      </NavLink>
    </div >;
  //Links if user is login show dose links
  const logout = < div className={classes.right} >
    <NavLink onClick={userIsLoggedOut} className={classes.rightLink} to={"/home"} >
      {'Logout'}
    </NavLink>
  </div >;

  return (
    <div>
      <AppBar>
        <Toolbar className={classes.toolbar}>
          <div className="Left">
            <span>{store.getState().usersState.userIsLoggedIn ? `Hello ${store.getState().usersState.user.firstName}  ${store.getState().usersState.user.lastName}` : 'Hello Gest'}</span>
          </div>
          <div className="Center">
            {<Menu />}
          </div>
          <div className="Right">
            {store.getState().usersState.userIsLoggedIn ? logout : login}
          </div>
        </Toolbar>
      </AppBar>
    </div >
  );
}

AppAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppAppBar);