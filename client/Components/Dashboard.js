import React from "react";
import { connect } from "react-redux";
import { getArticlesThunk } from "../store/reducers/articles";
import { Link } from "react-router-dom";
import AddArticleForm from "./addArticleForm";
import { deleteArticleThunk } from "../store/reducers/articles";
import { markReadThunk } from "../store/reducers/articles";
import {markUnreadThunk} from "../store/reducers/articles";
import StatusBarGraph from "./statusBarGraph"

//Card import - will be used in single goal view for Tier 2

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";


// const [open, setOpen] = React.useState(false);

let stylesheet = {
  greaterContainer: {
    padding: "7vh 5vw 7vh 5vw",
    display: "grid",
    gridTemplateColumns: "repeat(2, auto [col-start])",
    gridGap: "2vw"
  },
  container: {
    maxWidth: "45vw",
    display: "grid",
    gridTemplateColumns: "repeat(1, auto [col-start])",
    gridGap: "50px"
  },
  media: {
    height: 140
  },
  addBtnContainer: {
    marginTop: "5vh",
    marginBottom: "2vh"
  },
  addBtn: {
    fontFamily: "Open Sans",
    width: "28vw",
    backgroundColor: "#e8f8c1"
  },
  header: {
    marginTop: "5vh",
    fontFamily: "Zilla Slab",
    fontSize: "2rem",
    color: "#846267"
  },
  sideNav: {
    width: "30vw",
    height: "100%"
  },
  dataPlaceholder: {
    maxWidth: "28vw",
    height: "65%",
    marginBottom: "2vh"
  },
  headerContainer: {
    display: "flex"
  },
  viewButton: {
    width: "150px",
    height: "50px",
    color: "#846267",
    marginTop: "5vh",
    marginLeft: "50px",
    backgroundColor: "#e8f8c1",
    fontFamily: "Open Sans"
  }
};

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      status: "unread"
    };
  }
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

    let articleView;
    if (this.state.status === "unread") {
      articleView = readArticles;
    } else if (this.state.status === "read") {
      articleView = unreadArticles;
    }

    const data = [
      {x: 0, y: readArticles.length},
      {x: 1, y: unreadArticles.length},

    ];

    return (
      <div style={stylesheet.greaterContainer}>
        <div style={stylesheet.sideNav}>
          <div style={stylesheet.addBtnContainer}>
            <Button
              href="/article/add"
              variant="contained"
              size="small"
              style={stylesheet.addBtn}
            >
              <i className="material-icons">control_point</i>
              Article
            </Button>
          </div>
          Unread Articles vs. Read Articles
          {/* <img
            style={stylesheet.dataPlaceholder}
            src="https://image.freepik.com/free-photo/colorful-bar-graph-orange-graph-pink-background_23-2147892252.jpg"
          /> */}
          <StatusBarGraph />
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                CONTACT
              </Typography>
              <Typography color="textSecondary">Asia Gagnon</Typography>
              <Typography color="textSecondary">Asia Gagnon</Typography>
              <Typography color="textSecondary">Asia Gagnon</Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Git Repo</Button>
            </CardActions>
          </Card>
        </div>
        <div style={stylesheet.container}>
          <div style={stylesheet.headerContainer}>
            <div style={stylesheet.header}>ARTICLES</div>
            <button
              style={stylesheet.viewButton}
              onClick={() => {
                this.setState({ status: "unread" });
              }}
            >
              UNREAD
            </button>
            <button
              style={stylesheet.viewButton}
              onClick={() => {
                this.setState({ status: "read" });
              }}
            >
              READ
            </button>
          </div>

          {this.props.articles.length !== 0 ? (
            articleView.map((article, index) => (
              <Card key={index} className="card" width="340">
                <Link
                  to={{
                    pathname: "/article",
                    state: {
                      currentArticle: article
                    }
                  }}
                  key={article._id}
                >
                  <CardActionArea>
                    <CardMedia
                      className="media"
                      style={stylesheet.media}
                      image={article.image}
                      title={article.title}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h4">
                        {article.title}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Link>
                <CardActions>
                  <Button size="small" color="primary">
                    <Link
                      to={{
                        pathname: "/article",
                        state: {
                          currentArticle: article
                        }
                      }}
                      key={article._id}
                    >
                      Read Now
                    </Link>
                  </Button>
                  {this.state.status === 'unread'?  <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    onClick={() => {
                      this.props.markRead(article);
                    }}
                  >
                    Mark as Read
                  </Button> : <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    onClick={() => {
                      this.props.markUnread(article);
                    }}
                  >
                    Mark as Unread
                  </Button>}

                  <Button
                    size="small"
                    color="primary"
                    onClick={() => {
                      this.props.deleteArticle(article);
                    }}
                  >
                    Delete
                  </Button>

                </CardActions>
              </Card>
            ))
          ) : (
            <div />
          )}
        </div>
      </div>
    );
  }
}
const mapState = state => ({
  articles: state.articles.articles,
  userKey: state.user.uniqueKey
});

const mapDispatch = dispatch => ({
  getArticles: userKey => dispatch(getArticlesThunk(userKey)),
  deleteArticle: (id, rev) => dispatch(deleteArticleThunk(id, rev)),
  markRead: article => dispatch(markReadThunk(article)),
  markUnread: article => dispatch(markUnreadThunk(article))
});

export default connect(
  mapState,
  mapDispatch
)(Dashboard);


