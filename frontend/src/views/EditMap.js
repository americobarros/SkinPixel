import { useState } from 'react';
import { Link, useParams, useHistory } from "react-router-dom";
import Dropzone from 'react-dropzone-uploader'
import 'react-dropzone-uploader/dist/styles.css'

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

import 'react-edit-text/dist/index.css';

import './EditMap.css';

export default function EditMap(props) {
  const { allMaps, handleSnackbarClick, currUser } = props;
  let { mapId } = useParams();
  let history = useHistory()

  const map = allMaps.find(map => map.id == mapId);

  const [color, setColor] = useState(null);
  const [rerender, setRerender] = useState(false);
  const [open, setOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [file, setFile] = useState(null)
  const [image, setImage] = useState(map ? map.image : "");

  function handleSave() {
    if (map) {
      if (newName != "") {
        map.name = newName;
      }

      if (map.image != null) {
        map.image = image;
      }

      if (map.file != null) {
          map.file = file;
      }

      handleSnackbarClick({ message: 'Successfully saved map', color: 'green' });
      history.push("/account")
    }
    else {
      if (newName != "" && file != null && image != null) {
        const latestId = Math.max.apply(Math, allMaps.map(function(map) { return map.id; })) + 1;
        
        const newMap = {
            id: latestId,
            createdAt: 10,
            image: image,
            name: newName,
            file: file,
            user: currUser,
            comments: []
        };

        allMaps.push(newMap);
        handleSnackbarClick({ message: 'New map successfully saved', color: 'green' });
        history.push("/account")
      }
      else {
        handleSnackbarClick({ message: 'Not all info for map included', color: 'red' });
      }
    }
  }

  function handleDelete() {
    const index = allMaps.indexOf(map);

    if (index > -1) {
        allMaps.splice(index, 1);
    }
    history.push("/account")
  }

  const handleClickOpen = () => {
    if (map) {
      setOpen(true);
    }
    else {
      history.push("/account")
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Return array of uploaded files after submit button is clicked
  const handleFileSubmit = (files, allFiles) => {
      setFile(URL.createObjectURL(files[0].file))
      allFiles.forEach(f => f.remove())
  }
  const handleImageSubmit = (files, allFiles) => {
    setImage(URL.createObjectURL(files[0].file))
    allFiles.forEach(f => f.remove())
}

  return (
    <div style={{ maxWidth: '1300px' }}>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete this map?"}</DialogTitle>
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
        <TextField id="filled-basic" style={{ width: '900px' }} label={map ? map.name : "New Map Name"} variant="filled" onChange={(e) => setNewName(e.target.value)}/>
        <h2 style={{ display: 'none' }}>{mapId}</h2>
      </div>
      <div style={{ display: 'flex' }}>
        <div id="threeDView">
            {image && (<img src={image} alt={newName} className="skinImage"/>)}
            <div style={{ marginLeft: '15px', display: 'flex' }}>
          <div style={{ width: '500px', filter: 'grayscale(100%)', margin: '15px 0px' }}>
            <Dropzone
              onSubmit={handleImageSubmit}
              maxFiles={1}
              inputContent="Drop an cover image, or click to browse"
              submitButtonDisabled={files => files.length > 1}
              accept="image/*"
            />
          </div>
        </div>
        <div style={{ marginLeft: '15px', display: 'flex' }}>
          <div style={{ width: '500px', filter: 'grayscale(100%)' }}>
            <Dropzone
              onSubmit={handleFileSubmit}
              maxFiles={1}
              inputContent="Drop a zipped map image, or click to browse"
              submitButtonDisabled={files => files.length > 1}
            />
          </div>
        </div>
        </div>
        <div className="rightItems">
          <Button className="ButtonStyle" variant="outlined" style={{ marginTop: '30px' }} onClick={handleSave}>Save</Button>
          <Button className="ButtonStyle" variant="outlined" onClick={handleClickOpen}>{map ? "Delete" : "Cancel"}</Button>
          {!map && !file && (<span style={{ alignSelf: 'center' }}>No map currently uploaded</span>)}
          {(map || file) && (<a href={file ? file : map.file} download>View Map</a>)}
        </div>
      </div>
        
    </div>
  );
}
  