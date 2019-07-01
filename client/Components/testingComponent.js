import React, { Component } from 'react';
import axios from 'axios';
import renderHTML from 'react-render-html';
import DB from '../db.js';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      db: new DB('alice2'),
      parsed: '',
      stringParsed: false,
      articleTitle: '',
      articleUrl: '',
      goalId: 1,
      userId: 2,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleFindArticles = this.handleFindArticles.bind(this);
  }

  componentDidMount() {
    // axios
    //   .get("http://127.0.0.1:5984/body_test/2ca86a060aeb361568fd28b4c6008e01")
    //   .then(json => this.setState({ parsed: json.data.linkUrl }));
    // this.state.db.getAllArticles("2ca86a060aeb361568fd28b4c600abd1")
  }

  handleClick() {
    // this.setState({ stringParsed: true });
    this.state.db.addArticle(this.state);
  }
  async handleFindArticles() {
    // this.setState({ stringParsed: true });
    await this.state.db.createDBIndex()
    this.state.db.findArticle(this.state.userId);
  }

  render() {
    return this.state.stringParsed ? (
      <div>{renderHTML(this.state.parsed)}</div>
    ) : (
      <div>
        <form>
          Article Title:
          <br />
          <input
            type="text"
            value={this.state.articleTitle}
            onChange={event =>
              this.setState({ articleTitle: event.target.value })
            }
          />
          <br />
          Article Url:
          <br />
          <input
            type="text"
            value={this.state.articleUrl}
            onChange={event =>
              this.setState({ articleUrl: event.target.value })
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

export default App;
