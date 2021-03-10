import { useState } from 'react';
import { Link } from "react-router-dom";

import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import SkinCard from '../components/SkinCard';

import './Account.css';

export default function Account(props) {
    const { currUser, allSkins, allUsers } = props;

    const [drawerItem, setDrawerItem] = useState("Account Settings");
    const [open, setOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    const handleClickOpen = (user) => {
        setUserToDelete(user)
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    function handleDeleteUser() {
        const index = allUsers.indexOf(userToDelete);

        if (index > -1) {
          allUsers.splice(index, 1);
        }
        handleClose();
    }

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to delete this user?
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Close
                </Button>
                <Button onClick={handleDeleteUser} color="secondary" autoFocus>
                    DELETE
                </Button>
                </DialogActions>
            </Dialog>
            <div className="drawer">
                <div style={{ marginTop: '80px' }} scroll="no">
                    {currUser.isAdmin
                        ? <>
                            {["Account Settings", "My Skins", "Admin Settings"].map((item, idx) =>
                                <div className="listItem" key={idx} onClick={() => setDrawerItem(item)}>
                                    {item}
                                </div>
                            )}
                        </>
                        : <>
                            {["Account Settings", "My Skins"].map((item, idx) =>
                                <div className="listItem" key={idx} onClick={() => setDrawerItem(item)}>
                                    {item}
                                </div>
                            )}
                        </>
                    }
                    
                </div>
            </div>
            <div id="main">
                {drawerItem === "Account Settings" && (
                    <>
                        <h2>Username</h2>
                        <Input className="mediumInput" placeholder="hannahbrooks" />
                        <h2>Change Password</h2>
                        <TextField className="TextFieldStyle" label="Old Password" variant="outlined" style={{ marginBottom: '10px' }} />
                        <TextField className="TextFieldStyle" label="New Password" variant="outlined" />
                        <h2>Bio</h2>
                        <Input className="fullInput" multiline placeholder="hi! if you're lost follow me :P" />
                        <h2>Email</h2>
                        <Input className="mediumInput" placeholder="hannah@skinpixel.com" />
                        <div><Button id="saveChanges" variant="outlined">Save Changes</Button></div>
                    </>
                )}

                {drawerItem === "My Skins" && (
                    <div id="skinsDisplay">
                        {allSkins.map(skin =>
                            <>
                                {skin.user.id == currUser.id && (
                                    <Link key={`link-${skin.id}`} to={`/skin/edit/${skin.id}`}>
                                        <SkinCard skin={skin} id={skin.id} />
                                    </Link>
                                )}
                            </>
                        )}
                    </div>
                )}

                {drawerItem === "Admin Settings" && (
                    <>
                        <h2>Remove Users</h2>
                        <div>
                            {allUsers.map((user, idx) =>
                                <div className="deleteUser" key={idx}>
                                    {user.username}
                                    <DeleteIcon style={{ cursor: 'pointer' }} onClick={() => handleClickOpen(user)}/>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
  