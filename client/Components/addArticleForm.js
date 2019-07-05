import React from 'react';
import { connect } from 'react-redux';
import { addArticleThunk } from '../store/reducers/articles';

import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';




class addArticleForm extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
      articleURL: '',
      goals: [],
      userKey: '',
      open: false
    };
    this.handleClick = this.handleClick.bind(this);

  }

  componentDidMount() {
    this.setState({ userKey: this.props.userKey });
  }

  handleClick() {
    this.props.addArticle(this.state);
  }
 

  render() {
    return (
      <div>
        <form>
          Article Title:
          <br />
          <input
            type="text"
            value={this.state.title}
            onChange={event => this.setState({ title: event.target.value })}
          />
          <br />
          Article Url:
          <br />
          <input
            type="text"
            value={this.state.articleURL}
            onChange={event =>
              this.setState({ articleURL: event.target.value })
            }
          />
          <br />
          Goal Id:
          <br />
          <input
            type="text"
            value={this.state.goalId}
            onChange={event => this.setState({ goalId: event.target.value })}
          />
          <br />
          <br />
          <button
            type="button"
            value="Submit"
            onClick={() => {
              this.handleClick(this.state)
              this.setState({open: true})
            }}
          >
            Submit
          </button>
          <div>
      {this.state.open ?
            <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={open}
            autoHideDuration={6000}

            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">Article Added!</span>}
            action={[
            ,
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                className="close"
                onClick={()=> {this.setState({open: false})}}
              >
                <CloseIcon />
              </IconButton>,
            ]}
          /> : <div></div>}

    </div>
        </form>

      </div>
    );
  }
}

const mapState = state => ({
  userKey: state.user.uniqueKey,
});

const mapDispatch = dispatch => ({
  addArticle: obj => dispatch(addArticleThunk(obj)),
});

export default connect(
  mapState,
  mapDispatch
)(addArticleForm);
