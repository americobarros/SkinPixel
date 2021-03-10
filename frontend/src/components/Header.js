import { Fragment, useState } from 'react';
import { Link } from "react-router-dom";

import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
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
  
export default function Header(props) {
  const { currUser, handleClickOpen } = props;

  const [loggedIn, setLoggedIn] = useState(false);

  return (
      <Fragment>
        <HideOnScroll {...props}>
          <AppBar className="AppBarStyle">
            <Toolbar>
              <Link to="/" className="title">
                <h2>SkinPixel</h2>
              </Link>
              { currUser && (
                <>
                  <Link to="/account" style={{ textDecoration: 'none' }}>
                    <Button className="AppBarButton">
                      Account
                    </Button>
                  </Link>
                  <Divider orientation="vertical" flexItem className="AppBarDivider" />
                </>
              )}
              <Button className="AppBarButton" onClick={handleClickOpen}>
                {currUser 
                  ? <>Sign Out</>
                  : <>Sign In</>
                }
              </Button>
            </Toolbar>
          </AppBar>
        </HideOnScroll>
        <Toolbar />
      </Fragment>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};
  