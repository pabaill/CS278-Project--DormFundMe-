import { Box, Button, FormControl, TextField } from "@mui/material";
import {Link} from "react-router-dom";
import logo from "./../../images/logo.png";
import "./dfm-login.css"

function DFMLogin({logIn, changePage}) {
    return (
        <Box className="dfm-login-box">
            <img src={logo} alt="Dorm Fund Me logo" />
            <FormControl>
                <div className='dfm-login-input'>
                    <TextField id="username" label="Username" variant="outlined" />
                </div>
                <div className='dfm-login-input'>
                    <TextField id="password" type="password" label="Password" variant="outlined" />
                </div>
            </FormControl>
            <div className="dfm-login-buttons">
                <Button style={{margin: "10px"}} LinkComponent={Link} to="/feed" variant="contained" onClick={() => {logIn(true); changePage("/feed")}}>Log In</Button>
                <Button LinkComponent={Link} to="/feed" variant="contained" onClick={() => {logIn(true); changePage("/profile")}}>Create Account</Button>    
            </div>
        </Box>
    );
}

export default DFMLogin;