import React from "react";
import {
  Button,
  AppBar,
  Toolbar,
  Typography,
} from 'library'

import { connect } from "utils";

import { navigate } from "model/game/actions";
import { classes } from "./style";

const HeaderBar = ({ navigate }) => (
  <div className={classes.root}>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit" className={classes.grow}>
          {'Poker'}
        </Typography>

        <Button color="inherit">Login</Button>

        <Button
          color="inherit"
          onClick={() => navigate('/rooms/')}>
          {'Start'}
        </Button>
      </Toolbar>
    </AppBar>
  </div>
);

export default connect({
  navigate,
})(HeaderBar);
