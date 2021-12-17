import React, { useState } from "react";
import CheckoutDialog from "./CheckoutDialog";
import Button from "@mui/material/Button";
import SeatBookingDialog from "./SeatBookingDialog";
import { useQuery } from "react-query";

const testMovie = [
  {
    id: "118e31db-145a-403d-834c-a683de7ddce2",
    showDate: "2021-12-18",
    startTime: "20:00:00",
    endTime: "23:00:00",
    movie: {
      id: "2c0e09d8-344c-452d-a95b-958223933693",
      titel: "Alita: Battle Angle",
      language: "German",
      duration: 150,
      director: "James Cameron",
      description:
        "A deactivated cyborg's revived, but can't remember anything of her past and goes on a quest to find out who she is.",
      pictureLink:
        "https://m.media-amazon.com/images/M/MV5BMTQzYWYwYjctY2JhZS00NTYzLTllM2UtZWY5ZTk0NmYwYzIyXkEyXkFqcGdeQXVyMzgxODM4NjM@._V1_.jpg",
      fsk: 0,
    },
    cinema: {
      id: "100db203-1014-4fbd-aaf0-ca72ab288c69",
      name: "Cineplex",
      street: "Biegenstraße",
      number: "1a",
      cinemaRooms: 9,
      stories: 3,
      city: {
        id: "825ce785-a652-4808-ac34-fdf62fdbb5aa",
        plz: 35037,
        city: "Marburg",
      },
      city_id: {
        id: "825ce785-a652-4808-ac34-fdf62fdbb5aa",
        plz: 35037,
        city: "Marburg",
      },
    },
    cinemaRoom: {
      id: "eee6d622-0d8c-4809-8e7f-01935ca3b313",
      story: 0,
      wheelchairAccessible: true,
      cinema: {
        id: "100db203-1014-4fbd-aaf0-ca72ab288c69",
        name: "Cineplex",
        street: "Biegenstraße",
        number: "1a",
        cinemaRooms: 9,
        stories: 3,
        city: {
          id: "825ce785-a652-4808-ac34-fdf62fdbb5aa",
          plz: 35037,
          city: "Marburg",
        },
        city_id: {
          id: "825ce785-a652-4808-ac34-fdf62fdbb5aa",
          plz: 35037,
          city: "Marburg",
        },
      },
      cinemaRoomSeatingPlan: {
        id: "df5026e6-caa6-46fe-beb6-d241279617f9",
        seats: 100,
        reihen: 4,
      },
    },
  },
  {
    id: "cdf8722b-de19-4b3e-b71c-c9f8cd1c6e1f",
    showDate: "2021-12-17",
    startTime: "20:00:00",
    endTime: "23:00:00",
    movie: {
      id: "2c0e09d8-344c-452d-a95b-958223933693",
      titel: "Alita: Battle Angle",
      language: "German",
      duration: 150,
      director: "James Cameron",
      description:
        "A deactivated cyborg's revived, but can't remember anything of her past and goes on a quest to find out who she is.",
      pictureLink:
        "https://m.media-amazon.com/images/M/MV5BMTQzYWYwYjctY2JhZS00NTYzLTllM2UtZWY5ZTk0NmYwYzIyXkEyXkFqcGdeQXVyMzgxODM4NjM@._V1_.jpg",
      fsk: 0,
    },
    cinema: {
      id: "100db203-1014-4fbd-aaf0-ca72ab288c69",
      name: "Cineplex",
      street: "Biegenstraße",
      number: "1a",
      cinemaRooms: 9,
      stories: 3,
      city: {
        id: "825ce785-a652-4808-ac34-fdf62fdbb5aa",
        plz: 35037,
        city: "Marburg",
      },
      city_id: {
        id: "825ce785-a652-4808-ac34-fdf62fdbb5aa",
        plz: 35037,
        city: "Marburg",
      },
    },
    cinemaRoom: {
      id: "eee6d622-0d8c-4809-8e7f-01935ca3b313",
      story: 0,
      wheelchairAccessible: true,
      cinema: {
        id: "100db203-1014-4fbd-aaf0-ca72ab288c69",
        name: "Cineplex",
        street: "Biegenstraße",
        number: "1a",
        cinemaRooms: 9,
        stories: 3,
        city: {
          id: "825ce785-a652-4808-ac34-fdf62fdbb5aa",
          plz: 35037,
          city: "Marburg",
        },
        city_id: {
          id: "825ce785-a652-4808-ac34-fdf62fdbb5aa",
          plz: 35037,
          city: "Marburg",
        },
      },
      cinemaRoomSeatingPlan: {
        id: "df5026e6-caa6-46fe-beb6-d241279617f9",
        seats: 100,
        reihen: 4,
      },
    },
  },
];

function TestPage() {
  const [openCheckout, setOpenCheckout] = useState(false);
  const [openSeatBooking, setOpenSeatBooking] = useState(false);
  const [selectedShow, setSelectedShow] = useState(testMovie[0]);

  const handleClickOpenCheckout = () => {
    setOpenCheckout(true);
    setOpenSeatBooking(false);
  };

  const handleCloseCheckout = () => {
    setOpenCheckout(false);
  };

  const handleClickOpenBooking = () => {
    setOpenSeatBooking(true);
  };

  const handleCloseBooking = () => {
    setOpenSeatBooking(false);
  };
  return (
    <>
      <Button onClick={handleClickOpenBooking}>Dialog öffnen!</Button>
      <CheckoutDialog
        open={openCheckout}
        handleClose={handleCloseCheckout}
        finishTransaction={handleCloseCheckout}
      />
      <SeatBookingDialog
        open={openSeatBooking}
        handleClose={handleCloseBooking}
        selectedShow={selectedShow}
        proceedToCheckout={handleClickOpenCheckout}
      />
    </>
  );
}

export default TestPage;
