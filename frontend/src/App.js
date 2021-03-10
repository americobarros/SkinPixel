import { useState } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import { StylesProvider } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';

import './App.css';
import { currUserX, allUsers, allSkins, allResourcePacks, emptySkin } from './dummyData.js';

import Landing from './views/Landing';
import ViewResource from './views/ViewResourcePack'; 
import ViewSkin from './views/ViewSkin';
import EditSkin from './views/EditSkin';
import Account from './views/Account';

import Header from './components/Header';
import SignInModal from './components/SignInModal';

export default function App() {
  const [currUser, setCurrUser] = useState(currUserX);

  const [open, setOpen] = useState(false);

  const [snackbar, setSnackbar] = useState({
                                            open: false,
                                            message: '',
                                            color: 'black',
                                          });
  
  const handleClickOpen = () => {
    if (currUser) {
      setCurrUser(null)
    } else {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSnackbarClick = (newState) => {
    setSnackbar({ open: true, ...newState });
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <StylesProvider injectFirst>
      <SignInModal
        open={open}
        handleClose={handleClose}
        allUsers={allUsers}
        setCurrUser={setCurrUser}
        handleSnackbarClick={handleSnackbarClick}
        handleSnackbarClose={handleSnackbarClose}
      />
      <Router>
        <div>
          <Header currUser={currUser} handleClickOpen={handleClickOpen} />
          <content>
            <Snackbar
              open={snackbar.open}
              message={snackbar.message}
              autoHideDuration={3000}
              onClose={handleSnackbarClose}
              ContentProps={{
                style: {
                  backgroundColor: snackbar.color
                },
              }}
              
            />
          <Switch>
            <Route exact path="/" children={<Landing allUsers={allUsers} allSkins={allSkins} allResourcePacks={allResourcePacks}/>} />
            {currUser
              ? <Route exact path="/account" children={<Account currUser={currUser} allSkins={allSkins} allUsers={allUsers} handleSnackbarClick={handleSnackbarClick}/>}/>
              : <Redirect exact to="/" />
            }
            <Route exact path="/skin/edit/:skinId" children={<EditSkin allSkins={allSkins} handleSnackbarClick={handleSnackbarClick} currUser={currUser}/>}/>
            <Route exact path="/skin/:skinId" children={<ViewSkin allSkins={allSkins} currUser={currUser} />}/>
            <Route exact path="/newskin" children={<EditSkin allSkins={allSkins} currUser={currUser} emptySkin={emptySkin} currUser={currUser} handleSnackbarClick={handleSnackbarClick} />}/>

            <Route exact path="/resource/edit/:resourceId" children={<EditSkin allResourcePacks={allSkins} handleSnackbarClick={handleSnackbarClick} currUser={currUser}/>}/>
            <Route exact path="/resource/:resourceId" children={<ViewResource allResourcePacks={allSkins} currUser={currUser} />}/>
            <Route exact path="/newskin" children={<EditResource allResourcePacks={allSkins} currUser={currUser} emptySkin={emptySkin} currUser={currUser} handleSnackbarClick={handleSnackbarClick} />}/>
          </Switch>
          </content>          
        </div>
      </Router>
      </StylesProvider>
  );
}
