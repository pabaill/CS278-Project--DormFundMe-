import {Select, MenuItem, Button, FormControl, FormHelperText, Input, InputLabel, Typography, Paper, Avatar, Box} from '@mui/material';
import "./dfm-profile.css";
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { get, set, child, ref, getDatabase } from 'firebase/database';
import DFMEventModal from '../EventModal/dfm-event-modal';

const dateOptions = {weekday: 'long', month: 'numeric', day: 'numeric'};

function DFMProfile({profileCreate, logIn, changePage, user}) {

    const [isAdmin, updatePrivileges] = useState(false);
    const [postsToApprove, setApprovePosts] = useState([]);
    const [inPreview, setOpenPreview] = useState(false);
    const [error, setError] = useState("");
    const [postsToReview, setReviewPosts] = useState([]);

    useEffect(() => {
        get(child(ref(getDatabase()), `info`)).then((snapshot) => {
            const data = snapshot.val();
            updatePrivileges(data.admins.includes(user._id));
            get(child(ref(getDatabase()), `posts`)).then((snapshot) => {
                const posts = snapshot.val();
                setApprovePosts(Object.values(posts).map(p => Object.values(p.upvotes).length >= data.upvoteThreshold ? p : '').filter(String));
                setReviewPosts(Object.values(posts).map(p => Object.values(p.flags).length >= data.flagThreshold ? p : '').filter(String));
            });
        });
    }, [user, error])

    const setProfileInfo = (username) => {
        setError("Checking for matching usernames");
        get(child(ref(getDatabase()), `users`)).then((snapshot) => {
            const users = snapshot.val();
            if (!Object.values(users).find((u) => u.username === username && u._id !== user._id)) {
                set(ref(getDatabase(), `users/${user._id}/username`), username);
                user.username = username;
                setError("");
            } else {
                setError("This username is not available");
            }
        });
    }

    return (
        <Paper elevation={5} className='dfm-profile-paper'>
            <Typography position="absolute" variant="h4" textAlign="left">Profile for {user.realname}</Typography>
            <div className='dfm-profile-content'>
                <div className='dfm-profile-avatar-info-container'>
                    <Avatar className='dfm-profile-avatar'
                    alt={user.username} 
                    src={user.profile_picture}>
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
                            <Input id="new-username" aria-describedby="username-helper-text" defaultValue={user.username} />
                            <Typography variant='caption' color={error === 'This username is not available' ? 'error' : 'warning'} >{error}</Typography>
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
                    {isAdmin ? 
                        <div>
                        <Typography align='left' variant="h5">Admin Controls</Typography>
                        <div className="dfm-profile-info-update-container">
                            <div>
                                <Typography align='left' variant="h6">Posts to Approve</Typography>
                                <ul className='dfm-profile-post-view'>
                                    {postsToApprove.map(p1 => (
                                        <li key={p1._id} className='dfm-feed-post-list-item'>
                                            <Paper onClick={() => setOpenPreview(true)}>
                                                <Typography variant="body1">{p1.title}</Typography>
                                                <Button color='primary'>Approve</Button>
                                                <Button color='info'>Preview</Button>
                                                <Button color='error'>Reject</Button>
                                            </Paper>
                                            <DFMEventModal user={user} post={p1} modalOpen={inPreview} handleOpen={setOpenPreview} dateOptions={dateOptions} >
                                            </DFMEventModal>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <Typography align='left' variant="h6">Posts to Review</Typography>
                                <ul className='dfm-profile-post-view'>
                                    {postsToReview.map(p2 => (
                                        <li key={p2._id} className='dfm-feed-post-list-item'>
                                            <Paper onClick={() => setOpenPreview(true)}>
                                                <Typography variant="body1">{p2.title}</Typography>
                                                <Button color='primary'>Allow</Button>
                                                <Button color='info'>Review</Button>
                                                <Button color='error'>Delete</Button>
                                            </Paper>
                                            <DFMEventModal user={user} post={p2} modalOpen={inPreview} handleOpen={setOpenPreview} dateOptions={dateOptions} >
                                            </DFMEventModal>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>: <></>}
                </div>
            </div>
            <div>
                <Button type='submit' variant='outlined' onClick={() => setProfileInfo(document.getElementById("new-username").value)}>Save Changes</Button>
                <Button LinkComponent={Link} to="/login" type='submit' variant='outlined' onClick={() => logIn(false)} color='warning'>Logout</Button>
            </div>
        </Paper>
    )
}

export default DFMProfile;