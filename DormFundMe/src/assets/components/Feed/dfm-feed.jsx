import { Button, Typography, Paper } from '@mui/material';
import "./dfm-feed.css";
import DFMPost from "../Post/dfm-post";
import { useEffect, useState } from 'react';
import DFMPostCreateModal from '../PostCreationModal/dfm-post-creation-modal';
import DFMEventModal from '../EventModal/dfm-event-modal';
import { useParams } from 'react-router-dom';
import { get, getDatabase, ref, child } from 'firebase/database';

const dateOptions = {weekday: 'long', month: 'numeric', day: 'numeric'};


function DFMFeed({posts, changePosts, user}) {
    const {post_id} = useParams()
    const [modalOpen, handleOpen] = useState(false);
    const [linkedOpen, handleLinkedOpen] = useState(post_id !== undefined);
    const [dormname, setDormName] = useState("");

    useEffect(() => {
        get(child(ref(getDatabase()), `info/dormName`)).then((snapshot) => {
            setDormName(snapshot.val());
        })
    }, [user])

    return (
        // TODO: "Add posts" button/menu, filtering of posts
        <Paper className='dfm-feed-paper'>
            <Typography variant='h4'>Trending in {dormname}</Typography>
            <Button variant="contained" id="New Post" onClick={() => handleOpen(true)}> 
                New Post
            </Button>
            <ul className='dfm-feed-post-list'>
                {Object.values(posts).sort((a,b) => b.date - a.date).map(p => (
                    <li key={p._id} className='dfm-feed-post-list-item'>
                        <DFMPost user={user} post={p}></DFMPost>
                    </li>
                ))}
            </ul>
            <DFMPostCreateModal user={user} modalOpen={modalOpen} handleOpen={handleOpen} changePosts={changePosts} posts={posts} />
            {post_id && post_id < posts.length ? (
                <DFMEventModal user={user} post={posts[post_id]} modalOpen={linkedOpen} handleOpen={handleLinkedOpen} dateOptions={dateOptions} ></DFMEventModal>
            ) : (<div />)}
        </Paper>
    );
}

export default DFMFeed