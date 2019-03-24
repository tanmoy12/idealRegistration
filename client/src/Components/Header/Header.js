import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import schoolLogo from "./rsz_isc[1].png";
import eventLogo from "./rsz_official_ielc.png";
import banner from "./banner.png"

const styles = {
  root: {
    flexGrow: 1
  }
};

function SimpleAppBar(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar style={{maxHeight: 100, marginLeft: 'auto', marginRight: 'auto', maxWidth: 1000, display: 'flex', justifyContent: 'space-between'}}>
          <img
            src={eventLogo}
            className="App-logo"
            alt="logo"
            style={{ maxHeight: '94px', maxWidth: '23%', margin: '3px 1%' }}
          />
          <img
            src={banner}
            className="App-logo"
            alt="logo"
            style={{ maxHeight: '100px', maxWidth: '46%', margin: '0px 2%' }}
          />
          <img
            src={schoolLogo}
            className="App-logo"
            alt="logo"
            style={{ maxHeight: '100px', maxWidth: '23%', margin: '0px 1%' }}
          />
        </Toolbar>
      </AppBar>
    </div>
  );
}

SimpleAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleAppBar);
