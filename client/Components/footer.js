import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';

// import { makeStyles } from '@material-ui/core/styles';

const useStyles = {
  root: {
    overflow: 'hidden',
    position: 'fixed',
    bottom: '0px',
    width: '100%',
    minHeight: '25vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Open Sans',
    fontSize: '2vh',
    color: '#8E8E8E',
    paddingTop: '2vh',
  },
  authorContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, auto [col-start])',
    gridGap: '8vw',
  },
  eachAuthor: {
    display: 'flex',
    flexDirection: 'column',
  },
  name: {
    fontFamily: 'Open Sans',
    fontSize: '2vh',
    color: '#8E8E8E',
  },
  links: {
    fontFamily: 'Zilla Slab',
    fontSize: '2vh',
    color: '#8E8E8E',
  },
};

export default function Footer() {
  const classes = useStyles;
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation style={useStyles.root}>
      <div style={useStyles.title}>{`-`}
        <i className="material-icons">face</i>
        <i className="material-icons">face</i>
        <i className="material-icons">face</i>
        {`-`}
      </div>
      <div style={useStyles.name}
      >MEET THE TEAM</div>
      <div style={useStyles.authorContainer}>
        <div style={useStyles.eachAuthor}>
          <div style={useStyles.name}>Amaris Chang</div>
          <a
            style={useStyles.links}
            href="https://github.com/Amic4353/"
            target="_blank"
          >
            github
          </a>
          <a
            style={useStyles.links}
            href="https://www.linkedin.com/in/amarisachang/"
            target="_blank"
          >
            linkedin
          </a>
        </div>
        <div style={useStyles.eachAuthor}>
          <div style={useStyles.name}>Asia Gagnon</div>
          <a
            style={useStyles.links}
            href="https://github.com/AsiaJoyG"
            target="_blank"
          >
            github
          </a>
          <a
            style={useStyles.links}
            href="https://www.linkedin.com/in/asia-gagnon/"
            target="_blank"
          >
            linkedin
          </a>
        </div>
        <div style={useStyles.eachAuthor}>
          <div style={useStyles.name}>Natasha Kelly</div>
          <a
            style={useStyles.links}
            href="https://github.com/gURLmeetsCode"
            target="_blank"
          >
            github
          </a>
          <a
            style={useStyles.links}
            href="https://www.linkedin.com/in/natashakelly1/"
            target="_blank"
          >
            linkedin
          </a>
        </div>
      </div>
      <div />
     </BottomNavigation>
  );
}
