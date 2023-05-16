import { Typography, Modal, Box, Button, TextField, Select, MenuItem } from '@mui/material';
import { DatePicker, LocalizationProvider} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
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

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker label="Uncontrolled picker" defaultValue={dayjs('2022-04-17')} />
                    </LocalizationProvider>

                    <TextField className='dfm-post-timeline-field' label="Timeline" variant='outlined' />
                    <TextField className='dfm-post-benefit-field' label="Who would benefit?" variant='outlined' />
                    <Select
                        labelId="budget-label"
                        id="budget-select"
                        label="Approximate Budgget"
                        defaultValue={1}
                    >
                        <MenuItem value={1}>Small ($0-$99)</MenuItem>
                        <MenuItem value={2}>Medium ($100-$299)</MenuItem>
                        <MenuItem value={3}>Large ($300-$999)</MenuItem>
                        <MenuItem value={4}>Extra Large ($1000+)</MenuItem>
                    </Select>
                    <input style={{ display: 'none' }} accept="image/*" type="file" id="select-image" />
                    <label htmlFor="select-image">
                        <Button variant="contained" color="primary" component="span">
                            Upload Image
                        </Button>
                    </label>
                </div>
                <div className="dfm-post-creation-modal-buttons">
                    <Button type='submit' variant='outlined'>Submit</Button>
                    <Button type='submit' variant='outlined' color='warning'>Save Draft</Button>
                    <Button type='submit' variant='outlined' color='error'>Delete</Button>
                </div>
            </Box>
        </Modal>
    )
}

export default DFMPostCreateModal;