import {Typography, Paper} from '@mui/material';
import "./dfm-calendar.css";
import DFMPost from "../Post/dfm-post";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import React, { useState } from 'react';

const dormname = "DORMNAME";

const sample_desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tortor at auctor urna nunc. Sit amet luctus venenatis lectus magna. Nisl nunc mi ipsum faucibus. Vel risus commodo viverra maecenas. Leo vel orci porta non pulvinar neque. "
const stock_img = "https://images.megapixl.com/2219/22193936.jpg";

function DFMCalendar() {
    // Dummy posts for testing
    const posts = [{
        title: "Floor Dinner",
        upvotes: 10,
        date: new Date("05-09-2023"),
        author: "@anon-aardvark",
        description: sample_desc,
        image: stock_img
    },
    {
        title: "Ping Pong Tournament",
        upvotes: 4,
        date: new Date("05-23-2023"),
        author: "@some-guy",
        description: sample_desc,
        image: stock_img
    },
    {
        title: "Clothing Swap",
        upvotes: 2,
        date: new Date("05-14-2023"),
        author: "@third-floor-phantom",
        description: sample_desc,
        image: stock_img
    }
    ];
    const top = {
        // Other styles
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center'
    }
    const [value, onChange] = useState(new Date());

    const makeAlert = () => { 
        alert('New date is: ');
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
    

    return (
        // TODO: "Add posts" button/menu, filtering of posts
        <Paper className='dfm-feed-paper'>
            <Typography variant='h4'>Calendar for {dormname}</Typography>
            <div style={top}>
                <Calendar 
                    onChange={onChange} 
                    value={value} 
                    minDate={firstDayF}
                    maxDate={lastDayF}
                    minDetail="year"
                    showNeighboringMonth="false"
                    onClick={() => makeAlert()}
                />
                <Calendar 
                    onChange={onChange} 
                    value={value} 
                    minDate={firstDayS}
                    maxDate={lastDayS}
                    minDetail="year"
                    showNeighboringMonth="false"
                    onClick={() => makeAlert()}
                />
                <Calendar 
                    onChange={onChange} 
                    value={value} 
                    minDate={firstDayT}
                    maxDate={lastDayT}
                    minDetail="year"
                    showNeighboringMonth="false"
                    onClick={() => makeAlert()}
                />
            </div>
        </Paper>
    );
}

export default DFMCalendar
