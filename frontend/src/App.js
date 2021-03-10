import { useState } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { StylesProvider } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';

import './App.css';
import { currUser, allUsers, allSkins } from './dummyData.js';

import Landing from './views/Landing';
import ViewSkin from './views/ViewSkin';
import EditSkin from './views/EditSkin';
import Account from './views/Account';

import Header from './components/Header';
import SignInModal from './components/SignInModal';

export default function App() {
  const [currUser, setCurrUser] = useState(null);

  const [open, setOpen] = useState(false);

  const [snackbar, setSnackbar] = useState({
                                            open: false,
                                            message: '',
                                            color: 'black',
                                          });
  
  const handleClickOpen = () => {
    setOpen(true);
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
      <SignInModal open={open} handleClose={handleClose} allUsers={allUsers} setCurrUser={setCurrUser} handleSnackbarClick={handleSnackbarClick} handleSnackbarClose={handleSnackbarClose} />
      <Router>
        <div>
          <Header allUsers={allUsers} setCurrUser={setCurrUser} currUser={currUser} handleClickOpen={handleClickOpen} />
          <content>
            <Snackbar
              open={snackbar.open}
              message={snackbar.message}
              autoHideDuration={5000}
              onClose={handleSnackbarClose}
              ContentProps={{
                style: {
                  backgroundColor: snackbar.color
                },
              }}
              
            />
          <Switch>
            <Route path="/account" children={<Account currUser={currUser} />}/>
            <Route path="/skin/edit/:skinId" children={<EditSkin />}/>
            <Route path="/skin/:skinId" children={<ViewSkin />}/>
            <Route exact path="/" children={<Landing allUsers={allUsers} allSkins={allSkins} />} />
          </Switch>
          </content>          
        </div>
      </Router>
      </StylesProvider>
  );
}
