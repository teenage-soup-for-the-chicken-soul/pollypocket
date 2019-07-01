import React, { Component } from 'react';
import { connect } from "react-redux";


import {addArticleThunk} from "../store/reducers/articles"

class addArticleForm extends React.Component {
  constructor() {
    super();
    this.state = {

      title: '',
      articleURL: '',
      goalId: 1,
      userKey: ''
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleFindArticles = this.handleFindArticles.bind(this);
  }

  componentDidMount() {
    // axios
    //   .get("http://127.0.0.1:5984/body_test/2ca86a060aeb361568fd28b4c6008e01")
    //   .then(json => this.setState({ parsed: json.data.linkUrl }));
    // this.state.db.getAllArticles("2ca86a060aeb361568fd28b4c600abd1")
   this.setState({userKey: this.props.userKey})
  }

  handleClick() {
    // this.setState({ stringParsed: true });
    this.props.addArticle(this.state);
    console.log("this is the STAAAATE", this.state);
  }
  async handleFindArticles() {
    // this.setState({ stringParsed: true });
    await this.state.db.createDBIndex()
    this.state.db.findArticle(this.state.userId);
  }

  render() {
    return  (

      <div>
        <form>
          Article Title:
          <br />
          <input
            type="text"
            value={this.state.title}
            onChange={event =>
              this.setState({ title: event.target.value })
            }
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
          onClick={() => this.handleFindArticles(this.state.userId)}
        >
          Find Articles By User
        </button>
      </div>
      /* <button type="button" onClick={() => this.handleClick()}>
          CLICK HERE TO RENDER
      </button> */
    );
  }
}

const mapState = state => ({

  userKey: state.user.uniqueKey
});

const mapDispatch = dispatch => ({
 addArticle: obj => dispatch(addArticleThunk(obj))
});

export default connect(
  mapState,
  mapDispatch
)(addArticleForm);
