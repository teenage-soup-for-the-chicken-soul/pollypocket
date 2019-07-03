import React, { Component } from 'react';
import parse from 'html-react-parser';

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
    console.log(art.linkCSS);
    let cssLink = document.createElement('link');
    cssLink.href = art.linkCSS;
    cssLink.rel = 'stylesheet';
    console.log(cssLink);
    document.head.appendChild(cssLink);
    return (
      <div>
          <button type="button">Back Btn</button>
        <div>
          {/* <h2>{art.title}</h2> */}
          {/* <h4>Author by line</h4> */}
          {parse(String(art.linkData))}
        </div>
      </div>
    );
  }
}
