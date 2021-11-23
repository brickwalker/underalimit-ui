import React from "react";
import { Link, Outlet } from "react-router-dom";
import {
  IconButton,
  CssBaseline,
  Grid,
  AppBar,
  Toolbar,
  Typography,
} from "@mui/material";
import { GitHub, LinkedIn } from "@mui/icons-material";
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
            <Typography variant="h4">
              underalimit
            </Typography>
          </StyledLink>
          &nbsp; | &nbsp;
          <Typography variant="subtitle2" style={{ flex: 1 }}>
            Drinks calculator for safe driving
          </Typography>
          <IconButton
            href="https://github.com/brickwalker?tab=repositories"
            target="_blank"
          >
            <GitHub />
          </IconButton>
          <IconButton
            href="https://www.linkedin.com/in/artemnedostup/"
            target="_blank"
          >
            <LinkedIn />
          </IconButton>
        </Toolbar>
      </AppBar>
    );
  }
}
