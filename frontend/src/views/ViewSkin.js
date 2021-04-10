
import { useState } from 'react'
import { Link, useParams } from "react-router-dom";
import classnames from "classnames";

import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import './ViewSkin.css';
import { allSkins, currUserX } from '../dummyData.js';

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


export default function ViewSkin(props) {
  const { allSkins, currUser } = props;

  const classes = useStyles();
  let { skinId } = useParams();

  const skin = allSkins.find(skin => skin.id == skinId);
  const [newComment, setNewComment] = useState("");

  function handlePost() {
    if(currUser){
      skin.comments.push({ createdAt: 3, user: currUser, text: newComment});
      setNewComment("");
    }
  }

  return (
    <div id="skinContainer">
      
      {/* title */}
      <div class="displayFlex">
        <Link to="/" id="backButton">
          <ArrowBackIcon className="backIcon" />
        </Link>
        <h2>{skin.name}</h2>
      </div>

      {/* container for skin image, actual skin display, and creator */}
      <div class="displayFlex">
        <div id="threeDView">
          {skin.skin2D.map((row, outer_idx) =>
            <div style={{ display: 'flex' }}>
              {row.map((color, inner_idx) => (
                <div>
                  <div className="cube" style={{ backgroundColor: color }} />
                </div>
              ))}
            </div>
          )}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
          <div id="skinInfo">
            <span>
              <text>Skin Info:</text>
              <h3>{skin.name}</h3>
              <img src={skin.image} alt={skin.name} className="skinImage"/>
              <p>Skin Created On: <br></br>{skin.createdAt}</p>
            </span>
          </div>
          <div id="userInfo">
          <span>
              <text>Creator:</text>
              <h3>{skin.user.name}</h3>
              <h4>@{skin.user.username}</h4>
              <p>{skin.user.bio}</p>
            </span>
          </div>
        </div>
      </div>
      
      {/* comment bar */}
      <div class="displayFlex">
        <TextField id="outlined-basic" label={currUser?"Comment":"Login to comment"} disable variant="outlined" disabled={!currUser} className={classnames("comment", classes.root)} onChange={(e) => setNewComment(e.target.value)}/>
        <Button className="commentButton" variant="outlined" onClick={handlePost} disabled={!currUser}>Post</Button>
      </div>

      {/* comment display */}
      <div>
        {skin.comments.map(comment => 
          <div id="userComments">
            {comment.text}
            <div><b>Comment By: </b>{comment.user.name}</div>
          </div>
        )}
      </div>
      
    </div>
  );
}
  