import React from 'react';
import { connect } from 'react-redux';
import { getArticlesThunk } from '../store/reducers/articles';
import { Link } from 'react-router-dom';
import AddArticleForm from './addArticleForm';
import { deleteArticleThunk } from '../store/reducers/articles';

//Card import - will be used in single goal view for Tier 2
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

//snackbar test
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
// const [open, setOpen] = React.useState(false);

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
};

class Dashboard extends React.Component {
  async componentDidMount() {
    await this.props.getArticles(this.props.userKey);
  }

  render() {
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
          data vis placeholder
          <img
            style={stylesheet.dataPlaceholder}
            src="https://image.freepik.com/free-photo/colorful-bar-graph-orange-graph-pink-background_23-2147892252.jpg"
          />
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
          <div style={stylesheet.header}>ARTICLES</div>
          {this.props.articles.length !== 0 ? (
            this.props.articles.map((article, index) => (
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
                  <Button variant="contained" size="small" color="primary">
                    Mark as Read
                  </Button>
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
  userKey: state.user.uniqueKey,
});

const mapDispatch = dispatch => ({
  getArticles: userKey => dispatch(getArticlesThunk(userKey)),
  deleteArticle: (id, rev) => dispatch(deleteArticleThunk(id, rev)),
});

export default connect(
  mapState,
  mapDispatch
)(Dashboard);

//Code we want to implement for Tier 2

// import { makeStyles } from "@material-ui/core/styles";
// import Avatar from "@material-ui/core/Avatar";
// import Chip from "@material-ui/core/Chip";
// import FaceIcon from "@material-ui/icons/Face";
// import DoneIcon from "@material-ui/icons/Done";

// const useStyles = makeStyles(theme => ({
//   // root: {
//   //   display: 'flex',
//   //   justifyContent: 'center',
//   //   flexWrap: 'wrap',
//   // },
//   chip: {
//     margin: theme.spacing(1)
//   },
//   root: {
//     display: "flex",
//     flexWrap: "wrap",
//     justifyContent: "space-around",
//     overflow: "hidden",
//     backgroundColor: theme.palette.background.paper
//   },
//   gridList: {
//     flexWrap: "nowrap",
//     // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
//     transform: "translateZ(0)"
//   },
//   title: {
//     color: theme.palette.primary.light
//   },
//   titleBar: {
//     background:
//       "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)"
//   }
// }));
// // import {someThunk} from 'somewhere'
// // import {me} from '../store/user' => or our version of it
// const classes = useStyles();

//Code that goes in the render

// <div id="container">
//   <div id="sidebar">
//     {goalList.map(goal => {
//       <Chip
//         label="goal.name"
//         onClick={handleclick}
//         onDelete={handleDelete}
//         // className={classes.chip}
//       />;
//     })}
//   <button type='button'>Add Article</button>
//   </div>
//   {goalList.map(goal => (
//     <div
//     className={classes.root}>
//       <GridList className={classes.gridList} cols={2.5}>
//         {articles.map(article => (
//           <GridListTile key={article.img}>
//             <img src={article.img} alt={article.title} />
//             <GridListTileBar
//               title={article.title}
//               classes={{
//                 root: classes.titleBar,
//                 title: classes.title
//               }}
//               actionIcon={
//                 <IconButton aria-label={`star ${article.title}`}>
//                   <StarBorderIcon className={classes.title} />
//                 </IconButton>
//               }
//             />
//           </GridListTile>
//         ))}
//       </GridList>
//     </div>
//   ))}

//   <div id="goalOneList" />
//   <div id="goalTwoList" />
//   <div id="goalThreeList" />
// </div>
