import './App.css'
import {ThemeProvider, Typography, createTheme} from '@mui/material';
import { themeOptions } from './assets/theme/theme';
import DFMNavBar from './assets/components/NavBar/dfm-nav-bar';
import { useState } from 'react';
import DFMFeed from './assets/components/Feed/dfm-feed';

function App() {
  const theme = createTheme(themeOptions);
  const [currPage, changePage] = useState("feed");
  return (
    <>
      <ThemeProvider theme={theme}>
        <DFMNavBar changePage={changePage} />
        {currPage == "feed" ? (
        <DFMFeed />
        ) : (<></>)}
        {currPage == "calendar" ? (
        <Typography variant='body'>
          This is the calendar
        </Typography>
        ) : (<></>)}
      </ThemeProvider>
    </>
  );
}

export default App
