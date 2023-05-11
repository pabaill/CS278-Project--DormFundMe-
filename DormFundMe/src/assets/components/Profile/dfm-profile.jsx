import {FormControl, FormHelperText, Input, InputLabel, Typography, Paper, Avatar, Box} from '@mui/material';
import "./dfm-profile.css";


function DFMProfile() {
    const DEF_USER = {
        name: "Person Person",
        username: "@that_guy",
        proflie_image: "brokenimage.jpg"
    }

    return (
        <Paper elevation={5} className='dfm-profile-paper'>
            <Typography position="absolute" variant="h4" textAlign="left">Profile</Typography>
            <div className='dfm-profile-avatar-info-container'>
                <Avatar className='dfm-profile-avatar'
                alt={DEF_USER.name} 
                src='https://upload.wikimedia.org/wikipedia/commons/c/c0/Nicolas_Cage_Deauville_2013.jpg'>
                </Avatar>
                <Box className='dfm-profile-avatar-username-box'>
                    <Typography variant="h5">
                        {DEF_USER.username}
                    </Typography>
                </Box>
            </div>
            <div>
                <Typography align='left' variant="h5">Profile Info</Typography>
                <div className="dfm-profile-info-update-container">
                    <FormControl>
                        <InputLabel htmlFor="new-username">Username</InputLabel>
                        <Input id="new-username" aria-describedby="username-helper-text" defaultValue={DEF_USER.username} />
                        <FormHelperText id="username-helper-text">Other users can see this!</FormHelperText>
                    </FormControl>
                </div>
            </div>
        </Paper>
    )
}

export default DFMProfile;