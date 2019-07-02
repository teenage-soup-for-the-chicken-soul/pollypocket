import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { auth } from '../store/reducers/users';
import TextField from '@material-ui/core/TextField';

class LogInDialogBox extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      open: true,
    };
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.setOpen = this.setOpen.bind(this);
    this.handleComplete = this.handleComplete.bind(this);
  }
  // const [open, setOpen] = React.useState(true);
  setOpen(bool) {
    this.setState({ open: bool });
  }
  handleClickOpen() {
    this.setOpen(true);
  }
  handleClose() {
    this.setOpen(false);
    this.props.history.push('/')
  }
  handleComplete() {
    console.log(this.state);
    this.props.auth(this.state.email, this.state.password, 'login');
    this.setState({ email: '', password: '' });
    this.setOpen(false);
  }

  render() {
    const disabled = !this.state.email.length && !this.state.password.length;

    return (
      <Dialog open={this.state.open} onClose={this.handleClose}>
        <DialogTitle>Login Up</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill out this form to get started!
          </DialogContentText>
          <TextField
            margin="normal"
            value={this.state.email}
            autoFocus
            fullWidth
            id="email"
            label="Email"
            required={true}
            onChange={event => this.setState({ email: event.target.value })}
          />
          <br />
          <TextField
            margin="normal"
            value={this.state.password}
            autoFocus
            fullWidth
            id="password"
            label="Password"
            required={true}
            onChange={event => this.setState({ password: event.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button
            disabled={disabled}
            onClick={this.handleComplete}
            color="primary"
          >
            Log In
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const mapSignup = state => {
  return {
    name: 'login',
    displayName: 'Log In',
    error: state.user.error,
  };
};

const mapDispatch = dispatch => ({
  auth: (email, password, formName) =>
    dispatch(auth(email, password, formName)),
});

export default connect(
  mapSignup,
  mapDispatch
)(LogInDialogBox);

/**
 * PROP TYPES
 */
LogInDialogBox.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  error: PropTypes.object,
};

// import React, {Component} from 'react';
// import ButtonGroup from '@material-ui/core/Button';
// import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';

// export default function LoginDialogBox() {
//   const [open, setOpen] = React.useState(true);

//   function handleClickOpen() {
//     setOpen(true);
//   }

//   function handleClose() {
//     setOpen(false);
//   }

//     return (
//       <Dialog
//         open={open}
//         onClose={handleClose}>
//         <DialogTitle>Login</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             Fill out this form to get started!
//           </DialogContentText>
//           <TextField
//             autoFocus
//             margin="dense"
//             id="name"
//             label="email"
//             type="email"
//             fullWidth
//           />
//           <br />
//           <TextField
//             autoFocus
//             margin="dense"
//             id="name"
//             label="Password"
//             type="password"
//             fullWidth
//           />
//         <Button variant="contained" color="primary" fullWidth aria-label="Full width button group">
//           <img src="/assets/images/google.png" alt="google-icon" height="22" width="22"/>
//             Sign In with Google
//           </Button>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleClose} color="primary">
//             Login
//           </Button>
//         </DialogActions>
//       </Dialog>
//     );
// }
