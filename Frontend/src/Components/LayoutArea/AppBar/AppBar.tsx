import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MuiAppBar from '@material-ui/core/AppBar';

//Style of AppAppBar
const styles = (theme) => ({
  root: {
    color: theme.palette.common.red,
  },
});

function AppBar(props) {
  return <MuiAppBar elevation={0} position="static" {...props} />;
}

AppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppBar);