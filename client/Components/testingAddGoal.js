import React from 'react';
import { connect } from 'react-redux';

class GoalBttnTest extends React.Component {
  render() {
    return (
      <div>
        <a href="/addGoal">
          <button type="button">Add Goal</button>
        </a>
        <div>
          {this.props.goals.forEach(goal => {
            return <div>{goal.goalTitle}</div>;
          })}
        </div>
      </div>
    );
  }
}

const mapSignup = state => {
  return {
    goals: state.articles.articles,
    userKey: state.user.uniqueKey,
  };
};

export default connect(mapSignup)(GoalBttnTest);
