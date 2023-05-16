import { Typography, Modal, Box, Button, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CloseIcon from '@mui/icons-material/Close';
import "./dfm-post-creation-modal.css";
import dayjs from 'dayjs';
import { useState } from 'react';

function DFMPostCreateModal({ modalOpen, handleOpen }) {
    const [fileUploaded, saveUploadedFile] = useState(undefined);
    const onFileUpload = (e) => {
        if (e.target.files) {
            saveUploadedFile(e.target.files[0].name)
        }
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

                    <TextField className='dfm-post-name-field' label="Event Name" variant='outlined' />
                    <TextField className='dfm-post-location-field' label="Location" variant='outlined' />
                    <TextField className='dfm-post-benefit-field' label="Who would benefit?" variant='outlined' />
                    <input style={{ display: 'none' }} accept="image/*" type="file" id="select-image" onChange={(e) => onFileUpload(e)} />
                    <label htmlFor="select-image">
                        <Button variant="contained" color="primary" component="span">
                            Upload Image
                        </Button>
                        <Typography variant='caption'>{fileUploaded ? fileUploaded : ""}</Typography>
                    </label>
                </div>
                <div className='dfm-post-creation-modal-info-col-2'>
                    <TextField className='dfm-post-description-field' label="Description" variant='outlined' />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker label="Event Date" defaultValue={dayjs(new Date())} />
                    </LocalizationProvider>

                    <FormControl>
                        <InputLabel id="budget-label">Approximate Budget</InputLabel>
                        <Select
                            labelId="budget-label"
                            id="budget-select"
                            label="Approximate Budget"
                            defaultValue={1}
                        >
                            <MenuItem value={1}>Small ($0-$99)</MenuItem>
                            <MenuItem value={2}>Medium ($100-$299)</MenuItem>
                            <MenuItem value={3}>Large ($300-$999)</MenuItem>
                            <MenuItem value={4}>Extra Large ($1000+)</MenuItem>
                        </Select>
                    </FormControl>


                    <div className="dfm-post-creation-modal-buttons">
                        <Button type='submit' variant='outlined'>Submit</Button>
                        <Button type='submit' variant='outlined' color='warning'>Save Draft</Button>
                        <Button type='submit' variant='outlined' color='error'>Delete</Button>
                    </div>
                </div>

            </Box>
        </Modal>
    )
}

export default DFMPostCreateModal;