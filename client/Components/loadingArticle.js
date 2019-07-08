import React from 'react';

const stylesheet = {
  full: {
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
