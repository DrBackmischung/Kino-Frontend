import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import {useQuery} from "react-query";

export default function BasicSelect(props: any) {

  const {handleSelectChange} = props;
  const {location} = props;

  const apiUrl =
      "https://wi2020seb-cinema-api.azurewebsites.net/city/getAll";


  const { isLoading, error, data } = useQuery("Cities", () =>
      fetch(apiUrl).then((res) => res.json())
  );



  return (
      <Box sx={{ minWidth: 120}}>
        <FormControl fullWidth>
          <InputLabel id="simple-select-label">Location</InputLabel>
          <Select
              labelId="simple-select-label"
              id="simple-select"
              value={location}
              label="Location"
              onChange={handleSelectChange}

          >
            {data?.map((location: any) => (
                <MenuItem value={location}> {location.city}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
  );
}
