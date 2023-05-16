import {Typography, Paper} from '@mui/material';
import "./dfm-calendar.css";
import Calendar from 'react-calendar';
import React, { useState } from 'react';
import DFMEventModal from "../EventModal/dfm-event-modal";
import { Padding } from '@mui/icons-material';


const dormname = "Yost";

const dateOptions = {weekday: 'long', month: 'numeric', day: 'numeric'};

function DFMCalendar({posts}) {
    const top = {
        // Other styles
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center',
    }

    const [modalOpen, handleOpen] = useState(false);
    const [count, setCount] = useState(0);

    const checkForEvents = (value) => {
        let array = posts
        let date1 = value
        console.log(value)
        for (let i = 0; i < array.length; i++) {
            let date2 = array[i].date
            if (date1 > date2) {
                console.log("Date 1 is greater than Date 2");
            } else if (date1 < date2) {
                console.log("Date 1 is less than Date 2");
            } else {
                handleOpen(true)
                setCount(i)
            }
        }
    }

    // hard coded values for first quarter
    const firstDayF = new Date(2023, 3, 4);
    const lastDayT = new Date(2023, 5, 12);
    // theoretically, should be able to calculate these
    // but can't make it work out :/
    const firstDayS = new Date (2023, 4, 1);
    const firstDayT = new Date (2023, 5, 1);

    const lastDayF = new Date (2023, 4, 0);
    const lastDayS = new Date (2023, 5, 0);
    
    const [value, onChange] = useState(new Date());
    return (
        <div>
        <Paper className='dfm-feed-paper'>
            <Typography variant='h4'>Calendar for {dormname}</Typography>
            <div style={top}>
                <Calendar
                    className="react-calendar"
                    onChange={onChange} 
                    value = {value} 
                    minDate={firstDayF}
                    maxDate={lastDayF}
                    minDetail="year"
                    showNeighboringMonth={false}
                    onClickDay={(value) => checkForEvents(value)} 
                />
                <Calendar 
                    onChange={onChange} 
                    value={value} 
                    minDate={firstDayS}
                    maxDate={lastDayS}
                    minDetail="year"
                    showNeighboringMonth={false}
                    onClickDay={(value) => checkForEvents(value)} 
                />
                <Calendar 
                    onChange={onChange}  
                    value={value} 
                    minDate={firstDayT}
                    maxDate={lastDayT}
                    minDetail="year"
                    showNeighboringMonth={false}
                    onClickDay={(value) => checkForEvents(value)} 
                />
            </div>
            
        </Paper>
        <DFMEventModal post={posts[count]} modalOpen={modalOpen} handleOpen={handleOpen} dateOptions={dateOptions} />

        </div>
    );
}

export default DFMCalendar
