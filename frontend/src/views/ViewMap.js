
import { useState } from 'react'
import { Link, useParams } from "react-router-dom";
import classnames from "classnames";

import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import './ViewMap.css';

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


export default function ViewMap(props) {
  const { allMaps, currUser } = props;

  const classes = useStyles();
  let { mapId } = useParams();

  const map = allMaps.find(map => map.id == mapId);
  const [newComment, setNewComment] = useState("");

  function handlePost() {
    map.comments.push({ createdAt: 3, user: currUser, text: newComment});
    setNewComment("");
  }

  return (
    <div style={{ maxWidth: '1400px' }}>
      <div style={{ display: 'flex' }}>
        <Link to="/" style={{ color: 'black', alignSelf: 'center' }}>
          <ArrowBackIcon className="backIcon" />
        </Link>
        <h2>{map.name}</h2>
      </div>
      <div style={{ display: 'flex' }}>
        <div id="threeDView">
          <img src={map.image} alt={map.name} className="skinImage"/>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
          <div id="skinInfo">
            <span>
              <text>Skin Info:</text>
              <h3>{map.name}</h3>
              <a href={map.file} download style={{ textDecoration: 'underline' }}>Download Map</a>
              <p>Skin Created On: {map.createdAt}</p>
            </span>
          </div>
          <div id="userInfo">
          <span>
              <text>Creator:</text>
              <h3>{map.user.name}</h3>
              <h4>@{map.user.username}</h4>
              <p>{map.user.bio}</p>
            </span>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex' }}>
        <TextField id="outlined-basic" label="Comment" variant="outlined" className={classnames("comment", classes.root)} onChange={(e) => setNewComment(e.target.value)}/>
        <Button className="commentButton" variant="outlined" onClick={handlePost}>Post</Button>
      </div>
      <div>
        {map.comments.map(comment => 
          <div id="userComments">
            {comment.text}
            <div><b>Comment By: </b>{comment.user.name}</div>
          </div>
        )}
      </div>
    </div>
  );
}
  