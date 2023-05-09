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
        <div className="dfm-page">
          <DFMFeed />
        </div>
        ) : (<></>)}
        {currPage == "calendar" ? (
        <div className="dfm-page">
          This is a placeholder
          {/* TODO: Make a calendar component and put it here */}
        </div>
        ) : (<></>)}
      </ThemeProvider>
    </>
  );
}

export default App
