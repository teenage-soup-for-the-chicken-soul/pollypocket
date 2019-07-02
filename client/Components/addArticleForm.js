import React from 'react';
import { connect } from 'react-redux';
import { addArticleThunk } from '../store/reducers/articles';

class addArticleForm extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
      articleURL: '',
      goalId: 1,
      userKey: '',
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleFindArticles = this.handleFindArticles.bind(this);
  }

  componentDidMount() {
    this.setState({ userKey: this.props.userKey });
  }

  handleClick() {
    this.props.addArticle(this.state);
  }
  async handleFindArticles() {
    await this.state.db.createDBIndex();
    this.state.db.findArticle(this.state.userKey);
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
            onClick={() => this.handleClick(this.state)}
          >
            Submit
          </button>
        </form>
        <button
          type="button"
          onClick={() => this.handleFindArticles(this.state.userKey)}
        >
          Find Articles By User
        </button>
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
