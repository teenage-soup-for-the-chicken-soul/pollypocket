import React, {Component} from 'react';
import ButtonGroup from '@material-ui/core/Button';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function LoginDialogBox() {
  const [open, setOpen] = React.useState(true);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

    return (
      <Dialog
        open={open}
        onClose={handleClose}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill out this form to get started!
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="email"
            type="email"
            fullWidth
          />
          <br />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Password"
            type="password"
            fullWidth
          />
        <Button variant="contained" color="primary" fullWidth aria-label="Full width button group">
          <img src="/assets/images/google.png" alt="google-icon" height="22" width="22"/>
            Sign In with Google
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Login
          </Button>
        </DialogActions>
      </Dialog>
    );
}
