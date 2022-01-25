import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { createTheme } from "@mui/material/styles";
import palette from "../config/Colours";
import { ThemeProvider } from "@mui/styles";
import "./BasicSelect.css";

export default function BasicSelect(props: any) {
  const { handleSelectChange, cityData } = props;
  const { location } = props;

  const theme = createTheme(palette)
  
  return (
    <ThemeProvider theme={theme}>
      <Box 
        className = "BasicSelect-Box"
      >
        <FormControl 
          id="simpleSelcet-formControl"
          fullWidth
        >
          <InputLabel id="simple-select-label">Location</InputLabel>
          <Select
            labelId="simple-select-label"
            id="simple-select"
            value={location}
            label="Location"
            onChange={handleSelectChange}
          >
            {cityData?.map((location: any) => (
              <MenuItem id="basicSelect-menuItem" value={location}> {location.city}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </ThemeProvider>
  );
}
