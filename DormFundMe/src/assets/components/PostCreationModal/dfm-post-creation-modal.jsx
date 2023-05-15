import { Typography, Modal, Box, Button, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import "./dfm-post-creation-modal.css";


function DFMPostCreateModal({ modalOpen, handleOpen }) {
    return (
        <Modal open={modalOpen} onClose={() => handleOpen(false)}>
            <Box className='dfm-post-creation-modal'>
                <header>
                    <Typography variant="h3" style={{ textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }}>
                        Submit a Proposal!
                        </Typography>
                </header>
                <CloseIcon onClick={() => handleOpen(false)} className="dfm-post-creation-modal-close"></CloseIcon>
                <div className='dfm-post-creation-modal-info'>
                    <TextField className='dfm-post-name-field' label="Event Name" variant='outlined' />
                    <TextField className='dfm-post-description-field' label="Description" variant='outlined' />
                    <TextField className='dfm-post-location-field' label="Location" variant='outlined' />
                    <TextField className='dfm-post-timeline-field' label="Timeline" variant='outlined' />
                    <TextField className='dfm-post-benefit-field' label="Who would benefit?" variant='outlined' />
                    <TextField className='dfm-post-budget-field' label="Approximate Budget" variant='outlined' />
                    <input style={{ display: 'none' }} accept="image/*" type="file" id="select-image" />
                    <label className='dfm-post-upload-image-field' htmlFor="select-image">
                        <Button variant="outlined" color="primary" component="span">
                            Upload Image
                        </Button>
                    </label>
                </div>
                <div>
                    <Button type='submit' variant='outlined'>Submit</Button>
                    <Button type='submit' variant='outlined' color='warning'>Save for Later</Button>
                    <Button type='submit' variant='outlined' color='error'>Delete</Button>
                </div>
            </Box>
        </Modal>
    )
}

export default DFMPostCreateModal;