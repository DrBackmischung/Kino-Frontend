import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function BasicSelect() {
    const [location, setLocation] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setLocation(event.target.value as string);
    };

    return (
        <Box sx={{ minWidth: 120}}>
            <FormControl fullWidth>
                <InputLabel id="simple-select-label">Location</InputLabel>
                <Select
                    labelId="simple-select-label"
                    id="simple-select"
                    value={location}
                    label="Location"
                    onChange={handleChange}

                >
                    <MenuItem value={10}>Mannheim</MenuItem>
                    <MenuItem value={20}>Berlin</MenuItem>
                    <MenuItem value={30}>Heidelberg</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}