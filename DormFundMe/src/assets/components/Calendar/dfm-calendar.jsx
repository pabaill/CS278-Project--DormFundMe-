import {Typography, Paper} from '@mui/material';
import "./dfm-calendar.css";
import DFMPost from "../Post/dfm-post";

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
    
    return (
        // TODO: "Add posts" button/menu, filtering of posts
        <Paper className='dfm-feed-paper'>
            <Typography variant='h4'>Calendar for {dormname}</Typography>
            
        </Paper>
    );
}

export default DFMCalendar