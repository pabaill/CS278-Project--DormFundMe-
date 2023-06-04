import { Button, Typography, Paper, Box } from '@mui/material';
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
        <div className='dfm-feed-wrapper'>
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
            <Paper className='dfm-exp-paper'>
                <Box>
                    <Typography variant='h5'>Expectations</Typography>
                    <Typography variant='body1'>Welcome to the {dormname} DormFundMe Community!</Typography>
                    <Typography variant='body2' align='left'>
                        <ol>
                            <li>Post ideas that are realistic and accessible to everyone.</li>
                            <li>Hate speech and harassment will not be tolerated. Flag posts that feature harmful content to remove them. </li>
                            <li>On the platform, you will only be identifiable by your username. If a harmful post from your account is flagged, <b>your identity will be revealed</b> and you will face consequences as a resident of {dormname}. </li>
                        </ol>
                    </Typography>
                </Box>
            </Paper>
        </div>
    );
}

export default DFMFeed