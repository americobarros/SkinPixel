import { useState } from 'react';
import { Link, useParams, useHistory } from "react-router-dom";
import { SwatchesPicker } from 'react-color';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

import {EditText} from 'react-edit-text';
import 'react-edit-text/dist/index.css';

import './EditSkin.css';

export default function EditSkin(props) {
  const { allSkins, handleSnackbarClick, emptySkin, currUser } = props;
  let { skinId } = useParams();
  let history = useHistory()

  const skin = allSkins.find(skin => skin.id == skinId);

  const [color, setColor] = useState(null);
  const [rerender, setRerender] = useState(false);
  const [editingSkin, setEditingSkin] = useState(skin ? skin.skin2D : emptySkin);
  const [open, setOpen] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [newName, setNewName] = useState("");

  function handleChangeComplete(color, event) {
    setColor(color.hex.toString());
  };

  function handleSave() {
    if (skin) {
      skin.skin2D = editingSkin;
      if (newName != "") {
        skin.name = newName;
      }
      handleSnackbarClick({ message: 'Successfully saved skin', color: 'green' });
    }
    else {
      const latestId = Math.max.apply(Math, allSkins.map(function(skin) { return skin.id; })) + 1;
      
      const newSkin = {
          id: latestId,
          createdAt: 10,
          image: uploadedImage || "",
          name: newName,
          skin2D: editingSkin,
          user: currUser,
          comments: []
      };

      allSkins.push(newSkin);
      handleSnackbarClick({ message: 'New skin successfully saved', color: 'green' });
      history.push("/account");
    }
  }

  function handleDelete() {
    const index = allSkins.indexOf(skin);

    if (index > -1) {
      allSkins.splice(index, 1);
    }
    history.push("/account")
  }

  const handleClickOpen = () => {
    if (skin) {
      setOpen(true);
    }
    else {
      history.push("/account")
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  function setSkinColor(outer_index, inner_index) {
    if (color) {
      const changedSkin = editingSkin;
      changedSkin[outer_index][inner_index] = color;
      setEditingSkin(changedSkin);
    }
    setRerender(!rerender)
  }

  return (
    <div style={{ maxWidth: '1300px' }}>
      {console.log(newName)}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete this skin?"}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button onClick={handleDelete} color="secondary" autoFocus>
            DELETE
          </Button>
        </DialogActions>
      </Dialog>
      <div style={{ display: 'flex' }}>
        <Link to="/account" style={{ color: 'black', alignSelf: 'center' }}>
          <ArrowBackIcon className="backIcon" />
        </Link>
        <TextField id="filled-basic" style={{ width: '900px' }} label={skin ? skin.name : "New Skin Name"} variant="filled" onChange={(e) => setNewName(e.target.value)}/>
        <h2 style={{ display: 'none' }}>{skinId}</h2>
      </div>
      <div style={{ display: 'flex' }}>
        <div id="threeDView">
          {editingSkin.map((row, outer_idx) =>
            <div style={{ display: 'flex' }}>
              {row.map((color, inner_idx) => (
                <div>
                  <div className="cube" onClick={() => setSkinColor(outer_idx, inner_idx)} style={{ backgroundColor: color }} />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="rightItems">
            <SwatchesPicker height="600px" onChangeComplete={handleChangeComplete}/>
          <Button className="ButtonStyle" variant="outlined" onClick={handleSave}>Save</Button>
          <Button className="ButtonStyle" variant="outlined" onClick={handleClickOpen}>{skin ? "Delete" : "Cancel"}</Button>
        </div>
      </div>
      <div id="twoDViews" />
    </div>
  );
}
  