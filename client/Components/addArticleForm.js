import React from 'react';
import { connect } from 'react-redux';
import { addArticleThunk } from '../store/reducers/articles';
import LoadingArticle from './loadingArticle';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const stylesheet = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '25vh',
  },
  submitBtn: {
    fontFamily: 'Open Sans',
    width: '20vw',
    backgroundColor: '#e8f8c1',
  },
};

class AddArticleForm extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
      articleURL: '',
      goalId: '',
      userKey: '',
      open: false,
      loading: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.setState({ userKey: this.props.userKey });
  }

  async handleClick() {
    await this.props.addArticle(this.state);
  }

  render() {
    return this.state.loading ? (
      <LoadingArticle />
    ) : (
      <div style={stylesheet.container}>
        <img
          src={process.env.PUBLIC_URL + '/assets/images/addPageBackground.png'}
          alt="polly-adding-article"
          style={{ minWidth: '100vw', height: 'auto', display: 'block' }}
        />
        <form className="form-add-article">
          <label>Article Url:</label>
          <br />
          <input
            type="text"
            value={this.state.articleURL}
            onChange={event =>
              this.setState({ articleURL: event.target.value })
            }
            required
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
          {this.state.articleURL.length ? (
            <Button
              variant="contained"
              size="small"
              value="Submit"
              style={stylesheet.submitBtn}
              onClick={async () => {
                this.setState({ loading: true });
                await this.handleClick(this.state);
                this.setState({ open: true, loading: false, articleURL: '' });
                setTimeout(() => {
                  this.props.history.push('/home');
                }, 2000);
              }}
            >
              Submit
            </Button>
          ) : (
            <div />
          )}

          <div>
            {this.state.open ? (
              <Snackbar
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                open={open}
                autoHideDuration={3000}
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
