import './App.css'
import {ThemeProvider, createTheme} from '@mui/material';
import { themeOptions } from './assets/theme/theme';
import DFMNavBar from './assets/components/NavBar/dfm-nav-bar';
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DFMFeed from './assets/components/Feed/dfm-feed';
import DFMProfile from './assets/components/Profile/dfm-profile';
import DFMCalendar from './assets/components/Calendar/dfm-calendar';
import DFMLogin from './assets/components/Login/dfm-login';

function App() {
  // Dummy posts for testing
  const sample_desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tortor at auctor urna nunc. Sit amet luctus venenatis lectus magna. Nisl nunc mi ipsum faucibus. Vel risus commodo viverra maecenas. Leo vel orci porta non pulvinar neque. "
  const stock_img = "https://images.megapixl.com/2219/22193936.jpg";
  const default_posts = [{
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
  const [currPage, changePage] = useState(document.location.pathname);
  const [isLoggedIn, logIn] = useState(false);
  const[posts, changePosts] = useState(default_posts);

  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
        {isLoggedIn ? (
            <DFMNavBar changePage={changePage} currPage={currPage} />
          ) : (
            <Navigate to="/login" replace={true} />
          )
        }
            <div className='dfm-page'>
              <Routes path="/">
                  <Route exact path="login" element={<DFMLogin logIn={logIn} changePage={changePage}/>} />
                  <Route index path="feed" element={<DFMFeed posts={posts} changePosts={changePosts} />} />
                  <Route path="calendar" element={<DFMCalendar posts={posts} />} />
                  <Route path="profile" element={<DFMProfile logIn={logIn} />} />
                  <Route path="*" element={<Navigate to={isLoggedIn ? "/feed" : "/login"} replace={true} />} />
              </Routes>
            </div>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App
