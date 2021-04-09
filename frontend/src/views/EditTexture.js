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

import './EditTexture.css';

export default function EditTexture(props) {
  const { allResourcePacks, handleSnackbarClick, currUser } = props;
  let { resourceId } = useParams();
  let history = useHistory()

  const resource = allResourcePacks.find(resource => resource.id == resourceId);

  const [color, setColor] = useState(null);
  const [rerender, setRerender] = useState(false);
  const [open, setOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [file, setFile] = useState(null)
  const [image, setImage] = useState(resource ? resource.image : "");

  function handleSave() {
    if (resource) {
      if (newName != "") {
        resource.name = newName;
      }

      if (resource.image != null) {
        resource.image = image;
      }

      if (resource.file != null) {
        resource.file = file;
      }

      handleSnackbarClick({ message: 'Successfully saved resource', color: 'green' });
      history.push("/account")
    }
    else {
      if (newName != "" && file != null && image != null) {
        const latestId = Math.max.apply(Math, allResourcePacks.map(function(resource) { return resource.id; })) + 1;
        
        const newResource = {
            id: latestId,
            createdAt: 10,
            image: image,
            name: newName,
            file: file,
            user: currUser,
            comments: []
        };

        allResourcePacks.push(newResource);
        handleSnackbarClick({ message: 'New resource successfully saved', color: 'green' });
        history.push("/account")
      }
      else {
        handleSnackbarClick({ message: 'Not all info for resource included', color: 'red' });
      }
    }
  }

  function handleDelete() {
    const index = allResourcePacks.indexOf(resource);

    if (index > -1) {
        allResourcePacks.splice(index, 1);
    }
    history.push("/account")
  }

  const handleClickOpen = () => {
    if (resource) {
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
        <TextField id="filled-basic" style={{ width: '900px' }} label={resource ? resource.name : "New Resource Name"} variant="filled" onChange={(e) => setNewName(e.target.value)}/>
        <h2 style={{ display: 'none' }}>{resourceId}</h2>
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
          <Button className="ButtonStyle" variant="outlined" onClick={handleClickOpen}>{resource ? "Delete" : "Cancel"}</Button>
          {!resource && !file && (<span style={{ alignSelf: 'center' }}>No resource currently uploaded</span>)}
          {(resource || file) && (<a href={file ? file : resource.file} download>View Resource</a>)}
        </div>
      </div>
        
    </div>
  );
}
  