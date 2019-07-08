import React, { Component } from 'react';


import {XYPlot, VerticalBarSeries, XAxis} from 'react-vis';
import { connect } from "react-redux";
import { getArticlesThunk } from "../store/reducers/articles";


class StatusChart extends Component {
  async componentDidMount() {
    await this.props.getArticles(this.props.userKey);
  }

  render() {
    let readArticles = this.props.articles.filter(
      article => article.read === "false"
    );
    let unreadArticles = this.props.articles.filter(
      article => article.read === "true"
    );
    const data = [
      {x: 0, y: readArticles.length},
      {x: 1, y: unreadArticles.length},

    ];
    return (
      <div className="App">
     <XYPlot height={200} width={200} yDomain={[(readArticles.length + unreadArticles.length), 0]}>
  <VerticalBarSeries  color='C71585' data={data} />

</XYPlot>

      </div>
    );
  }
}
const mapState = state => ({
  userKey: state.user.uniqueKey,
  articles: state.articles.articles
});

const mapDispatch = dispatch => ({
  getArticles: userKey => dispatch(getArticlesThunk(userKey))
});

export default connect(
  mapState,
  mapDispatch
)(StatusChart);

