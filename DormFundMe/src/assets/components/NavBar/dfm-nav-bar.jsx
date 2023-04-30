import {AppBar, Toolbar, Typography, IconButton, Tab, Tabs} from '@mui/material';
import {AccountCircle} from '@mui/icons-material'
import { useState } from 'react';
import "./dfm-nav-bar.css"

const indexToPage = {
  0: "feed",
  1: "calendar"
};

function DFMNavBar({changePage}) {
    const [currTabIndex, changeTab] = useState(0);
    const handleTabChange = (e, tabIndex) => {
        changeTab(tabIndex);
        changePage(indexToPage[tabIndex]);
    };
    return (
        <AppBar position="absolute">
          <Toolbar className='dfm-tool-bar'>
            <Typography variant="h6" noWrap >
              DormFundMe
            </Typography>
            <div className='dfm-nav-bar-menu-item-container'>
              <Tabs value={currTabIndex} onChange={handleTabChange} centered>
                <Tab label="Feed" />
                <Tab label="Calendar" />
              </Tabs>
              <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
            </div>
          </Toolbar>
        </AppBar>
    );
}

export default DFMNavBar