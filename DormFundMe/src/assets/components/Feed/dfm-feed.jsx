import { Button, Typography, Paper } from '@mui/material';
import "./dfm-feed.css";
import DFMPost from "../Post/dfm-post";
import { useState } from 'react';
import DFMPostCreateModal from '../PostCreationModal/dfm-post-creation-modal';

const dormname = "DORMNAME";

function DFMFeed({posts}) {

    const [modalOpen, handleOpen] = useState(false);

    return (
        // TODO: "Add posts" button/menu, filtering of posts
        <Paper className='dfm-feed-paper'>
            <Typography variant='h4'>Trending in {dormname}</Typography>
            <Button variant="contained" id="New Post" onClick={() => handleOpen(true)}> 
                New Post
            </Button>
            <ul className='dfm-feed-post-list'>
                {posts.map(p => (
                    <li key={p.author + p.date.toString()} className='dfm-feed-post-list-item'>
                        <DFMPost post={p}></DFMPost>
                    </li>
                ))}
            </ul>
            <DFMPostCreateModal modalOpen={modalOpen} handleOpen={handleOpen} />
        </Paper>
    );
}

export default DFMFeed