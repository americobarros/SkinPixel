import { Link, useParams } from "react-router-dom";
import classnames from "classnames";

import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import './ViewSkin.css';
import { allSkins } from '../dummyData.js';

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


export default function ViewSkin() {
  const classes = useStyles();
  let { skinId } = useParams();

  const skin = allSkins.find(skin => skin.id == skinId);

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
        <TextField id="outlined-basic" label="Comment" variant="outlined" className={classnames("comment", classes.root)} />
        <Button className="commentButton" variant="outlined">Save</Button>
      </div>
      <div id="twoDViews" />
    </div>
  );
}
  