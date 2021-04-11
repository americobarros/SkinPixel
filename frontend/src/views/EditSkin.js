import {useEffect, useState} from 'react';
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
import {CameraControls, Pixel} from "./3d_view";

import {createSkin, getSkin, updateSkin} from "../actions/skin";

import 'react-edit-text/dist/index.css';

import './EditSkin.css';
import {Canvas} from 'react-three-fiber';
import SkinCard from "../components/SkinCard";

export function getPositions() {
  // build head
  let array = [];

  for (let i = 0; i < 8; ++i) {
    for (let j = 0; j < 8; ++j) {
      array.push([i, j, 0]);
      array.push([i, j, 7]);
      if (i === 0 || i === 7 || j === 0 || j === 7) {
        for (let k = 1; k < 7; ++k) {
          array.push([i, j, k])
        }
      }
    }
  }

  // build torso
  for (let i = -4; i < 12; ++i) {
    array.push([i, -1, 2]);
    array.push([i, -1, 3]);
    array.push([i, -1, 4]);
    array.push([i, -1, 5]);
    array.push([i, -12, 2]);
    array.push([i, -12, 3]);
    array.push([i, -12, 4]);
    array.push([i, -12, 5]);
    for (let j = -2; j > -12; --j) {
      array.push([i, j, 2]);
      array.push([i, j, 5]);
      if (i == -4 || i == 11) {
        array.push([i, j, 3]);
        array.push([i, j, 4]);
      }
    }

  }

  // build legs
  for (let i = 0; i < 8; ++i) {
    for (let j = -13; j > -24; --j) {
      array.push([i, j, 2]);
      array.push([i, j, 5]);
      if (i == 0 || i == 7) {
        array.push([i, j, 3]);
        array.push([i, j, 4]);
      }
    }
    array.push([i, -24, 2])
    array.push([i, -24, 3])
    array.push([i, -24, 4])
    array.push([i, -24, 5])

  }
  return array;
}

export class Clr {
  constructor(color, pos) {
    this.clr = color
    this.pos = pos
  }
}
export default function EditSkin(props) {
  const {handleSnackbarClick, currUser} = props;
  let {skinId} = useParams();
  let history = useHistory()
  // const {acceptedFiles, getRootProps, getInputProps} = useDropzone();


  const emptySkin = {
    name: "new name"
  }
  const [color, setColor] = useState(null);
  const [rerender, setRerender] = useState(false);
  //const [editingSkin, setEditingSkin] = useState(skin ? skin.skin2D : emptySkin);
  const [open, setOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [file, setFile] = useState("");
  const [skin, setSkin] = useState(emptySkin);
  const [clrs, setClrs] = useState([]);

  function handleChangeComplete(color) {
    setColor(color.hex.toString());
  };
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  const positions = getPositions();

  const buildPixels = (skinColors) => {
    const clrs = [];
    for (let i = 0; i < positions.length; i++) {
      clrs.push(new Clr(skinColors[i], positions[i]))
    }
    return clrs;
  }

  useEffect(() => {
    if (skinId) {
      getSkin(skinId)
          .then(
              (result) => {
                setIsLoaded(true);
                setClrs(buildPixels(result.skin2D));
                setSkin(result);
              },
              (error) => {
                setIsLoaded(true);
                setError(error);
              }
          )
    } else {
      setIsLoaded(true);
      setClrs(buildPixels(Array(1036).fill('white')));
      setSkin({name: ""})
    }
  }, [isLoaded])


  function handleSave() {
    let colors = clrs.map(x => {
      return x.clr
    });
    if (skinId) {
      skin.skin2D = colors;

      if (newName != "") {
        skin.name = newName;
      }
      updateSkin(skin).then(()=>{handleSnackbarClick({message: 'Successfully saved skin', color: 'green'});
        history.push("/account")
      })

    } else {
      if (newName != "" && file != null) {

        console.log(file);
        const newSkin = {
          createdAt: 10,
          image: file,
          name: newName,
          skin2D: colors,
          username: currUser.username,
          user: currUser._id,
          comments: []
        };

        createSkin(newSkin);
        handleSnackbarClick({message: 'New skin successfully saved', color: 'green'});
        history.push("/account")
      } else {
        handleSnackbarClick({message: 'Not all info for skin included', color: 'red'});
      }
    }
  }

  function handleDelete() {
    // const index = allSkins.indexOf(skin);
    //
    // if (index > -1) {
    //   allSkins.splice(index, 1);
    // }
    // history.push("/account")
  }

  const handleClickOpen = () => {
    if (skinId) {
      setOpen(true);
    } else {
      history.push("/account")
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Return array of uploaded files after submit button is clicked
  const handleSubmit = (files, allFiles) => {
    setFile(URL.createObjectURL(files[0].file))
    allFiles.forEach(f => f.remove())
  }





  if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
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
            <Link to="/account" style={{color: 'black', alignSelf: 'center'}}>
              <ArrowBackIcon className="backIcon"/>
            </Link>
            <TextField id="filled-basic" id="textfield" label={skin ? skin.name : "New Skin Name"} variant="filled"
                       onChange={(e) => setNewName(e.target.value)}/>
            <h2 style={{display: 'none'}}>{skinId}</h2>
          </div>

          <div class="displayFlex">
            <Canvas camera={{position: [20, 20, 20]}}>
              <CameraControls/>
              <ambientLight intensity={0.5}/>
              <spotLight position={[100, 100, 100]} angle={0.15} penumbra={1}/>
              {clrs.map(x => {
                return <Pixel color={color} position={x.pos} clr={x}/>;
              })}
            </Canvas>
            <div className="rightItems">
              <SwatchesPicker height="600px" onChangeComplete={handleChangeComplete}/>
              <Button className="ButtonStyle" variant="outlined" style={{marginTop: '30px'}}
                      onClick={handleSave}>Save</Button>
              <Button className="ButtonStyle" variant="outlined"
                      onClick={handleClickOpen}>{skin ? "Delete" : "Cancel"}</Button>
            </div>
          </div>
          <div style={{marginLeft: '15px', display: 'flex'}}>
            <div style={{width: '500px', filter: 'grayscale(100%)'}}>
              <Dropzone
                  onSubmit={handleSubmit}
                  maxFiles={1}
                  inputContent="Drop an cover image, or click to browse"
                  submitButtonDisabled={files => files.length > 1}
                  accept="image/*"
              />
            </div>
            <img src={skin ? skin.image : file}
                 style={{maxHeight: "115px", marginLeft: '30px', filter: 'grayscale(0%)'}}/>
          </div>
        </div>
    );
  }
}
  