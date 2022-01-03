import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function BasicSelect(props: any) {
  const { handleSelectChange, cityData } = props;
  const { location } = props;

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="simple-select-label">Location</InputLabel>
        <Select
          labelId="simple-select-label"
          id="simple-select"
          value={location}
          label="Location"
          onChange={handleSelectChange}
        >
          {cityData?.map((location: any) => (
            <MenuItem value={location}> {location.city}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
