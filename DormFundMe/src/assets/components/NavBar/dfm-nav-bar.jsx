import {AppBar, Toolbar, Typography, Tab, Tabs, BottomNavigation, BottomNavigationAction} from '@mui/material';
import {AccountCircle} from '@mui/icons-material'
import EventIcon from '@mui/icons-material/Event';
import FeedIcon from '@mui/icons-material/Feed';
import { useState, useEffect } from 'react';
import { Link, BrowserRouter, Route } from 'react-router-dom';
import "./dfm-nav-bar.css"

const indexToPage = {
  0: "feed",
  1: "calendar",
  2: "profile"
};

function DFMNavBar({changePage, currPage}) {
    const [currTabIndex, changeTab] = useState(currPage);
    const handleTabChange = (e, tabIndex) => {
        changeTab(tabIndex);
        changePage(indexToPage[tabIndex]);
    };
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
      window.addEventListener("resize", () => setWidth(window.innerWidth));
    }, []);
    return width > 480 ? (
          <AppBar position="absolute">
          <Toolbar className='dfm-tool-bar'>
            <Typography variant="h6" noWrap >
              DormFundMe
            </Typography>
            <div className='dfm-nav-bar-menu-item-container'>
              <Tabs value={currTabIndex} onChange={handleTabChange} centered>
                <Tab label="Feed" component={Link} to="/feed" value="/feed" />
                <Tab label="Calendar" component={Link} to="/calendar" value="/calendar" />
                <Tab icon={<AccountCircle />} component={Link} to="/profile" value="/profile" />
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
            <BottomNavigationAction label="Feed" icon={<FeedIcon />} component={Link} to="/feed" value="/feed" />
            <BottomNavigationAction label="Calendar" icon={<EventIcon />} component={Link} to="/calendar" value="/calendar" />
            <BottomNavigationAction label="Profile" icon={<AccountCircle />} component={Link} to="/profile" value="/profile" />
          </BottomNavigation>
        );
}

export default DFMNavBar