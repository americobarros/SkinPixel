import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

import './SignInModal.css';
import { login } from '../actions/user';

export default function SignInModal(props) {  
    const { open, handleClose, setCurrUser, allUsers, handleSnackbarClick } = props;

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    function handleEmail(e) {
        var re = /\S+@\S+\.\S+/;
        if (re.test(e.target.value)) {
            setEmail(e.target.value);
            handleSnackbarClick({ message: "Email correct", color: 'green' })
        }
        else {
            handleSnackbarClick({ message: "Email is incorrect format", color: 'red' })
        }
    }

    function handlePassword(e) {
        setPassword(e.target.value)
    }

    function handleLogin() {
        const user = {
            email: email,
            password: password
        }

        login(user, setCurrUser)

        if (user) {
            handleSnackbarClick({ message: 'Success logging in!', color: 'green' });
        }
        else {
            handleSnackbarClick({ message: 'Error logging in', color: 'red' });
        }

        handleClose();
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
                Sign in for more functionality.
                </DialogContentText>
                <TextField className="TextFieldStyle" label="Email" variant="outlined" style={{ marginBottom: '10px' }} onChange={handleEmail} />
                <TextField className="TextFieldStyle" label="Password" variant="outlined" onChange={handlePassword} />
            </DialogContent>
            <DialogActions>
            <Button onClick={handleLogin} color="primary" autoFocus>
                Log In
            </Button>
            <Button onClick={handleClose} color="primary" autoFocus>
                Close
            </Button>
            </DialogActions>
        </Dialog>
    );
  }
  