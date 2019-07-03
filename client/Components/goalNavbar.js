import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';


const stylesheet={
  root: {
    display: 'flex',
    direction: "column",
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  chip: {
    margin: "20px",
  },
};
export default function GoalNavbar() {


  function handleDelete() {
    alert('You clicked the delete icon.');
  }

  function handleClick() {
    alert('You clicked the Chip.');
  }

  return (
    <div className="chip container" style={stylesheet.root}>
    <Chip
    size="small"
    avatar={
      <Avatar>
        <FaceIcon />
      </Avatar>
    }
    label="Clickable Deletable Chip"
    onClick={handleClick}
    onDelete={handleDelete}
    className="chip"
    style={stylesheet.chip}
  />
  <Chip
    size="small"
    avatar={
      <Avatar>
        <FaceIcon />
      </Avatar>
    }
    label="Clickable Deletable Chip"
    onClick={handleClick}
    onDelete={handleDelete}
    className="chip"
    style={stylesheet.chip}
  /><Chip
  size="small"
  avatar={
    <Avatar>
      <FaceIcon />
    </Avatar>
  }
  label="Clickable Deletable Chip"
  onClick={handleClick}
  onDelete={handleDelete}
  className="chip"
  style={stylesheet.chip}
/>
  </div>
  );
}
