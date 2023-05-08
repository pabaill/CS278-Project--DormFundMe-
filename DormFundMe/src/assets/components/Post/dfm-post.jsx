import {Typography, Paper, Modal, Box, Button} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import "./dfm-post.css";
import { useState } from 'react';
import DFMEventModal from "../EventModal/dfm-event-modal";

const dateOptions = {weekday: 'long', month: 'numeric', day: 'numeric'};

function DFMPost({post}) {

    const [modalOpen, handleOpen] = useState(false);
    
    return (
        <div>
            <Paper elevation={5} className='dfm-post-paper'>
                <div className='dfm-post-buttons'>
                    {/* TODO: Make icons buttons that are interactive */}
                    <KeyboardArrowUpIcon />
                    <Typography variant="button">{post.upvotes}</Typography>
                    <KeyboardArrowDownIcon />
                </div>
                <div className='dfm-post-info' onClick={() => handleOpen(true)}>
                    <Typography variant="body1">{post.title}</Typography>
                    <Typography variant="caption">{post.date.toLocaleDateString('en-US', dateOptions)} at {post.date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</Typography>
                </div>
            </Paper>
            <DFMEventModal post={post} modalOpen={modalOpen} handleOpen={handleOpen} dateOptions={dateOptions} />
        </div>
    )
}

export default DFMPost