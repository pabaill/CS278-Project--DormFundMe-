import {Typography, Paper} from '@mui/material';
import "./dfm-calendar.css";
import Calendar from 'react-calendar';
import React, { useState } from 'react';

const dormname = "DORMNAME";

function DFMCalendar({posts}) {
    const top = {
        // Other styles
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center'
    }

    const makeAlert = (value) => {
        alert('This date is: ' + value.getMonth() + '/' + value.getDate());
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
        // TODO: "Add posts" button/menu, filtering of posts
        <Paper className='dfm-feed-paper'>
            <Typography variant='h4'>Calendar for {dormname}</Typography>
            <div style={top}>
                <Calendar
                    className="react-calendar"
                    onChange={onChange} 
                    value={value} 
                    minDate={firstDayF}
                    maxDate={lastDayF}
                    minDetail="year"
                    showNeighboringMonth={false}
                    onClickDay={(value) => makeAlert(value)} 
                />
                <Calendar 
                    onChange={onChange} 
                    value={value} 
                    minDate={firstDayS}
                    maxDate={lastDayS}
                    minDetail="year"
                    showNeighboringMonth={false}
                    onClickDay={(value) => makeAlert(value)} 
                />
                <Calendar 
                    onChange={onChange}  
                    value={value} 
                    minDate={firstDayT}
                    maxDate={lastDayT}
                    minDetail="year"
                    showNeighboringMonth={false}
                    onClickDay={(value) => makeAlert(value)} 
                />
            </div>
        </Paper>
    );
}

export default DFMCalendar
