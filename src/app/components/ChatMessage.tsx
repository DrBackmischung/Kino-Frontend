import React, { useState } from "react";
import "./ChatMessage.css";
import { useNavigate } from "react-router-dom";
import ManageCheckout from "./ManageCheckout";

function ChatMessage(props: any) {
  const {
    message,
    align,
    navigateState,
    navigateTo,
    handleDialogClose,
    link,
    movieList,
    showList,
    userData,
  } = props;
  const navigate = useNavigate();
  const [messageCss] = useState(`messageContainer${align}`);
  const [selectedShow, setSelectedShow] = useState();
  const [openSeatBooking, setOpenSeatBooking] = useState(0);
  const navigateToLink = (e: any, stateToPass: any) => {
    e.preventDefault();
    handleDialogClose();
    switch (navigateTo) {
      case "/film":
        navigate(`${navigateTo}`, { state: { movieId: stateToPass } });
        break;
    }
  };
  const handleShowClick = (e: any, showId: any) => {
    e.preventDefault();
    setSelectedShow(showId);
    setOpenSeatBooking((prevVal) => prevVal + 1);
  };
  const showsToRender = (shows: any) => {
    if (shows === undefined) return;
    const sortedByDays = shows?.sort((itemA: any, itemB: any) => {
      return (
        new Date(itemA.showDate).getTime() - new Date(itemB.showDate).getTime()
      );
    });

    // eslint-disable-next-line array-callback-return
    const sortedByTime = sortedByDays?.sort((itemC: any, itemD: any) => {
      if (itemC.showDate === itemD.showDate) {
        return (
          new Date("1970/01/01 " + itemC.startTime).getTime() -
          new Date("1970/01/01 " + itemD.startTime).getTime()
        );
      }
    });
    const removedShowsOutadatedDay = sortedByTime?.filter((item: any) => {
      return new Date(item.showDate) > new Date();
    });
    const removedShowsOutatedTime = removedShowsOutadatedDay?.filter(
      (item: any) => {
        var currentDate = new Date();
        var movieStart = new Date();
        if (new Date(item.showDate).getDate() === currentDate.getDate()) {
          movieStart.setHours(
            item.startTime.split(":")[0],
            item.startTime.split(":")[1],
            0
          );
          return movieStart > currentDate;
        }
        return true;
      }
    );
    return removedShowsOutatedTime;
  };
  return (
    <div className={messageCss}>
      <p className="messageText">{`${message} `}</p>
      {navigateTo === undefined || navigateState === undefined ? null : (
        <p
          className="myHyperLink"
          onClick={(e) => navigateToLink(e, navigateState)}
        >
          Mehr erfahren!
        </p>
      )}
      {link === undefined ? null : (
        <a className="myHyperLink" href={link}>
          Klick mich!
        </a>
      )}
      {movieList === undefined
        ? null
        : movieList?.map((item: any) => (
            <p
              className="myHyperLink"
              onClick={(e) => navigateToLink(e, item?.id)}
            >
              {item?.title}
            </p>
          ))}
      {showList === undefined
        ? null
        : showsToRender(showList)?.map((item: any) => (
            <p
              className="myHyperLink"
              onClick={(e) => handleShowClick(e, item)}
            >
              {item?.movie?.title}
              {` `}
              {new Date(item.showDate).toLocaleDateString("de-DE", {
                weekday: "long",
                day: "2-digit",
                month: "2-digit",
              })}
              {` um ${item.startTime.substring(0, 5)} Uhr`}
            </p>
          ))}
      <ManageCheckout
        show={selectedShow}
        open={openSeatBooking}
        userData={userData}
      />
    </div>
  );
}

export default ChatMessage;
