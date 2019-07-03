import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { getGoalsThunk, addGoalThunk } from '../store/reducers/articles';

class AddGoalPop extends React.Component {
  constructor() {
    super();
    this.state = {
      goals: [],
      goalTitle: '',
      open: true,
    };
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.setOpen = this.setOpen.bind(this);
    this.handleComplete = this.handleComplete.bind(this);
  }
  componentDidMount() {
    this.setState({ goals: this.props.goals });
  }
  setOpen(bool) {
    this.setState({ open: bool });
  }
  handleClickOpen() {
    this.setOpen(true);
  }
  handleClose() {
    this.setOpen(false);
    this.props.history.goBack();
  }
  handleComplete() {
    if (this.state.goalTitle.length !== 0) {
      let newGoalId;
      if (this.state.goals.length > 0) {
        newGoalId = this.state.goals[this.state.goals.length - 1].goalId + 1;
      } else {
        newGoalId = 1;
      }
      const newGoal = {
        userKey: this.props.userKey,
        goalTitle: this.state.goalTitle,
        goalId: newGoalId,
      };
      let newGoalArr = this.state.goals.push(newGoal);
      this.props.addGoalThunk(newGoalArr);
      this.setState({ goalTitle: '' });
      this.history.goBack();
    }
    if (!this.props.error) {
      this.setOpen(false);
    }
  }

  render() {
    const disabled = !this.state.goalTitle.length;

    return (
      <Dialog open={this.state.open} onClose={this.handleClose}>
        <DialogTitle>Add Goal</DialogTitle>
        <DialogContent>
          <DialogContentText>Add a new goal</DialogContentText>
          <TextField
            margin="normal"
            value={this.state.goalTitle}
            autoFocus
            fullWidth
            id="goalTitle"
            label="Goal Title"
            required={true}
            onChange={event => this.setState({ goalTitle: event.target.value })}
          />
          <br />
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
            Add Goal
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const mapSignup = state => {
  return {
    goals: state.articles.goals,
    userKey: state.user.uniqueKey,
  };
};

const mapDispatch = dispatch => ({
  getGoalsThunk: userKey => dispatch(getGoalsThunk(userKey)),
  addGoalThunk: obj => dispatch(addGoalThunk(obj)),
});

export default connect(
  mapSignup,
  mapDispatch
)(AddGoalPop);
