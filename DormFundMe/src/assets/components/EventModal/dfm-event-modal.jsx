import {Typography, Modal, Box, TextField, MobileStepper, Button, Select, MenuItem, FormControl, InputLabel} from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import FlagIcon from '@mui/icons-material/Flag';
import "./dfm-event-modal.css";
import { useEffect, useState } from 'react';



function DFMEventModal({post, posts, modalOpen, handleOpen, dateOptions, setPostsToHighlight}) {
    const [index, changeIndex] = useState(0);
    const [postToShow, changePostToShow] = useState(post === -1 ? posts[0] : post);
    const [flagModalIsOpen, changeFlagModalOpen] = useState(false);
    useEffect(() => {
        if (changePostToShow) {
            if ( posts && posts.length > 1) {
                changePostToShow(posts[0]);
            } else if (post !== postToShow) {
                changePostToShow(post);
            }
        }
    }, [post, posts])

    const handleClose = () => {
        handleOpen(false);
        if (setPostsToHighlight) {
            setPostsToHighlight([]);
        }
        if (changeIndex) {
            changeIndex(0);
        }
    }

    const selectFlag = (flag) => {
        console.log(flag);
    }

    return (
        <div>
        <Modal open={modalOpen} onClose={handleClose}>
                <Box className='dfm-post-modal'>
                    <header>
                        <Typography variant="h3" style={{textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden"}}>
                            {postToShow.title}
                        </Typography>
                    </header>
                    <CloseIcon onClick={() => handleOpen(false)} className="dfm-post-modal-close" />
                    <FlagIcon onClick={() => changeFlagModalOpen(true)} className="dfm-post-modal-flag" />
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
            <Modal open={flagModalIsOpen} onClose={() => {changeFlagModalOpen(false)}}>
                    <Box className='dfm-post-flag-modal'>
                        <Typography variant='h4'>Report this Post</Typography>
                        <Typography variant='caption'>Sorry you had to see that. Let us know why this post wasn't helpful for you and we'll hide it from your feed. If this post meets the flag threshold for this dorm it will be removed and manually reviewed by your staff team.</Typography>
                        <CloseIcon onClick={() => changeFlagModalOpen(false)} className="dfm-post-modal-close" />
                        <FormControl>
                            <InputLabel id="flag-label">Flag Type</InputLabel>
                            <Select
                                labelId="flag-label"
                                id="flag-select"
                                label="Flag Type"
                                defaultValue={"Offensive Speech"}
                            >
                                <MenuItem value={"Offensive Speech"}>Offensive Speech</MenuItem>
                                <MenuItem value={"Meme Event/Disingenuine Proposal"}>Meme Event/Disingenuine Proposal</MenuItem>
                                <MenuItem value={"Spam"}>Spam</MenuItem>
                                <MenuItem value={"Other (Request Staff Review)"}>Other (Request Staff Review)</MenuItem>
                            </Select>
                            <Button color='primary' onClick={() => {setFlag(document.getElementById("flag-select").value)}}>Submit</Button>
                            <Button color='error' onClick={() => changeFlagModalOpen(false)}>Cancel</Button>
                        </FormControl>
                    </Box>
                </Modal>
            </div>
    )
}

export default DFMEventModal;