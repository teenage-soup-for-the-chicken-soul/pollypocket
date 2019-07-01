import React from 'react'
import {connect} from 'react-redux'
import 'typeface-roboto'

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// import {someThunk} from 'somewhere'
// import {me} from '../store/user' => or our version of it

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});


class GoalView extends React.Component{
// async componentDidMount{
//   await this.props.me()
// }

render(){
  if (this.props.loading) {
    return <div>loading...</div>
  }
  return(
    <Div>Goal Title</Div>
    <Button type='button'>Add Article</Button>
    {resultOfDBFetch.map(article => (
      <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image= "article.image"
          title= "article.title"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
           Article Title
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Read Now
        </Button>
        <Button size="small" color="primary">
          Mark as Read
        </Button>
        <Button size="small" color="primary">
          Delete
        </Button>
      </CardActions>
    </Card>
    ))}
  )
}




}
