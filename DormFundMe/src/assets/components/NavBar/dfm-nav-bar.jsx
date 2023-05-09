import {AppBar, Toolbar, Typography, IconButton, Tab, Tabs, BottomNavigation, BottomNavigationAction} from '@mui/material';
import {AccountCircle} from '@mui/icons-material'
import EventIcon from '@mui/icons-material/Event';
import FeedIcon from '@mui/icons-material/Feed';
import { useState, useEffect } from 'react';
import "./dfm-nav-bar.css"

const indexToPage = {
  0: "feed",
  1: "calendar",
  2: "profile"
};

function DFMNavBar({changePage}) {
    const [currTabIndex, changeTab] = useState(0);
    const handleTabChange = (e, tabIndex) => {
        changeTab(tabIndex);
        changePage(indexToPage[tabIndex]);
    };
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
      /* Inside of a "useEffect" hook add an event listener that updates
        the "width" state variable when the window size changes */
      window.addEventListener("resize", () => setWidth(window.innerWidth));

      /* passing an empty array as the dependencies of the effect will cause this
        effect to only run when the component mounts, and not each time it updates.
        We only want the listener to be added once */
    }, []);
    return width > 480 ? (
          <AppBar position="absolute">
          <Toolbar className='dfm-tool-bar'>
            <Typography variant="h6" noWrap >
              DormFundMe
            </Typography>
            <div className='dfm-nav-bar-menu-item-container'>
              <Tabs value={currTabIndex} onChange={handleTabChange} centered>
                <Tab label="Feed" />
                <Tab label="Calendar" />
                <Tab icon={<AccountCircle />} />
              </Tabs>
            </div>
          </Toolbar>
        </AppBar>
        ) : (
          <BottomNavigation
            showLabels
            value={currTabIndex} 
            onChange={handleTabChange}
            className='dfm-bottom-nav'
          >
            <BottomNavigationAction label="Feed" icon={<FeedIcon />} />
            <BottomNavigationAction label="Calendar" icon={<EventIcon />} />
            <BottomNavigationAction label="Profile" icon={<AccountCircle />} />
          </BottomNavigation>
        );
}

export default DFMNavBar