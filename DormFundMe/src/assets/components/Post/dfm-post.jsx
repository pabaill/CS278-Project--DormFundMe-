import {Typography, Paper, Modal, Box, Button} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import "./dfm-post.css";
import { useState } from 'react';
import DFMEventModal from "../EventModal/dfm-event-modal";
import {get, set, ref, getDatabase, child} from 'firebase/database'

const dateOptions = {weekday: 'long', month: 'numeric', day: 'numeric'};

function DFMPost({post, user}) {

    const [modalOpen, handleOpen] = useState(false);
    const [upvotes, changeUpvotes] = useState(Object.values(post.upvotes).reduce((a, b) => a + b, 0));

    const handleUpvotes = () => {
        const dbRef = ref(getDatabase());
        const db = getDatabase();
        get(child(dbRef, `posts/${post._id}`)).then((snapshot) => {
            post = snapshot.val();
            const data = snapshot.val().upvotes;
            if (!Object.keys(data).includes(user._id) || data[user._id] < 1) {
                set(ref(db, `posts/${post._id}/upvotes/${user._id}`), data[user._id] ? data[user._id] + 1 : 1);
                changeUpvotes(upvotes + 1);
            }
        });
    }

    const handleDownvotes = () => {
        const dbRef = ref(getDatabase());
        const db = getDatabase();
        get(child(dbRef, `posts/${post._id}`)).then((snapshot) => {
            post = snapshot.val();
            const data = snapshot.val().upvotes;
            if (!Object.keys(data).includes(user._id) || data[user._id] > -1) {
                set(ref(db, `posts/${post._id}/upvotes/${user._id}`), data[user._id] ? data[user._id] - 1 : -1);
                changeUpvotes(upvotes - 1);
            }
        });
    }
    
    return (
        <div>
            <Paper elevation={5} className='dfm-post-paper'>
                <div className='dfm-post-buttons'>
                    {/* TODO: Make icons buttons that are interactive */}
                    <KeyboardArrowUpIcon style={{cursor: 'pointer', color: Object.keys(post.upvotes).includes(user._id) && post.upvotes[user._id] === 1 ? '#6aa84f' : "inherit"}} onClick={() => handleUpvotes()}/>
                    <Typography variant="button" color="primary">{upvotes}</Typography>
                    <KeyboardArrowDownIcon style={{cursor: 'pointer', color: Object.keys(post.upvotes).includes(user._id) && post.upvotes[user._id] === -1 ? '#6aa84f' : "inherit"}} onClick={() => handleDownvotes()}/>
                </div>
                <div className='dfm-post-info' onClick={() => handleOpen(true)}>
                    <Typography variant="body1">{post.title}</Typography>
                    <Typography variant="caption">{new Date(post.date).toLocaleDateString('en-US', dateOptions)} at {new Date(post.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</Typography>
                </div>
            </Paper>
            <DFMEventModal user={user} post={post} modalOpen={modalOpen} handleOpen={handleOpen} dateOptions={dateOptions} />
        </div>
    )
}

export default DFMPost