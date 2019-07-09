import React from 'react';
import { connect } from 'react-redux';
import { getArticlesThunk } from '../store/reducers/articles';
import { Link } from 'react-router-dom';

import { deleteArticleThunk } from '../store/reducers/articles';
import { markReadThunk } from '../store/reducers/articles';
import { markUnreadThunk } from '../store/reducers/articles';
import StatusGraph from './statusGraph';
import TagGraph from './tagsGraph';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

let stylesheet = {
  greaterContainer: {
    padding: '7vh 5vw 7vh 5vw',
    display: 'grid',
    gridTemplateColumns: 'repeat(2, auto [col-start])',
    gridGap: '2vw',
  },
  container: {
    maxWidth: '45vw',
    display: 'grid',
    gridTemplateColumns: 'repeat(1, auto [col-start])',
    gridGap: '50px',
  },
  media: {
    height: 140,
  },
  addBtnContainer: {
    marginTop: '5vh',
    marginBottom: '2vh',
  },
  addBtn: {
    fontFamily: 'Open Sans',
    width: '28vw',
    backgroundColor: '#e8f8c1',
  },
  header: {
    marginTop: '5vh',
    fontFamily: 'Zilla Slab',
    fontSize: '2rem',
    color: '#846267',
  },
  sideNav: {
    width: '30vw',
    height: '100%',
  },
  dataPlaceholder: {
    maxWidth: '28vw',
    height: '65%',
    marginBottom: '2vh',
  },
  headerContainer: {
    display: 'flex',
  },
  viewButton: {
    width: '200px',
    height: '30px',
    color: '#846267',
    marginTop: '5vh',
    marginLeft: '20px',
    backgroundColor: '#e8f8c1',
    fontFamily: 'Open Sans',
    borderRadius: '2px',
  },
};

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      status: 'unread',
      open: false,
      snack: '',
    };
  }
  async componentDidMount() {
    await this.props.getArticles(this.props.userKey);
  }
  render() {
    let readArticles = this.props.articles.filter(
      article => article.read === 'false'
    );
    let unreadArticles = this.props.articles.filter(
      article => article.read === 'true'
    );

    let articleView;
    if (this.state.status === 'unread') {
      articleView = readArticles;
    } else if (this.state.status === 'read') {
      articleView = unreadArticles;
    }

    const data = [
      { x: 0, y: readArticles.length },
      { x: 1, y: unreadArticles.length },
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
          <StatusGraph />
          <TagGraph />
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                CONTACT
              </Typography>
              <Typography color="textSecondary">
                <a
                  href="https://www.linkedin.com/in/natashakelly1/"
                  target="_blank"
                >
                  Natasha Kelly
                </a>
              </Typography>
              <Typography color="textSecondary">
                <a
                  href="https://www.linkedin.com/in/asia-gagnon/"
                  target="_blank"
                >
                  Asia Gagnon
                </a>
              </Typography>
              <Typography color="textSecondary">
                <a
                  href="https://www.linkedin.com/in/amarisachang/"
                  target="_blank"
                >
                  Amaris Chang
                </a>
              </Typography>
            </CardContent>
            <CardActions>
              <a
                href="https://github.com/teenage-soup-for-the-chicken-soul/pollypocket"
                target="_blank"
              >
                <Button size="small">Git Repo</Button>
              </a>
            </CardActions>
          </Card>
        </div>
        <div style={stylesheet.container}>
          <div style={stylesheet.headerContainer}>
            <div style={stylesheet.header}>ARTICLES</div>
            <Button
              onClick={() => {
                this.setState({ status: 'unread' });
              }}
              variant="contained"
              size="small"
              style={stylesheet.viewButton}
              onClick={() => {
                this.setState({ status: 'unread' });
              }}
            >
              UNREAD
            </Button>
            <Button
              onClick={() => {
                this.setState({ status: 'read' });
              }}
              variant="contained"
              size="small"
              style={stylesheet.viewButton}
              onClick={() => {
                this.setState({ status: 'read' });
              }}
            >
              READ
            </Button>
          </div>

          {this.props.articles.length !== 0 ? (
            articleView.map((article, index) => (
              <Card key={index} className="card" width="340">
                <Link
                  to={{
                    pathname: '/article',
                    state: {
                      currentArticle: article,
                    },
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
                        pathname: '/article',
                        state: {
                          currentArticle: article,
                        },
                      }}
                      key={article._id}
                    >
                      Read Now
                    </Link>
                  </Button>

                  {this.state.status === 'unread' ? (
                    <Button
                      variant="contained"
                      size="small"
                      color="grey"
                      onClick={() => {
                        this.setState({ snack: `Finished "${article.title}"` });
                        this.setState({ open: true });
                        this.props.markRead(article);
                      }}
                    >
                      Mark as Read
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      size="small"
                      color="grey"
                      onClick={() => {
                        this.setState({
                          snack: `Adding "${article.title}" to Library`,
                        });
                        this.setState({ open: true });
                        this.props.markUnread(article);
                      }}
                    >
                      Mark as Unread
                    </Button>
                  )}

                  <Button
                    size="small"
                    color="#846267"
                    onClick={() => {
                      this.setState({ snack: `"${article.title}" Deleted` });
                      this.setState({ open: true });
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
        <div>
          {this.state.open ? (
            <Snackbar
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              open={open}
              autoHideDuration={1000}
              ContentProps={{
                'aria-describedby': 'message-id',
              }}
              message={<span id="message-id">{this.state.snack}</span>}
              action={[
                <IconButton
                  key="close"
                  aria-label="Close"
                  color="inherit"
                  className="close"
                  onClick={() => {
                    this.setState({ open: false });
                  }}
                >
                  <CloseIcon />
                </IconButton>,
              ]}
            />
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
  userKey: state.user.uniqueKey,
});

const mapDispatch = dispatch => ({
  getArticles: userKey => dispatch(getArticlesThunk(userKey)),
  deleteArticle: (id, rev) => dispatch(deleteArticleThunk(id, rev)),
  markRead: article => dispatch(markReadThunk(article)),
  markUnread: article => dispatch(markUnreadThunk(article)),
});

export default connect(
  mapState,
  mapDispatch
)(Dashboard);
