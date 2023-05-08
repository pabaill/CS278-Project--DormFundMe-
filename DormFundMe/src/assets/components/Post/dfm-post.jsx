import {Typography, Paper, Modal, Box, Button} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CloseIcon from '@mui/icons-material/Close';
import "./dfm-post.css";
import { useState } from 'react';

const dateOptions = {weekday: 'long', month: 'numeric', day: 'numeric'};

function DFMPost({post}) {

    const [modalOpen, handleOpen] = useState(false);
    
    return (
        <div>
            <Paper elevation={5} className='dfm-post-paper'>
                <div className='dfm-post-buttons'>
                    <KeyboardArrowUpIcon />
                    <Typography variant="button">{post.upvotes}</Typography>
                    <KeyboardArrowDownIcon />
                </div>
                <div className='dfm-post-info' onClick={() => handleOpen(true)}>
                    <Typography variant="body1">{post.title}</Typography>
                    <Typography variant="caption">{post.date.toLocaleDateString('en-US', dateOptions)} at {post.date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</Typography>
                </div>
            </Paper>
            <Modal open={modalOpen} onClose={() => handleOpen(false)}>
                <Box className='dfm-post-modal'>
                    <header>
                        <Typography variant="h3" style={{textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden"}}>
                            {post.title}
                        </Typography>
                    </header>
                    <CloseIcon onClick={() => handleOpen(false)} className="dfm-post-modal-close"></CloseIcon>
                    <div className='dfm-post-modal-info'>
                        <Typography variant="body1">
                        {post.date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} on {post.date.toLocaleDateString('en-US', dateOptions)}
                        </Typography>
                        <Typography variant="body1">
                            {post.author}
                        </Typography>
                        <Typography variant="body2">
                        {post.description}
                        </Typography>
                    </div>
                    <img className='dfm-post-image' src={post.image}></img>
                    {/* TODO: Display comments */}
                </Box>
            </Modal>
        </div>
    )
}

export default DFMPost