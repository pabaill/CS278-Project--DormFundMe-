import './App.css'
import {ThemeProvider, Typography, createTheme} from '@mui/material';
import { themeOptions } from './assets/theme/theme';
import DFMNavBar from './assets/components/NavBar/dfm-nav-bar';
import { useState } from 'react';
import DFMFeed from './assets/components/Feed/dfm-feed';
import DFMProfile from './assets/components/Profile/dfm-profile';
import DFMCalendar from './assets/components/Calendar/dfm-calendar';

function App() {
  // Dummy posts for testing
  const sample_desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tortor at auctor urna nunc. Sit amet luctus venenatis lectus magna. Nisl nunc mi ipsum faucibus. Vel risus commodo viverra maecenas. Leo vel orci porta non pulvinar neque. "
  const stock_img = "https://images.megapixl.com/2219/22193936.jpg";
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

  const theme = createTheme(themeOptions);
  const [currPage, changePage] = useState("feed");
  return (
    <>
      <ThemeProvider theme={theme}>
        <DFMNavBar changePage={changePage} />
        {currPage == "feed" ? (
        <div className="dfm-page">
          <DFMFeed posts={posts} />
        </div>
        ) : (<></>)}
        {currPage == "calendar" ? (
        <div className="dfm-page">
          <DFMCalendar posts={posts} />
        </div>
        ) : (<></>)}
        {currPage == "profile" ? (
        <div className="dfm-page">
          <DFMProfile />
        </div>
        ) : (<></>)}
      </ThemeProvider>
    </>
  );
}

export default App
