import {Typography, Modal, Box, TextField, MobileStepper, Button} from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import "./dfm-event-modal.css";
import { useEffect, useState } from 'react';



function DFMEventModal({post, posts, modalOpen, handleOpen, dateOptions, setPostsToHighlight}) {
    const [index, changeIndex] = useState(0);
    const [postToShow, changePostToShow] = useState(post === -1 ? posts[0] : post);
    useEffect(() => {
        if ( posts && posts.length > 1) {
            changePostToShow(posts[0]);
        } else if (post !== postToShow) {
            changePostToShow(post);
        }
    }, [post, posts])

    const handleClose = () => {
        handleOpen(false);
        setPostsToHighlight([]);
        changeIndex(0);
    }

    return (
        <Modal open={modalOpen} onClose={handleClose}>
                <Box className='dfm-post-modal'>
                    <header>
                        <Typography variant="h3" style={{textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden"}}>
                            {postToShow.title}
                        </Typography>
                    </header>
                    <CloseIcon onClick={() => handleOpen(false)} className="dfm-post-modal-close"></CloseIcon>
                    <div className='dfm-post-modal-info'>
                        <Typography variant="body1" color='primary'>
                        {new Date(postToShow.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} on {new Date(postToShow.date).toLocaleDateString('en-US', dateOptions)}
                        </Typography>
                        <Typography variant="body1">
                            {postToShow.author}
                        </Typography>
                        <Typography variant="body2">
                        {postToShow.description}
                        </Typography>
                    </div>
                    <img className='dfm-post-image' src={post.image}></img>
                    <TextField className='dfm-post-new-comment-field' label="New Comment" variant='outlined' />
                    {posts && posts.length > 1 ? 
                    <MobileStepper
                        variant="text"
                        steps={posts.length}
                        position="static"
                        activeStep={index}
                        nextButton={
                        <Button
                            size="small"
                            onClick={() => {changeIndex(index + 1); changePostToShow(posts[index + 1])}}
                            disabled={index === posts.length - 1}
                        >
                            <KeyboardArrowRight />
                        </Button>
                        }
                        backButton={
                        <Button size="small" onClick={() => {changeIndex(index - 1); changePostToShow(posts[index - 1])}} disabled={index === 0}>
                            <KeyboardArrowLeft />
                        </Button>
                        }
                    /> : <></>}
                </Box>
            </Modal>
    )
}

export default DFMEventModal;