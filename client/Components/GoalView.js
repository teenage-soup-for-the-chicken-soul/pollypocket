import React from 'react'
import {connect} from 'react-redux'
// import {someThunk} from 'somewhere'
// import {me} from '../store/user' => or our version of it

class GoalView extends React.Component{
// async componentDidMount{
//   await this.props.me()
// }

render(){
  if (this.props.loading) {
    return <div>loading...</div>
  }
  return(
    <div> Your Goals Go Here </div>
  )
}




}
