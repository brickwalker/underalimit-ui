import * as React from "react";
import { Navigate } from "react-router-dom";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
} from "@mui/material";
import {
  IDisclaimerDialogProps,
  IDisclaimerDialogState,
} from "../interfaces/IAgeDisclaimer";

const ageStatus = {
  title: "Please confirm your age.",
  description: "You must be 18 or older to use this tool.",
  pass: "18 or older",
  fail: "Less than 18",
};

export default class AgeDisclaimer extends React.Component {
  state = {
    pass: false,
  };

  checkPass = (reply: string) => {
    reply === ageStatus.pass && this.setState({ pass: true });
  };

  render() {
    return (
      <Grid container direction="column">
        <Alert severity="warning">{ageStatus.description}</Alert>
        <DisclaimerDialog checkPass={this.checkPass} />
        {this.state.pass && <Navigate to="/calculator" />}
      </Grid>
    );
  }
}

export class DisclaimerDialog extends React.Component<
  IDisclaimerDialogProps,
  IDisclaimerDialogState
> {
  state = {
    open: true,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = (e: React.BaseSyntheticEvent) => {
    this.setState({ open: false });
    this.props.checkPass(e.target.textContent);
  };

  render() {
    return (
      <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{ageStatus.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {ageStatus.description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose}>{ageStatus.fail}</Button>
          <Button onClick={this.handleClose}>{ageStatus.pass}</Button>
        </DialogActions>
      </Dialog>
    );
  }
}
