import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {getSkins} from "../actions/skin";

import SkinCard from '../components/SkinCard';

import './Account.css';

import { deleteUser, updateUser } from '../actions/user';

export default function Account(props) {
    const { currUser, allUsers, handleSnackbarClick, allMaps, allResourcePacks, setCurrUser} = props;

    const [drawerItem, setDrawerItem] = useState("Account Settings");
    const [open, setOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newBio, setNewBio] = useState("");
    const [newEmail, setNewEmail] = useState("");

    const handleClickOpen = (user) => {
        setUserToDelete(user)
        setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    function handleDeleteUser() {
        deleteUser(userToDelete);
        handleClose();
    }

    function SkinCards() {
        const [error, setError] = useState(null);
        const [isLoaded, setIsLoaded] = useState(false);
        const [items, setItems] = useState([]);
        useEffect(() => {
            getSkins(currUser)
                .then(
                    (result) => {
                        setIsLoaded(true);
                        setItems(result.skins);
                    },
                    (error) => {
                        setIsLoaded(true);
                        setError(error);
                    }
                )
        }, [])

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                    items.map(skin =>
                        <>
                            {(
                                <Link key={`link-${skin._id}`} to={`/skin/edit/${skin._id}`}>
                                    <SkinCard key={skin._id} skin={skin} id={skin._id}/>
                                </Link>
                            )}
                        </>
                    )
            );
        }
    }

    // function BuildSkinCards() {
    //     const [skins, setSkins] = useState([])
    //     useEffect(() => {
    //         getSkins(currUser)
    //             .then(json => {
    //                 json.skins.map((skin) => {
    //                     const curSkins = skins.slice();
    //                     curSkins.push(skin);
    //
    //                     setSkins(curSkins);
    //                 })
    //             })
    //     })
    //     return (
    //         <div>
    //             {
    //                 skins.map(skin =>
    //                     <>
    //                         {console.log(skin) &&
    //                         skin.user.id === currUser.id && (
    //                             <Link key={`link-${skin.id}`} to={`/skin/edit/${skin.id}`}>
    //                                 <SkinCard skin={skin} id={skin.id}/>
    //                             </Link>
    //                         )}
    //                     </>
    //                 )
    //             }
    //         </div>
    //
    //     )
    // }

    function handleSaveChanges() {
        let saveUsername = true, savePassword = true, saveEmail = true;

        let updatedUser = currUser;

        if (newUsername != "") {
            const userExists = allUsers.find(user => user.username == newUsername); // double check how allUsers comes back
            if (userExists) {
                handleSnackbarClick({ message: "User with this username exists", color: 'red' })
                saveUsername = false;
            }
        }
        if (newPassword != "" && oldPassword != "") {
            if (oldPassword != currUser.password ) {
                handleSnackbarClick({ message: "Passwords don't match", color: 'red' })
                savePassword = false;
            }

        }
        if (newBio != "") {
            updatedUser.bio = newBio;
        }
        if (newEmail != "") {
            var re = /\S+@\S+\.\S+/;
            if (!re.test(newEmail)) {
                handleSnackbarClick({ message: "Email is incorrect format", color: 'red' })
                saveEmail = false;
            }
        }

        if (saveUsername && savePassword && saveEmail) {
            if (saveUsername && newUsername != "") {
                updatedUser.username = newUsername
            }
            if (savePassword && newPassword != "") {
                updatedUser.password = newPassword
            }
            if (newBio != "") {
                updatedUser.bio = newBio
            }
            if (newEmail != "") {
                updatedUser.email = newEmail
            }

            updateUser(updatedUser, setCurrUser)

            handleSnackbarClick({ message: "Successfully saved changes", color: 'green' })
        }
    }

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete this user?"}</DialogTitle>
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
                <div id="settings" scroll="no">
                    {currUser.isAdmin
                        ? <>
                            {["Account Settings", "My Skins", "My Maps", "My Textures", "Admin Settings"].map((item, idx) =>
                                <div className="listItem" key={idx} onClick={() => setDrawerItem(item)}>
                                    {item}
                                </div>
                            )}
                        </>
                        : <>
                            {["Account Settings", "My Maps", "My Skins", "My Textures"].map((item, idx) =>
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
                        <Input className="mediumInput" placeholder={currUser.username} onChange={(e) => setNewUsername(e.target.value)} />
                        <h2>Change Password</h2>
                        <TextField className="TextFieldStyle" label="Old Password" variant="outlined" onChange={(e) => setOldPassword(e.target.value)}style={{ marginBottom: '10px' }} />
                        <TextField className="TextFieldStyle" label="New Password" variant="outlined" onChange={(e) => setNewPassword(e.target.value)}/>
                        <h2>Bio</h2>
                        <Input className="fullInput" multiline placeholder={currUser.bio} onChange={(e) => setNewBio(e.target.value)}/>
                        <h2>Email</h2>
                        <Input className="mediumInput" placeholder={currUser.email} onChange={(e) => setNewEmail(e.target.value)}/>
                        <div><Button id="saveChanges" variant="outlined" onClick={handleSaveChanges}>Save Changes</Button></div>
                    </>
                )}

                {drawerItem === "My Maps" && (
                    <>
                    <Link key={`link-newskin`} to={`/newmap`}>
                        <div className="newSkinButton">
                            <AddCircleIcon style={{ marginRight: '10px' }} />
                            <div>Add a New Map</div>
                        </div>
                    </Link>
                    <div id="skinsDisplay">
                        {allMaps.map(map =>
                            <>
                                {map.user.id == currUser.id && (
                                    <Link key={`link-${map.id}`} to={`/map/edit/${map.id}`}>
                                        <SkinCard skin={map} />
                                    </Link>
                                )}
                            </>
                        )}
                    </div>
                    </>
                )}

                {drawerItem === "My Skins" && (
                    <>
                    <Link key={`link-newskin`} to={`/newskin`}>
                        <div className="newSkinButton">
                            <AddCircleIcon style={{ marginRight: '10px' }} />
                            <div>Add a New Skin</div>
                        </div>
                    </Link>
                    <div id="skinsDisplay">
                        <SkinCards/>
                    </div>
                    </>
                )}

                {drawerItem === "My Textures" && (
                    <>
                    <Link key={`link-newskin`} to={`/newresource`}>
                        <div className="newSkinButton">
                            <AddCircleIcon style={{ marginRight: '10px' }} />
                            <div>Add a New Texture</div>
                        </div>
                    </Link>
                    <div id="skinsDisplay">
                        {allResourcePacks.map(resource =>
                            <>
                                {resource.user.id == currUser.id && (
                                    <Link key={`link-${resource.id}`} to={`/resource/edit/${resource.id}`}>
                                        <SkinCard skin={resource} />
                                    </Link>
                                )}
                            </>
                        )}
                    </div>
                    </>
                )}

                {currUser.isAdmin && drawerItem === "Admin Settings" && (
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
  