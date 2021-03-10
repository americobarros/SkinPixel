
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
  const [rerender, setRerender] = useState(false);

  function handlePost() {
    skin.comments.push({ createdAt: 3, user: currUser, text: newComment});
    setRerender(!rerender);
  }

  return (
    <div style={{ maxWidth: '1400px' }}>
      <div style={{ display: 'flex' }}>
        <Link to="/" style={{ color: 'black', alignSelf: 'center' }}>
          <ArrowBackIcon className="backIcon" />
        </Link>
        <h2>{skin.name}</h2>
      </div>
      <div style={{ display: 'flex' }}>
        <div id="threeDView">
        </div>
        <div id="userInfo" />
      </div>
      <div style={{ display: 'flex' }}>
        <TextField id="outlined-basic" label="Comment" variant="outlined" className={classnames("comment", classes.root)} onChange={(e) => setNewComment(e.target.value)}/>
        <Button className="commentButton" variant="outlined" onClick={handlePost}>Post</Button>
      </div>
      <div id="userComments">
        {skin.comments.map(comment => 
          <div>
            {comment.text}
          </div>
        )}
      </div>
    </div>
  );
}
  