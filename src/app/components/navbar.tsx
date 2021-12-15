import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import {Box, Container, Menu, MenuItem} from "@mui/material";
import {AccountCircle} from "@mui/icons-material";
import {useState} from "react";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";


import Programm from "../pages/programPage";
import Events from "../pages/eventsPage";
import Preisuebersicht from "../pages/pricesOverviewPage";
import News from "../pages/newsPage";
import Homepage from "../pages/homepage";


function MenuAppBar() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const [pages, setPages] = useState([{"name":'Programm', "link": "/programPage"}, {"name":'Events', "link": "/eventsPage"}, {"name":'Preisübersicht', "link": "/pricesOverviewPage"}, {"name":'News', "link": "/newsPage"}]);

    return (
        <BrowserRouter>
            <AppBar position="fixed">
                <Container fixed>
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                            component={Link}
                            to={"/"}>
                            <HomeIcon/>
                        </IconButton>
                        <Box sx={{ justifyContent: 'space-evenly', flexGrow: 1, display: { xs: 'flex' } }}>
                            {pages.map((page) => (
                                <Button
                                    key={page.name}
                                    //onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                    variant="contained"
                                    component={Link}
                                    to={page.link}>
                                    {page.name}
                                </Button>
                            ))}
                        </Box>
                        <Box>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit">
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}>
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={handleClose}>My account</MenuItem>
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Routes>
                <Route  path="/" element={<Homepage/>} />
                <Route  path="/programPage" element={<Programm/>} />
                <Route  path="/eventsPage" element={<Events/>} />
                <Route  path="/pricesOverviewPage" element={<Preisuebersicht />} />
                <Route  path="/newsPage" element={<News/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default MenuAppBar;