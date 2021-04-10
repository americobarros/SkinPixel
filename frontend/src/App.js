import { useState, useEffect } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import { StylesProvider } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';

import './App.css';
import { allSkins, allResourcePacks, allMaps } from './dummyData.js';

import Landing from './views/Landing';
import ViewResource from './views/ViewResourcePack'; 
import ViewSkin from './views/ViewSkin';
import ViewMap from './views/ViewMap';
import EditMap from './views/EditMap';
import EditSkin from './views/EditSkin';
import EditTexture from './views/EditTexture';
import Account from './views/Account';

import Header from './components/Header';
import SignInModal from './components/SignInModal';
import { logout, getAllUsers } from './actions/user';

const emptySkin = [["#fff", "ffff", "#fff", "ffff"],
                   ["#fff", "ffff", "#fff", "ffff"],
                   ["#fff", "ffff", "#fff", "ffff", "#fff", "ffff", "#fff", "ffff"],
                   ["#fff", "ffff", "#fff", "ffff", "#fff", "ffff", "#fff", "ffff"],
                   ["#fff", "ffff", "#fff", "ffff", "#fff", "ffff", "#fff", "ffff"],
                   ["#fff", "ffff", "#fff", "ffff", "#fff", "ffff", "#fff", "ffff"],
                   ["#fff", "ffff", "#fff", "ffff"],
                   ["#fff", "ffff", "#fff", "ffff"],
                   ["#fff", "ffff", "#fff", "ffff"],
                   ["#fff", "ffff", "#fff", "ffff"]];

export default function App() {
  const [currUser, setCurrUser] = useState(null);

  const [open, setOpen] = useState(false);
  const [allUsers, setAllUsers] = useState(null)

  useEffect(() => {
    getAllUsers(setAllUsers)
  }, [])

  const [snackbar, setSnackbar] = useState({
                                            open: false,
                                            message: '',
                                            color: 'black',
                                          });
  
  const handleClickOpen = () => {
    if (currUser) {
      logout(setCurrUser)
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
            <Route exact path="/" children={<Landing allUsers={allUsers} allSkins={allSkins} allMaps={allMaps} allResourcePacks={allResourcePacks}/>} />

            <Route exact path="/map/:mapId" children={<ViewMap allMaps={allMaps} currUser={currUser} />}/>
            <Route exact path="/resource/:resourceId" children={<ViewResource allResourcePacks={allResourcePacks} currUser={currUser} />}/>
            <Route exact path="/skin/:skinId" children={<ViewSkin allSkins={allSkins} currUser={currUser} />}/>
            
            {currUser
              ? <Route exact path="/account" children={<Account
                                                        currUser={currUser}
                                                        allUsers={allUsers}
                                                        allMaps={allMaps}
                                                        allResourcePacks={allResourcePacks}
                                                        handleSnackbarClick={handleSnackbarClick}
                                                        setCurrUser={setCurrUser}
                                                      />}
                  />
              : <Redirect exact to="/" allUsers={allUsers} allSkins={allSkins} allMaps={allMaps}/>
            }
            


          </Switch>
          </content>          
        </div>
      </Router>
      </StylesProvider>
  );
}
