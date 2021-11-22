import React from "react";
import { CssBaseline, Grid } from "@mui/material";
import { Outlet } from "react-router";

export default class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Grid container direction="column">
          <Grid item container>
            This is my app
          </Grid>
          <Grid item container>
            <Outlet />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}
