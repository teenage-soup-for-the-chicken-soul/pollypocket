import React from 'react';
import { connect } from 'react-redux';
import { addArticleThunk } from '../store/reducers/articles';

import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

class AddArticleForm extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
      articleURL: '',
      goals: [],
      userKey: '',
      open: false,
      loading: false,
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
    return this.state.loading ? (
      <div class="loader" />
    ) : (
      <div>
        <form className="form-add-article">
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
          <label>Category</label>
          <select
            id="myList"
            onChange={event => this.setState({ goalId: event.target.value })}
          >
            <option value="learning">For Learning</option>
            <option value="leisure">For Fun</option>
            <option value="career">For Work</option>
            <option value="news">To Stay Up To Date</option>
          </select>
          <br />
          <br />
          <button
            className="submit-btn"
            type="button"
            value="Submit"
            onClick={async () => {
              this.setState({ loading: true });
              await this.handleClick(this.state);
              console.log('awaited handleClick');
              await this.setState({ open: true, loading: false });
              this.props.history.push('/home');
            }}
          >
            Submit
          </button>
          <div>
            {this.state.open ? (
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
                  <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    className="close"
                    onClick={() => {
                      this.setState({ open: false });
                    }}
                  >
                    <CloseIcon />
                  </IconButton>,
                ]}
              />
            ) : (
              <div />
            )}
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
)(AddArticleForm);
