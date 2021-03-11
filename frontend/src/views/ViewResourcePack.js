
import { useState } from 'react'
import { Link, useParams } from "react-router-dom";
import classnames from "classnames";

import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import './ViewResourcePack.css';
import { allResourcePacks, currUserX } from '../dummyData.js';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "green"
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
      color: "green"
    },
    "& .MuiInputLabel-outlined.Mui-focused": {
      color: "green"
    }
  },
}));


export default function ViewResourcePack(props) {
  const { allResourcePacks, currUser } = props;

  const classes = useStyles();
  let { resourceId } = useParams();

  const resource = allResourcePacks.find(resource => resource.id == resourceId);
  const [newComment, setNewComment] = useState("");

  function handlePost() {
    resource.comments.push({ createdAt: 3, user: currUser, text: newComment});
    setNewComment("");
  }

  return (
    <div style={{ maxWidth: '1400px' }}>
      <div style={{ display: 'flex' }}>
        <Link to="/" style={{ color: 'black', alignSelf: 'center' }}>
          <ArrowBackIcon className="backIcon" />
        </Link>
        <h2>{resource.name}</h2>
      </div>
      <div style={{ display: 'flex' }}>
        <div id="threeDView">
          <img src={resource.image} alt={resource.name} className="skinImage"/>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
          <div id="skinInfo">
            <span>
              <text>Resource Info:</text>
              <h3>{resource.name}</h3>
              <a href={resource.file} download style={{ textDecoration: 'underline' }}>Download Map</a>
              <p>Resource Pack Created On: {resource.createdAt}</p>
            </span>
          </div>
          <div id="userInfo">
          <span>
              <text>Creator:</text>
              <h3>{resource.user.name}</h3>
              <h4>@{resource.user.username}</h4>
              <p>{resource.user.bio}</p>
            </span>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex' }}>
        <TextField id="outlined-basic" label="Comment" variant="outlined" className={classnames("comment", classes.root)} onChange={(e) => setNewComment(e.target.value)}/>
        <Button className="commentButton" variant="outlined" onClick={handlePost}>Post</Button>
      </div>
      <div>
        {resource.comments.map(comment => 
          <div id="userComments">
            {comment.text}
            <div><b>Comment By: </b>{comment.user.name}</div>
          </div>
        )}
      </div>
    </div>
  );
}