import React, { Component } from 'react';
import parse from 'html-react-parser';

export default class IndArticle extends Component {
  constructor() {
    super();
    this.state = {
      article: {},
      stylingElem: [],
    };
  }

  componentDidMount() {
    const { currentArticle } = this.props.location.state;
    this.setState({ article: currentArticle });
    if (this.props.location.state.currentArticle.linkCSS.length) {
      this.props.location.state.currentArticle.linkCSS.forEach(link => {
        let indLink = document.createElement('link');
        indLink.href = link;
        indLink.rel = 'stylesheet';
        document.head.appendChild(indLink);
        this.state.stylingElem.push(indLink);
      });
    }
    if (this.props.location.state.currentArticle.styleCss.length) {
      this.props.location.state.currentArticle.styleCss.forEach(style => {
        let indStyle = document.createElement('style');
        indStyle.innerText = style;
        document.head.append(indStyle);
        this.state.stylingElem.push(indStyle);
      });
    }
  }

  componentWillUnmount() {
    this.state.stylingElem.forEach(tag => tag.remove());
  }

  render() {
    const art = this.state.article;
    return (
      <div>
        <button type="button">Back Btn</button>
        <div>
          {parse(String(art.linkData))}
        </div>
      </div>
    );
  }
}
