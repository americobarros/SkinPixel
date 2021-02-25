import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

import './SignInModal.css';

export default function SignInModal(props) {  
    const { open, handleClose } = props;

    function handleEmail(e) {
        console.log(e.target.value)
    }

    function handlePassword(e) {
        console.log(e.target.value)
    }

    return (
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogTitle id="alert-dialog-title">{"Sign In"}</DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </DialogContentText>
            <TextField className="TextFieldStyle" label="Email" variant="outlined" style={{ marginBottom: '10px' }} onChange={handleEmail} />
            <TextField className="TextFieldStyle" label="Password" variant="outlined" onChange={handlePassword} />
        </DialogContent>
        <DialogActions>
        <Button onClick={handleClose} color="primary" autoFocus>
            Close
        </Button>
        </DialogActions>
    </Dialog>
    );
  }
  