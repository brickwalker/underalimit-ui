import * as React from "react";
import { Navigate } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const ageStatus = {
  title: "Please confirm your age.",
  description: "You must be 18 or older to use this tool.",
  pass: "18 or older",
  fail: "Less than 18",
};

export default class AgeDisclaimer extends React.Component {

    constructor(props: any) {
        super(props);
        this.checkPass = this.checkPass.bind(this);
    }

  state = {
    pass: false,
  };

  checkPass(reply: string) {
    reply === ageStatus.pass && this.setState({ pass: true });
  }

  render() {
    return (
      <div>
        <div>{ageStatus.description}</div>
        <DisclaimerDialog checkPass={this.checkPass} />
        {this.state.pass && <Navigate to="/calculator" />}
      </div>
    );
  }
}

interface IDDProps {
    checkPass: (reply: string) => void
}
interface IDDState {
    open: boolean
}

export class DisclaimerDialog extends React.Component<IDDProps, IDDState> {
  state = {
    open: true,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = (e: React.BaseSyntheticEvent) => {
    console.log(e.target.textContent);

    //const message = e.target.textContent;

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
          <Button onClick={this.handleClose} autoFocus>
            {ageStatus.pass}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
