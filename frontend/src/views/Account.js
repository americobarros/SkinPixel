import { useState } from 'react';
import { Link } from "react-router-dom";

import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

import SkinCard from '../components/SkinCard';

import './Account.css';

export default function Account() {
    const [drawerItem, setDrawerItem] = useState("Account Settings");

    function handleDeleteUser(e) {
        console.log(e.target.value)
    }

    return (
        <div>
            <div className="drawer">
                <div style={{ marginTop: '80px' }} scroll="no">
                    {["Account Settings", "My Skins", "Admin Settings"].map((item, idx) =>
                        <div className="listItem" id={idx} onClick={() => setDrawerItem(item)}>
                            {item}
                        </div>
                    )}
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
                        {[1,2,3].map((_, idx) => <Link key={`link-${idx}`} to={`/skin/${idx}`}><SkinCard key={`skinCard-${idx}`}/></Link> )}
                    </div>
                )}

                {drawerItem === "Admin Settings" && (
                    <>
                        <h2>Remove Users</h2>
                        <div>
                            {["hannahbrooks", "americobarros", "ianchan", "penguin"].map((item, idx) =>
                                <div className="deleteUser" id={idx} onClick={handleDeleteUser}>
                                    {item} <DeleteIcon style={{ cursor: 'pointer' }} />
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
  