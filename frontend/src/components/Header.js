import React, { useState } from 'react';

import {
  // BrowserRouter as Router,
  // Switch,
  // Route,
  Link,
  // useRouteMatch,
  // useParams
} from "react-router-dom";

import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import { StylesProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import './Header.css';


function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

function handleLogInOrOut() {
  console.log('logging in or logging out')
}
  
export default function Header(props) {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <StylesProvider injectFirst>
      <React.Fragment>
        <HideOnScroll {...props}>
          <AppBar className="AppBarStyle">
            <Toolbar>
              <h2 style={{ flexGrow: '1' }}>SkinPixel</h2>
              <Link to="/account" style={{ textDecoration: 'none' }}>
                <Button className="AppBarButton">
                  Account
                </Button>
              </Link>
              <Divider orientation="vertical" flexItem className="AppBarDivider" />
              <Button className="AppBarButton" onClick={handleLogInOrOut}>
                {loggedIn 
                  ? <>Log Out</>
                  : <>Log In</>
                }
              </Button>
            </Toolbar>
          </AppBar>
        </HideOnScroll>
        <Toolbar />
      </React.Fragment>
    </StylesProvider>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};
  