import {Select, MenuItem, Button, FormControl, FormHelperText, Input, InputLabel, Typography, Paper, Avatar, Box} from '@mui/material';
import "./dfm-profile.css";
import { Link } from 'react-router-dom';


function DFMProfile({profileCreate, logIn, changePage, user}) {

    return (
        <Paper elevation={5} className='dfm-profile-paper'>
            <Typography position="absolute" variant="h4" textAlign="left">Profile for {user.displayName}</Typography>
            <div className='dfm-profile-content'>
                <div className='dfm-profile-avatar-info-container'>
                    <Avatar className='dfm-profile-avatar'
                    alt={user.username} 
                    src={user.photoURL}>
                    </Avatar>
                    <Box className='dfm-profile-avatar-username-box'>
                        <Typography variant="h5" textAlign="center">
                            {user.username}
                        </Typography>
                    </Box>
                </div>
                <div>
                    <Typography align='left' variant="h5">Profile Info</Typography>
                    <div className="dfm-profile-info-update-container">
                        <FormControl className='dfm-profile-form-control'>
                            <InputLabel htmlFor="new-username">Username</InputLabel>
                            <Input id="new-username" aria-describedby="username-helper-text" defaultValue={user.email.split('@')[0]} />
                        </FormControl>
                        <FormControl>
                            <InputLabel id="remind-me-label">Remind Me</InputLabel>
                            <Select
                                labelId="remind-me-label"
                                id="event-reminders-select"
                                label="Remind Me"
                                defaultValue={1}
                            >
                                <MenuItem value={1}>1 Hour Before</MenuItem>
                                <MenuItem value={2}>1 Day Before</MenuItem>
                                <MenuItem value={3}>3 Days Before</MenuItem>
                                <MenuItem value={4}>1 Week Before</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl>
                            <InputLabel id="notification-label">Notify Me With</InputLabel>
                            <Select
                                labelId="notification-label"
                                id="notif-select"
                                label="Notify Me With"
                                defaultValue={1}
                            >
                                <MenuItem value={1}>Email</MenuItem>
                                <MenuItem value={2}>Text</MenuItem>
                                <MenuItem value={3}>None</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>
            </div>
            {profileCreate ? (
                <div>
                    <Button LinkComponent={Link} to="/profile" type='submit' variant='outlined' onClick={() => {logIn(true); changePage("/profile")}}>Save Changes</Button>
                </div>
            ) : (
                <div>
                    <Button type='submit' variant='outlined'>Save Changes</Button>
                    <Button LinkComponent={Link} to="/login" type='submit' variant='outlined' onClick={() => logIn(false)} color='warning'>Logout</Button>
                    <Button type='submit' variant='outlined' color='error'>Delete Profile</Button>
                </div>
            )}
        </Paper>
    )
}

export default DFMProfile;