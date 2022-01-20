import React from "react";
import {MenuItem} from "@mui/material";
import Box from "@mui/material/Box";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";

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
                    label="Sort"
                    onChange={(e) => handleSortBy(e)}
                >
                    <MenuItem key="shortest}"  value="shortest">  <ArrowUpwardIcon/> Duration </MenuItem>
                    <MenuItem key="longest}"  value="longest">  <ArrowDownwardIcon/> Duration </MenuItem>
                    <MenuItem key="best}"   value="best">   <ArrowDownwardIcon/> Rating </MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}

export default Sort;
