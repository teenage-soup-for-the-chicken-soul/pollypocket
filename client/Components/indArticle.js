import React, { Component } from 'react';
import { renderHTML } from 'react-render-html';

export default class IndArticle extends Component {
  constructor() {
    super();
    this.state = {
      article: {},
    };
  }

  componentDidMount() {
    const { currentArticle } = this.props.location.state;
    this.setState({ article: currentArticle });
  }
  render() {
    const art = this.state.article;
    return (
      <div>
        <button type="button">Back Btn</button>
        <div>
          <h2>{art.title}</h2>
          {/* <h4>Author by line</h4> */}
          <div> {renderHTML(art.linkData)}</div>
        </div>
      </div>
    );
  }
}
