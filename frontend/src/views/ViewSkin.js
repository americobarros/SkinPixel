import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import classnames from "classnames";

import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import "./ViewSkin.css";
import { allSkins, currUserX } from "../dummyData.js";
import { Canvas } from "react-three-fiber";
import { CameraControls, Pixel, FixedPixel } from "./3d_view";
import { getSkin } from "../actions/skin";
import { getPositions, Clr } from "./EditSkin";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "green",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
      color: "green",
    },
    "& .MuiInputLabel-outlined.Mui-focused": {
      color: "green",
    },
  },
}));

export default function ViewSkin(props) {
  const { allUsers, currUser } = props;

  const classes = useStyles();
  let { skinId } = useParams();
  const emptySkin = {
    name: "new name",
    comments: [],
  };
  const [isLoaded, setIsLoaded] = useState(false);
  const [skin, setSkin] = useState(emptySkin);
  const [newComment, setNewComment] = useState("");
  const positions = getPositions();
  const [clrs, setClrs] = useState([]);

  function handlePost() {
    if (currUser) {
      skin.comments.push({
        createdAt: 3,
        username: currUser.username,
        text: newComment,
      });
      setNewComment("");
    }
  }

  const buildPixels = (skinColors) => {
    const clrs = [];
    for (let i = 0; i < positions.length; i++) {
      clrs.push(new Clr(skinColors[i], positions[i]));
    }
    return clrs;
  };

  useEffect(() => {
    getSkin(skinId).then(
      (result) => {
        setIsLoaded(true);
        setSkin(result);
        setClrs(buildPixels(result.skin2D));
      },
      (error) => {
        setIsLoaded(true);
      }
    );
  }, [isLoaded]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
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
          {/*<div id="threeDView">*/}
          {/*  {skin.skin2D.map((row, outer_idx) =>*/}
          {/*      <div style={{display: 'flex'}}>*/}
          {/*        {row.map((color, inner_idx) => (*/}
          {/*            <div>*/}
          {/*              <div className="cube" style={{backgroundColor: color}}/>*/}
          {/*            </div>*/}
          {/*        ))}*/}
          {/*      </div>*/}
          {/*  )}*/}
          {/*</div>*/}
          <Canvas id="threeDV" camera={{ position: [20, 20, 20] }}>
            <CameraControls />
            <ambientLight intensity={0.5} />
            <spotLight position={[100, 100, 100]} angle={0.15} penumbra={1} />
            {clrs.map((x) => {
              return <FixedPixel position={x.pos} clr={x} />;
            })}
          </Canvas>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div id="skinInfo">
              <span>
                <text>Skin Info:</text>
                <h3>{skin.name}</h3>
                <img src={skin.image} alt={skin.name} className="skinImage" />
                <p>
                  Skin Created On: <br></br>
                  {skin.createdAt}
                </p>
              </span>
            </div>
            <div id="userInfo">
              <span>
                <text>Creator:</text>
                {/* <h3>{skin.userInfo.name}</h3> */}
                <h4>@{skin.username}</h4>
                {/* <p>{skin.userInfo.bio}</p> */}
              </span>
            </div>
          </div>
        </div>

        {/* comment bar */}
        <div class="displayFlex">
          <TextField
            id="outlined-basic"
            label={currUser ? "Comment" : "Login to comment"}
            disable
            variant="outlined"
            disabled={!currUser}
            className={classnames("comment", classes.root)}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Button
            className="commentButton"
            variant="outlined"
            onClick={handlePost}
            disabled={!currUser}
          >
            Post
          </Button>
        </div>

        {/* comment display */}
        <div>
          {skin.comments.map((comment) => (
            <div id="userComments">
              {comment.text}
              <div>
                <b>Comment By: </b>
                {comment.username}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
