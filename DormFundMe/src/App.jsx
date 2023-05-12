import './App.css'
import {ThemeProvider, Typography, createTheme} from '@mui/material';
import { themeOptions } from './assets/theme/theme';
import DFMNavBar from './assets/components/NavBar/dfm-nav-bar';
import { useState } from 'react';
import DFMFeed from './assets/components/Feed/dfm-feed';
import DFMProfile from './assets/components/Profile/dfm-profile';
import DFMCalendar from './assets/components/Calendar/dfm-calendar';

function App() {
  const theme = createTheme(themeOptions);
  const [currPage, changePage] = useState("feed");
  return (
    <>
      <ThemeProvider theme={theme}>
        <DFMNavBar changePage={changePage} />
        {currPage == "feed" ? (
        <div className="dfm-page">
          <DFMFeed />
        </div>
        ) : (<></>)}
        {currPage == "calendar" ? (
        <div className="dfm-page">
          <DFMCalendar />
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
