import {Typography, Paper} from '@mui/material';
import "./dfm-calendar.css";
import Calendar from 'react-calendar';
import React, { useEffect, useState } from 'react';
import DFMEventModal from "../EventModal/dfm-event-modal";

const dormname = "Yost";

const dateOptions = {weekday: 'long', month: 'numeric', day: 'numeric'};

function DFMCalendar({posts}) {
    posts = Object.values(posts);

    const top = {
        // Other styles
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center',
    }

    const [modalOpen, handleOpen] = useState(false);
    const [count, setCount] = useState(0);
    const [highlightManyPosts, setPostsToHighlight] = useState([]);

    /* Comparison function for two date types */
    function isSameDay(a, b) {
        return a.getDate() === b.getDate() && a.getMonth() === b.getMonth();
        // if (a > b) {
        //     return 1;
        // } else if (a < b) {
        //     return -1;
        // } else {
        //     return 0;
        // }
    }

    let highlightedDates = posts.map((post) => new Date(post.date));

    useEffect(() => {
        highlightedDates = posts.map((post) => new Date(post.date));
    }, [posts]);

    /* used by onClickDay to check if there is an event on a clicked day */
    const checkForEvents = (value) => {
        let indices = highlightedDates.map((e, i) => isSameDay(e, value) ? i : '').filter(String)
        if (indices.length === 1) {
            setCount(indices[0]);
            setPostsToHighlight([]);
            handleOpen(true);
        } else if (indices.length > 1) {
            setPostsToHighlight(indices.map((i) => posts[i]));
            console.log(highlightManyPosts)
            handleOpen(true);
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
    
    /* Used by tileClassName in Calendar to highlight days with events */
    function tileClassName({ date }) {
        if (highlightedDates.find((eventDay) => isSameDay(eventDay, date))) {
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
        <DFMEventModal post={count === -1 ? -1 : posts[count]} posts={highlightManyPosts} modalOpen={modalOpen} handleOpen={handleOpen} dateOptions={dateOptions} setPostsToHighlight={setPostsToHighlight} />

        </div>
    );
}

export default DFMCalendar
