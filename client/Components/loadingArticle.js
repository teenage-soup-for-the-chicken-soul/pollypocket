import React from 'react';

const stylesheet = {
  full: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '50vh',
    paddingLeft: '50vw',
  },
};

class LoadingArticle extends React.Component {
  render() {
    return (
      <div style={stylesheet.full}>
        <div className="loader" />
      </div>
    );
  }
}

export default LoadingArticle;
