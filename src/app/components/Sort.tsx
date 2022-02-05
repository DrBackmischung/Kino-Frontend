import React from "react";
import {Menu, MenuItem, MenuProps, styled} from "@mui/material";
import Box from "@mui/material/Box";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import IconButton from "@mui/material/IconButton";
import SortIcon from "@mui/icons-material/Sort";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import palette from "../config/Colours";
import "./Sort.css";

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

    const StyledMenu = styled((props: MenuProps) => (
        <Menu
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          {...props}
        />
      ))(({theme})=>({
        '& .MuiPaper-root': {
          borderRadius: 6,
          minWidth:180,
        },
        '& .MuiMenu-list': {
          backgroundColor: '#ba8434',
          padding: '4px 0',
        },
      }));

    return (
      <ThemeProvider theme={theme}>
        <Box sx={{ minWidth: 120 }}>

            <IconButton id="sort-iconButton" size="large" onClick={handleMenu}>
                <SortIcon />
            </IconButton>
            <StyledMenu
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
            </StyledMenu>
        </Box>
      </ThemeProvider>
    );
}

export default Sort;
