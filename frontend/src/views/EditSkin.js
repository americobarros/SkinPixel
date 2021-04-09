import { useState } from 'react';
import { Link, useParams, useHistory } from "react-router-dom";
import { SwatchesPicker } from 'react-color';
import Dropzone from 'react-dropzone-uploader'
import 'react-dropzone-uploader/dist/styles.css'

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import {Skin, CameraControls, Pixel} from "./3d_view";

import 'react-edit-text/dist/index.css';

import './EditSkin.css';
import {Canvas, useFrame} from 'react-three-fiber';


export default function EditSkin(props) {
  const { allSkins, handleSnackbarClick, emptySkin, currUser } = props;
  let { skinId } = useParams();
  let history = useHistory()
  // const {acceptedFiles, getRootProps, getInputProps} = useDropzone();

  const skin = allSkins.find(skin => skin.id == skinId);

  const [color, setColor] = useState(null);
  const [rerender, setRerender] = useState(false);
  const [editingSkin, setEditingSkin] = useState(skin ? skin.skin2D : emptySkin);
  const [open, setOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [file, setFile] = useState("")

  function handleChangeComplete(color, event) {
    setColor(color.hex.toString());
  };

  function handleSave() {
    console.log(arr2.map(x => {return x.clr}))
    if (skin) {
      skin.skin2D = editingSkin;
      if (newName != "") {
        skin.name = newName;
      }
      if (skin.image != null) {
        skin.image = file;
      }
      
      handleSnackbarClick({ message: 'Successfully saved skin', color: 'green' });
      history.push("/account")
    }
    else {
      if (newName != "" && file != null) {
        const latestId = Math.max.apply(Math, allSkins.map(function(skin) { return skin.id; })) + 1;
        
        const newSkin = {
            id: latestId,
            createdAt: 10,
            image: file,
            name: newName,
            skin2D: editingSkin,
            user: currUser,
            comments: []
        };

        allSkins.push(newSkin);
        handleSnackbarClick({ message: 'New skin successfully saved', color: 'green' });
        history.push("/account")
      }
      else {
        handleSnackbarClick({ message: 'Not all info for skin included', color: 'red' });
      }
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

  // Return array of uploaded files after submit button is clicked
  const handleSubmit = (files, allFiles) => {
      setFile(URL.createObjectURL(files[0].file))
      allFiles.forEach(f => f.remove())
  }

  class Clr{
    constructor(color, pos) {
      this.clr = color
      this.pos = pos
    }
  }
  //const array = [[0, 0, 0], [1, 0, 0], [1, 1, 0], [0, 1, 0], [0, 0, -1], [1, 0, -1], [1, 1, -1], [0, 1, -1]];
  let array = [];
  // build head
  for (let i = 0; i < 8; ++i){
    for (let j = 0; j < 8; ++j){
      array.push([i, j, 0]);
      array.push([i, j, 7]);
      if(i == 0 || i == 7 || j == 0 || j == 7) {
        for (let k = 1; k < 7; ++k) {
        array.push([i, j, k])
        }
      }
    }
  }

  for (let i = -4; i < 12; ++i){
    array.push([i, -1, 2]);
    array.push([i, -1, 3]);
    array.push([i, -1, 4]);
    array.push([i, -1, 5]);
    array.push([i, -12, 2]);
    array.push([i, -12, 3]);
    array.push([i, -12, 4]);
    array.push([i, -12, 5]);
    for (let j = -2; j > -12; --j){
      array.push([i, j, 2]);
      array.push([i, j, 5]);
      if(i == -4 || i == 11){
        array.push([i, j, 3]);
        array.push([i, j, 4]);
      }
    }

  }

  for (let i = 0; i < 8; ++i){
    for (let j = -13; j > -24; --j){
      array.push([i, j, 2]);
      array.push([i, j, 5]);
      if(i == 0 || i == 7){
        array.push([i, j, 3]);
        array.push([i, j, 4]);
      }
    }
    array.push([i, -24, 2])
    array.push([i, -24, 3])
    array.push([i, -24, 4])
    array.push([i, -24, 5])

  }

  const arr2 = array.map(x => {
    return new Clr('white', x)
  });
  /*[
      new Clr('white', [0, 0, 0]),
    new Clr('white', [1, 0, 0]),
    new Clr('white', [1, 1, 0]),
    new Clr('white', [0, 1, 0])]*/


  const pixels = arr2.map( x => {
    return <Pixel color={color} position={x.pos} clr={x}/>;
  });

  return (
    <div id="skinEditView">
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

      <div class="displayFlex">
        <Link to="/account" style={{ color: 'black', alignSelf: 'center' }}>
          <ArrowBackIcon className="backIcon" />
        </Link>
        <TextField id="filled-basic" id="textfield" label={skin ? skin.name : "New Skin Name"} variant="filled" onChange={(e) => setNewName(e.target.value)}/>
        <h2 style={{ display: 'none' }}>{skinId}</h2>
      </div>

      <div class="displayFlex">
        <Canvas camera={{position : [20, 20, 20]}}>
          <CameraControls/>
          <ambientLight intensity={0.5} />
          <spotLight position={[100, 100, 100]} angle={0.15} penumbra={1} />
          {pixels}
{/*          <pointLight position={[-10, -10, -10]} />
          <Pixel color={color} position={[0,0,0]}/>
          <Pixel color={color} position={[1,0,0]}/>
          <Pixel color={color} position={[1,1,0]}/>
          <Pixel color={color} position={[0,1,0]}/>*/}
        </Canvas>
        <div className="rightItems">
          <SwatchesPicker height="600px" onChangeComplete={handleChangeComplete}/>
          <Button className="ButtonStyle" variant="outlined" style={{ marginTop: '30px' }} onClick={handleSave}>Save</Button>
          <Button className="ButtonStyle" variant="outlined" onClick={handleClickOpen}>{skin ? "Delete" : "Cancel"}</Button>
        </div>
      </div>
        <div style={{ marginLeft: '15px', display: 'flex' }}>
          <div style={{ width: '500px', filter: 'grayscale(100%)' }}>
            <Dropzone
              onSubmit={handleSubmit}
              maxFiles={1}
              inputContent="Drop an cover image, or click to browse"
              submitButtonDisabled={files => files.length > 1}
              accept="image/*"
            />
          </div>
          <img src={skin ? skin.image : file} style={{ maxHeight: "115px", marginLeft: '30px', filter: 'grayscale(0%)' }}/>
        </div>
    </div>
  );
}
  