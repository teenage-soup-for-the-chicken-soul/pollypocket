import React from 'react';
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

class SignUpDialogBox extends React.Component {
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
    this.props.history.push('/');
  }
  handleComplete() {
    this.props.auth(this.state.email, this.state.password, 'signup');
    this.setState({ email: '', password: '' });
    if (!this.props.error) {
      this.setOpen(false);
    }
  }

  render() {
    const disabled = !this.state.email.length && !this.state.password.length;

    return (
      <Dialog open={this.state.open} onClose={this.handleClose}>
        <DialogTitle>Sign Up</DialogTitle>
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
            type="password"
            autoComplete="current-password"
            required={true}
            onChange={event => this.setState({ password: event.target.value })}
          />
          <br />
          <Button
            href="/auth/google"
            variant="contained"
            color="#D7E2D0"
            fullWidth
            aria-label="Full width button group"
          >
            <img
              src="/assets/images/google.png"
              alt="google-icon"
              height="22"
              width="22"
            />
            Sign Up with Google
          </Button>
          {this.props.error && this.props.error.response && (
            <div> {this.props.error.response.data} </div>
          )}
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
            Sign Up
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
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
)(SignUpDialogBox);

/**
 * PROP TYPES
 */
SignUpDialogBox.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  error: PropTypes.object,
};
