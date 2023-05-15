import { Box, Button } from "@mui/material";
import {Link} from "react-router-dom";
import logo from "./../../images/logo.png";
import "./dfm-login.css"

function DFMLogin({logIn, changePage}) {
    return (
        <Box className="dfm-login-box">
            <img src={logo} alt="Dorm Fund Me logo" />
            <Button LinkComponent={Link} to="/feed" variant="contained" onClick={() => {logIn(true); changePage("/feed")}}>Log In</Button>
        </Box>
    );
}

export default DFMLogin;