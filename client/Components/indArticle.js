import React, { Component } from 'react';
import renderHTML from 'react-render-html';

export default class IndArticle extends Component {
  constructor(){
    super()
    this.state={
      article: {}
    }
  }


  componentDidMount(){
   const {currentArticle} = this.props.location.state
   console.log("this is the current Article", currentArticle)
   this.setState({article: currentArticle})
  }
  render() {
    const art = this.state.article
    console.log("this is art",art.linkData)
    return (
      <div>
        <button type="button">Back Btn</button>
        <div>
          <h2>{art.title}</h2>
          {/* <h4>Author by line</h4> */}
          <div> {renderHTML(art.articleURL)}</div>
        </div>
      </div>

    );
  }
}
