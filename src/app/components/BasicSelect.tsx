import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function BasicSelect(props: any) {
  const { setSelectedLocation, showsData, selectedLocation } = props;

  const handleSelectLocation = (e: any) => {
    setSelectedLocation(e.target.value);
  };



  const uniqueCityArray = showsData?.map((item: any) => item['cinema']['city'].city).filter((value: any, index: any, self: any) => self.indexOf(value) === index)


  return (
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="simple-select-label">Location</InputLabel>
          <Select
              labelId="simple-select-label"
              id="simple-select"
              defaultValue={""}
              value={selectedLocation}
              label="Location"
              onChange={(e) => handleSelectLocation(e)}
          >
            {uniqueCityArray?.map((city: any) => (
                <MenuItem key={city} value={city}> {city}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
  );
}

