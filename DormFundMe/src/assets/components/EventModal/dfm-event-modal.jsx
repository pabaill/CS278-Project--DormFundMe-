import {Typography, Modal, Box, TextField, MobileStepper, Button, Select, MenuItem, FormControl, InputLabel, Paper} from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import FlagIcon from '@mui/icons-material/Flag';
import RateReviewIcon from '@mui/icons-material/RateReview';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import "./dfm-event-modal.css";
import { useEffect, useState } from 'react';
import { getDatabase, set, ref, get, child } from 'firebase/database';
import { MobileDateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';



function DFMEventModal({post, posts, modalOpen, handleOpen, dateOptions, setPostsToHighlight, user}) {
    const [index, changeIndex] = useState(0);
    const [postToShow, changePostToShow] = useState(post === -1 ? posts[0] : post);
    const [flagModalIsOpen, changeFlagModalOpen] = useState(false);
    const [commentModalIsOpen, changeCommentModalOpen] = useState(false);
    const [suggestionType, changeSuggestionType] = useState("");
    const [suggestionValue, changeSuggestionValue] = useState("");
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
        // const commentId = user._id + (new Date()).valueOf();
        // set(ref(getDatabase(), `posts/${post._id}/comments/${commentId}`), {/*ADD COMMENT OBJECT HERE*/})
        // To access comments: Object.values(post.comments).map(c => <div>{c.changeType}</div>)
    }

    const submitComment = () => {
        const commentId = user._id + (new Date()).valueOf();
        set(ref(getDatabase(), `posts/${post._id}/comments/${commentId}`), {
            user: user.username,
            suggestionType: suggestionType,
            suggestionValue: suggestionType === "time" ? suggestionValue.valueOf() : suggestionValue,
            reason: document.getElementById("why-the-change").value
        });
        get(child(ref(getDatabase()), `posts/${post._id}`)).then((snapshot) => {
            post = snapshot.val();
            changeSuggestionType("");
            changeSuggestionValue("");
        });
    }

    const updateParameter = (field, val) => {
        console.log(val)
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
                    <RateReviewIcon onClick={() => changeCommentModalOpen(true)} className="dfm-post-modal-comment" />
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
                        <ul className='dfm-feed-post-list'>
                            {post.comments ? Object.values(post.comments).map(c => (
                                <li>
                                    <Paper style={{display: "grid", gridTemplateColumns: "70% 10%"}}>
                                    <div>
                                        <Typography variant="body1">User {c.user} suggests...</Typography>
                                        <Typography variant="caption">Changing {c.suggestionType !== "other" ? `${c.suggestionType} to ${c.suggestionValue}` : `${c.suggestionValue}`}</Typography>
                                        <Typography variant="body2"><b>Reason?</b>: {c.reason}</Typography>
                                    </div>
                                    {user.username === post.author ? <Button color='primary'>Accept?</Button> : ""}
                                    </Paper>
                                </li>
                            )) : ""}
                        </ul>
                    </div>
                    <img className='dfm-post-image' src={post.image}></img>
                    
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
                        <Typography style={{marginBottom: "20px"}} variant='caption'>Sorry you had to see that. Let us know why this post wasn't helpful for you and we'll hide it from your feed. If this post meets the flag threshold for this dorm it will be removed and manually reviewed by your staff team.</Typography>
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
            <Modal open={commentModalIsOpen} onClose={() => {changeCommentModalOpen(false)}}>
                    <Box className='dfm-post-comment-modal'>
                        <Typography variant='h4'>Propose a Suggestion</Typography>
                        <Typography variant='caption'>Perfect doesn't happen on the first try. What do you think we should do differently about this proposed event?</Typography>
                        <CloseIcon onClick={() => changeCommentModalOpen(false)} className="dfm-post-modal-close" />
                        <div className='dfm-post-comment-column-div'>
                            <div className='dfm-post-creation-modal-info-col-1'>
                                <FormControl>
                                    <InputLabel id="type-label">I want to change the...</InputLabel>
                                    <Select
                                        defaultValue={0}
                                        onChange={(e) => changeSuggestionType(e.target.value)}
                                    >
                                    <MenuItem value={"budget"}>Budget</MenuItem>
                                    <MenuItem value={"location"}>Location</MenuItem>
                                    <MenuItem value={"time"}>Time</MenuItem>
                                    <MenuItem value={"other"}>Other</MenuItem>
                                    </Select>
                                </FormControl>                                
                            </div>
                            <div className='dfm-post-creation-modal-info-col-2'>
                                {suggestionType === "budget" ? 
                                    <FormControl>
                                            <InputLabel id="budget-label">Approximate Budget</InputLabel>
                                            <Select onChange={(e) => changeSuggestionValue(e.target.value)}>
                                                <MenuItem value={0}>Small ($0-$99)</MenuItem>
                                                <MenuItem value={100}>Medium ($100-$299)</MenuItem>
                                                <MenuItem value={300}>Large ($300-$999)</MenuItem>
                                                <MenuItem value={1000}>Extra Large ($1000+)</MenuItem>
                                            </Select>
                                    </FormControl> : ""
                                }
                                {suggestionType === "location" ? 
                                    <div className='dfm-post-creation-modal-inner'>
                                        <TextField onChange={(e) => changeSuggestionValue(e.target.value)} className='dfm-post-name-field' label='New Location' variant='outlined'/>
                                    </div> : ""
                                }
                                {suggestionType === "time" ? 
                                    <div className='dfm-post-creation-modal-inner'>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <MobileDateTimePicker onChange={(e) => changeSuggestionValue(e.target.value)} label="New Event Time" defaultValue={dayjs(new Date())}/>
                                        </LocalizationProvider>
                                    </div> : ""
                                }
                                {suggestionType === "other" ? 
                                    <div className='dfm-post-creation-modal-inner'>
                                        <TextField onChange={(e) => changeSuggestionValue(e.target.value)} className='dfm-post-name-field' label='Your Suggestion' variant='outlined'/>
                                    </div> : ""
                                }                          
                                <TextField id="why-the-change" className='dfm-post-name-field' label='Why the change?' variant='outlined'/>
                            </div>
                        </div>
                        
                        <FormControl>
                            <Button color='primary' onClick={() => {submitComment()}}>Submit</Button>
                            <Button color='error' onClick={() => changeCommentModalOpen(false)}>Cancel</Button>
                        </FormControl>
                    </Box>

            </Modal>
            </div>
    )
}

export default DFMEventModal;