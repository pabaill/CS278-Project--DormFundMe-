import { Typography, Modal, Box, Button, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { MobileDateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CloseIcon from '@mui/icons-material/Close';
import "./dfm-post-creation-modal.css";
import dayjs from 'dayjs';
import { useState } from 'react';
import { getDatabase, ref, set, get, child } from "firebase/database";

function DFMPostCreateModal({ modalOpen, handleOpen, changePosts, posts, user }) {
    const [fileUploaded, saveUploadedFile] = useState(undefined);
    const [newEvent, updateNewEvent] = useState({date: (new Date()).valueOf()})
    const onFileUpload = (e) => {
        if (e.target.files) {
            saveUploadedFile(e.target.files[0].name)
        }
    }

    const handleSubmit = () => {
        updateEvent("author", user.username);
        updateEvent("upvotes", {});
        updateEvent("image", "https://images.megapixl.com/2219/22193936.jpg");
        updateEvent("_id", user.username + newEvent.date.valueOf());
        updateEvent("flags", 0);
        console.log(newEvent);
        const db = getDatabase();
        set(ref(db, 'posts/' + newEvent._id), newEvent);
        set(ref(db, `posts/${newEvent._id}/upvotes/${user._id}`), 1);
        updateNewEvent({});
        handleOpen(false);
    }

    const updateEvent = (field, val) => {
        if (field === "date") {
            val = val.valueOf();
        }
        const updatedEvent = newEvent;
        updatedEvent[field] = val;
        updateNewEvent(updatedEvent);
    }

    return (
        <Modal open={modalOpen} onClose={() => handleOpen(false)}>
            <Box className='dfm-post-creation-modal'>
                <header>
                    <Typography variant="h3" style={{ textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }}>
                        Submit a Proposal!
                        </Typography>
                </header>
                <CloseIcon onClick={() => handleOpen(false)} className="dfm-post-creation-modal-close"></CloseIcon>
                <div className='dfm-post-creation-modal-info-col-1'>

                    <TextField className='dfm-post-name-field' label="Event Name" variant='outlined' onChange={(e) => updateEvent("title", e.target.value)} />
                    <TextField className='dfm-post-location-field' label="Location" variant='outlined' onChange={(e) => updateEvent("location", e.target.value)}  />
                    <TextField className='dfm-post-benefit-field' label="Who would benefit?" variant='outlined' onChange={(e) => updateEvent("benefit", e.target.value)} />
                    <input style={{ display: 'none' }} accept="image/*" type="file" id="select-image" onChange={(e) => onFileUpload(e)} />
                    <label htmlFor="select-image">
                        <Button variant="contained" color="primary" component="span">
                            Upload Image
                        </Button>
                        <Typography variant='caption'>{fileUploaded ? fileUploaded : ""}</Typography>
                    </label>
                </div>
                <div className='dfm-post-creation-modal-info-col-2'>
                    <TextField className='dfm-post-description-field' label="Description" variant='outlined' onChange={(e) => updateEvent("description", e.target.value)} />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <MobileDateTimePicker label="Event Date" defaultValue={dayjs(new Date())} openTo="day" onChange={(d) => updateEvent("date", d.$d)} />
                    </LocalizationProvider>

                    <FormControl>
                        <InputLabel id="budget-label">Approximate Budget</InputLabel>
                        <Select
                            labelId="budget-label"
                            id="budget-select"
                            label="Approximate Budget"
                            defaultValue={0}
                            onChange={(e) => updateEvent("budget", e.target.value)}
                        >
                            <MenuItem value={0}>Small ($0-$99)</MenuItem>
                            <MenuItem value={100}>Medium ($100-$299)</MenuItem>
                            <MenuItem value={300}>Large ($300-$999)</MenuItem>
                            <MenuItem value={1000}>Extra Large ($1000+)</MenuItem>
                        </Select>
                    </FormControl>


                    <div className="dfm-post-creation-modal-buttons">
                        <Button type='submit' variant='outlined' onClick={handleSubmit}>Submit</Button>
                        <Button type='submit' variant='outlined' color='warning'>Save Draft</Button>
                        <Button type='submit' variant='outlined' color='error'>Delete</Button>
                    </div>
                </div>

            </Box>
        </Modal>
    )
}

export default DFMPostCreateModal;