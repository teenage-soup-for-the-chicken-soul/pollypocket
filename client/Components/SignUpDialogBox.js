import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function SignUpDialogBox() {
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
        <DialogTitle>SignUp</DialogTitle>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Sign Up
          </Button>
        </DialogActions>
      </Dialog>
    );
}
