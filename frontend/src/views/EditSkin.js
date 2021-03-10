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
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

import {EditText} from 'react-edit-text';
import 'react-edit-text/dist/index.css';

import './EditSkin.css';

export default function ViewSkin(props) {
  const { allSkins, handleSnackbarClick } = props;
  let { skinId } = useParams();
  let history = useHistory()

  const skin = allSkins.find(skin => skin.id == skinId);

  const [color, setColor] = useState(null);
  const [rerender, setRerender] = useState(false);
  const [editingSkin, setEditingSkin] = useState(skin.skin2D);
  const [open, setOpen] = useState(false);

  function handleChangeComplete(color, event) {
    setColor(color.hex.toString());
  };

  function handleSave() {
    skin.skin2D = editingSkin;
    handleSnackbarClick({ message: 'Successfully saved skin', color: 'green' });
  }

  function handleDelete() {
    const index = allSkins.indexOf(skin);

    if (index > -1) {
      allSkins.splice(index, 1);
    }
    history.push("/account")
  }

  const handleRename = (e) => {
    skin.name = e.value;
  }

  const handleClickOpen = () => {
    setOpen(true);
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
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this skin?
          </DialogContentText>
        </DialogContent>
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
        <EditText
          name="skinName"
          style={{padding: '10px', 'font-weight':'bold', fontSize: '1.5em'}}
          defaultValue={skin.name}
          onSave={handleRename}
        />
        {/* <span className="editNameIcon">
          <IconButton onClick={handleRename} color="primary">
            <EditIcon style={{ color: '#90caf9', alignSelf: 'center' }}/>
          </IconButton>
        </span> */}
        <h2 style={{ display: 'none' }}>{skinId}</h2>
      </div>
      <div style={{ display: 'flex' }}>
        <div id="threeDView">
          {skin.skin2D.map((row, outer_idx) =>
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
          <Button className="ButtonStyle" variant="outlined" onClick={handleClickOpen}>Delete</Button>
        </div>
      </div>
      <div id="twoDViews" />
    </div>
  );
}
  