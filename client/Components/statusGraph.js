import React, { Component } from "react";

import { VictoryPie} from "victory";
import { connect } from "react-redux";
import { getArticlesThunk } from "../store/reducers/articles";

class StatusChart extends Component {
  async componentDidMount() {
    await this.props.getArticles(this.props.userKey);
  }

  render() {
    let unreadArticles = this.props.articles.filter(
      article => article.read === "false"
    );
    let readArticles = this.props.articles.filter(
      article => article.read === "true"
    );

    // const data = [
    //   {x: 0, y: readArticles.length},
    //   {x: 1, y: unreadArticles.length},
    //
    // ];
    return (
      <div>
        {(this.props.articles.length !== 0) ? (
          <div className="App">

            <VictoryPie

              colorScale={["#fe5cb1", "#ffcfdc"]}
              data={[
                { x: "Read", y: readArticles.length },
                { x: "Unread", y: unreadArticles.length }
              ]}
              labelRadius={70}
              padAngle={3}
              innerRadius={30}
              radius={170}
  style={{ labels: { fill: "#3c4043", fontSize: 16, fontWeight: "400" } }}
            />
          </div>
        ) : (
          <div className="App">
            <VictoryPie
              colorScale={["#D89A9E"]}
              data={[{ x: "Add Articles To See Progress Chart", y: 100 }]}
            />
          </div>
        )}
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
