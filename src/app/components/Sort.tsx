import React from "react";
import {Menu, MenuItem} from "@mui/material";
import Box from "@mui/material/Box";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import IconButton from "@mui/material/IconButton";
import SortIcon from "@mui/icons-material/Sort";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import palette from "../config/Colours";

const theme = createTheme(palette)

function Sort(props: any) {
    const { setSelectedSort} = props;

    const handleSortByLongest = () => {
        setSelectedSort('longest');
        setAnchorEl(null);
    };

    const handleSortByShortest = () => {
        setSelectedSort('shortest');
        setAnchorEl(null);
    };

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
      <ThemeProvider theme={theme}>
        <Box sx={{ minWidth: 120 }}>

            <IconButton size="large" color="inherit"  onClick={handleMenu}>
                <SortIcon />
            </IconButton>
            <Menu
                id="menu-sort"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleSortByShortest}> Filmlänge <KeyboardArrowUpIcon/> </MenuItem>
                <MenuItem onClick={handleSortByLongest}> Filmlänge <KeyboardArrowDownIcon/> </MenuItem>
            </Menu>
        </Box>
      </ThemeProvider>
    );
}

export default Sort;
