import React from 'react';
import { connect } from 'react-redux';
import { getArticlesThunk } from '../store/reducers/articles';
import { Link } from 'react-router-dom';
import AddArticleForm from './addArticleForm';

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      currArticles: [],
    };
  }
  async componentDidMount() {
    await this.props.getArticles(this.props.userKey);
    this.setState({ currArticles: this.props.articles });
  }

  //set up for Tier 2
  // handleDelete() {}
  // handleClick() {}

  render() {
    return (
      <div>
        <AddArticleForm />
        <div>Here is our Dashboard</div>
        {this.state.currArticles.length !== 0 ? (
          this.state.currArticles.map(article => (
            <Link
              to={{
                pathname: '/article',
                state: {
                  currentArticle: article,
                },
              }}
              key={article._id}
            >
              {article.title}
            </Link>
          ))
        ) : (
          <div>No articles</div>
        )}
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
