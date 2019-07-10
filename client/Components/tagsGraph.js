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
        data: { fill: "#c5dbe9" }
      }
    };
  }
  async componentDidMount() {
    await this.props.getArticles(this.props.userKey);
  }

  render() {
    let learningTags= this.props.articles.filter(
      article => article.goalId === "Learning"
    );
    let leisureTags= this.props.articles.filter(
      article => article.goalId === "Leisure"
    );
    let careerTags= this.props.articles.filter(
      article => article.goalId === "Career"
    );
    let newsTags= this.props.articles.filter(
      article => article.goalId === "News"
    );



    return (
      <div>
        {this.props.articles.length !== 0 ? (
          <div>
            <VictoryChart
              height={400}
              width={400}
              domainPadding={{ x: 50, y: [0, 20] }}
            >
              <VictoryBar
              barWidth={50}
                style={this.state.style}
                data={[
                  { x: "Learning", y: learningTags.length },
                  { x: "Leisure", y: leisureTags.length},
                  { x: "Career", y: careerTags.length},
                  { x: "News", y: newsTags.length }
                ]}
              />
            </VictoryChart>
          </div>
        ) : (
          <div>
          <VictoryChart
            height={400}
            width={400}

            domainPadding={{ x: 50, y: [0, 20] }}
          >
            <VictoryBar
              style={this.state.style}
              data={[
                { x: "Learning", y: 0 },
                { x: "Leisure", y: 0},
                { x: "Career", y: 0},
                { x: "News", y: 0}
              ]}
            />
          </VictoryChart>
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
