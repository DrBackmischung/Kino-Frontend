import React from "react";
import {MenuItem} from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function Sort(props: any) {
    const { setSelectedSort, selectedSort } = props;

    const handleSortBy = (e: any) => {
        setSelectedSort(e.target.value);
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="simple-select-sortBy-label">Sortirung</InputLabel>
                <Select
                    labelId="simple-select-sortBy-label"
                    id="simple-select-sortBy"
                    defaultValue={""}
                    value={selectedSort}
                    label="Sortirung"
                    onChange={(e) => handleSortBy(e)}
                      >
                    <MenuItem key="shortest"  value="shortest">  <KeyboardArrowUpIcon/> Duration </MenuItem>
                    <MenuItem key="longest"  value="longest">  <KeyboardArrowDownIcon/> Duration </MenuItem>
                    <MenuItem key="best"   value="best">   <KeyboardArrowDownIcon/> Rating </MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}

export default Sort;
