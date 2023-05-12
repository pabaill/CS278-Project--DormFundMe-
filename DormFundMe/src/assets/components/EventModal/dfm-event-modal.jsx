import {Typography, Modal, Box, TextField} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import "./dfm-event-modal.css";



function DFMEventModal({post, modalOpen, handleOpen, dateOptions}) {
    return (
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
                    <TextField className='dfm-post-new-comment-field' label="New Comment" variant='outlined' />
                </Box>
            </Modal>
    )
}

export default DFMEventModal;