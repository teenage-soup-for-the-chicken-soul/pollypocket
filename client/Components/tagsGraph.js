import React, { Component } from "react";

import { VictoryPie } from "victory";
import { VictoryChart } from "victory";
import { VictoryBar } from "victory";

import { connect } from "react-redux";
import { getArticlesThunk } from "../store/reducers/articles";

class TagChart extends Component {
  constructor() {
    super();
    this.state = {
      style: {
        data: { fill: "#fab85b" }
      }
    };
  }
  async componentDidMount() {
    await this.props.getArticles(this.props.userKey);
  }

  render() {
    let workTags= this.props.articles.filter(
      article => article.read === "false"
    );
    let readArticles = this.props.articles.filter(
      article => article.read === "true"
    );

    return (
      <div>
        {this.props.articles.length !== 0 ? (
          <div>
            <VictoryChart
              height={400}
              width={400}
              domainPadding={{ x: 40, y: [0, 20] }}
              scale={{ x: "time" }}
            >
              <VictoryBar
                style={this.state.style}
                data={[
                  { x: "Work", y: 2 },
                  { x: "Fun", y: 3 },
                  { x: "Learning", y: 5 },
                  { x: "News", y: 4 }
                ]}
              />
            </VictoryChart>
          </div>
        ) : (
          <div className="App">
            <VictoryPie
              colorScale={["#d2c1c3"]}
              data={[{ x: "Add Articles To See Tags Chart", y: 100 }]}
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
)(TagChart);
