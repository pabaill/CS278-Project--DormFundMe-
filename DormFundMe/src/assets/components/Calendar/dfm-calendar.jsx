import {Typography, Paper} from '@mui/material';
import "./dfm-calendar.css";
import Calendar from 'react-calendar';
import React, { useState } from 'react';
import DFMEventModal from "../EventModal/dfm-event-modal";
import { Padding } from '@mui/icons-material';

/* NOTE: We do not support multiple events on the same date yet. */

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

    function isSameDay(a, b) {
        if (a > b) {
            return 1;
        } else if (a < b) {
            return -1;
        } else {
            return 0;
        }
    }
    const checkForEvents = (value) => {
        let array = posts
        let date1 = value
        for (let i = 0; i < array.length; i++) {
            let date2 = array[i].date
            if (isSameDay(date1, date2) === 0) {
                handleOpen(true);
                setCount(i);
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
    
    const highlightedDates = posts.map((post) => post.date)

    function tileClassName({ date, view }) {
        if (highlightedDates.find((eventDay) => isSameDay(eventDay, date) === 0)) {
            return 'highlight';
        }
    }
    
    return (
        <div>
        <Paper className='dfm-feed-paper'>
            <Typography variant='h4'>Calendar for {dormname}</Typography>
            <div style={top}>
                <Calendar
                    className="react-calendar"
                    tileClassName = {tileClassName}
                    onChange = {onChange} 
                    value = {value} 
                    minDate={firstDayF}
                    maxDate={lastDayF}
                    minDetail="year"
                    showNeighboringMonth={false}
                    onClickDay={(value) => checkForEvents(value)} 
                />
                <Calendar 
                    className="react-calendar"
                    tileClassName = {tileClassName}
                    onChange={onChange} 
                    value={value} 
                    minDate={firstDayS}
                    maxDate={lastDayS}
                    minDetail="year"
                    showNeighboringMonth={false}
                    onClickDay={(value) => checkForEvents(value)} 
                />
                <Calendar 
                    className="react-calendar"
                    tileClassName = {tileClassName}
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
