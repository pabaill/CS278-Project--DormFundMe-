import { Box, Button, FormControl, Modal, TextField, Typography } from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import logo from "./../../images/logo.png";
import "./dfm-login.css"
import DFMProfile from "../Profile/dfm-profile";
import { useState } from "react";

function DFMLogin({handleLogin, changePage}) {
    const [isCreatingAccount, toggleCreate] = useState(false);
    const navigate = useNavigate();
    return (
        <div>
            <Box className="dfm-login-box">
            <img src={logo} alt="Dorm Fund Me logo" />
            <Typography fontStyle="italic" variant="caption">"Stress Free Event Planning, All In One Place"</Typography>
            <FormControl>
                <div className='dfm-login-input'>
                    <TextField id="username" label="Username" variant="outlined" />
                </div>
                <div className='dfm-login-input'>
                    <TextField id="password" type="password" label="Password" variant="outlined" />
                </div>
            </FormControl>
            <div className="dfm-login-buttons">
                <Button style={{margin: "10px"}} variant="contained" onClick={() => handleLogin(navigate)}>Log In</Button>
                {/* <Button variant="contained" onClick={() => {toggleCreate(true)}}>Create Account</Button>     */}
            </div>
            </Box>
            {/* <Modal open={isCreatingAccount} onClose={() => toggleCreate(false)}>
                <DFMProfile profileCreate={true} logIn={logIn} changePage={changePage} />
            </Modal> */}
        </div>
    );
}

export default DFMLogin;