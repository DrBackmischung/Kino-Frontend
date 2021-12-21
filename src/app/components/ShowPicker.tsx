// eslint-disable-next-line
import React from "react";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import {
  Button,
  CircularProgress,
  Container,
  Grid,
  TextField,
  Tooltip,
  Zoom,
} from "@mui/material";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Box from "@mui/material/Box";

function ShowPicker(props: any) {
  const { setOpenSeatBooking, movieId, setSelectedShow } = props;

  const [date, setDate] = useState<Date | null>(new Date());
  const [filteredData, setFilteredData] = useState<any>(null);
  const apiUrlAll = `https://wi2020seb-cinema-api.azurewebsites.net/movie/${movieId}/shows`;
  // eslint-disable-next-line
  const { isLoading, error, data } = useQuery(
    ["shows", movieId],
    () => {
      return fetch(apiUrlAll).then((res) => {
        return res.json();
      });
    },
    { enabled: Boolean(movieId) }
  );

  useEffect(() => {
    setFilteredData(() => {
      return data?.filter?.((show: any) => {
        const showDateFormatted = new Date(show.showDate).toLocaleDateString(
          undefined,
          {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
          }
        );
        const selectedDateFormatted = new Date(`${date}`).toLocaleDateString(
          undefined,
          {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
          }
        );
        return showDateFormatted === selectedDateFormatted;
      });
    });
  }, [date, data]);

  if (isLoading) {
    return (
      <div>
        <CircularProgress />
        <span>Loading...</span>
      </div>
    );
  }

  const handleChange = (selectedDate: Date | null) => {
    setDate(selectedDate);
  };

  function openDialog(show: any) {
    setOpenSeatBooking((prevVal: any) => prevVal + 1);
    setSelectedShow(show);
  }

  console.log(data, movieId);
  return (
    <Container className="overallContainer" maxWidth="sm">
      <h3>Shows:</h3>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <div>
          <DesktopDatePicker
            className="DatePicker"
            label="Date Picker"
            inputFormat="MM/dd/yyyy"
            value={date}
            onChange={handleChange}
            renderInput={(params: any) => <TextField {...params} />}
          />
        </div>
      </LocalizationProvider>
      <Box className="showTimeContainer" sx={{ mt: 5 }}>
        <h3>Start Time:</h3>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {filteredData?.map((item: any) => (
            <Grid item xs={2} sm={4} md={4} key={`${item.id}`}>
              <Tooltip
                TransitionComponent={Zoom}
                title="Click to book a seat!"
                arrow
              >
                <Button
                  key={`${item.id}`}
                  onClick={() => {
                    openDialog(item);
                  }}
                  variant="contained"
                >
                  {item.startTime}
                </Button>
              </Tooltip>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default ShowPicker;
