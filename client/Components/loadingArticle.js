import React from 'react';

const stylesheet = {
  full: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '50vh',
  },
};

class LoadingArticle extends React.Component {
  render() {
    return (
      <div style={stylesheet.full}>
        <div className="loader" />
        <div>Adding Article</div>
      </div>
    );
  }
}

export default LoadingArticle;
