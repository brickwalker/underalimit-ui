import React from "react";
import { Link, Outlet } from "react-router-dom";
import { CssBaseline, Grid, AppBar, Toolbar, Typography } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import styled from "@emotion/styled";

export default class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Grid container direction="column">
          <Grid item>
            <TopBar />
          </Grid>
          <Grid item container>
            <Outlet />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  &:hover {
    text-decoration: underline;
  }
`;

class TopBar extends React.Component {
  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          <StyledLink to="/">
            <Typography variant="h6" component="div">
              underalimit
            </Typography>
          </StyledLink>
          &nbsp; | &nbsp;
          <StyledLink to="/contacts" style={{ flex: 1 }}>
            <Typography variant="h6" component="div">
              Contacts
            </Typography>
          </StyledLink>
          <ShareIcon />
        </Toolbar>
      </AppBar>
    );
  }
}
