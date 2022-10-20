import React, { useContext, useState } from "react";
import axios from "axios";

export const BookingContext = React.createContext({
  confirmedBooking: [],
  setConfirmedBooking: () => {},
  addNewBooking: () => {},
});

export const useBookingContext = () => useContext(BookingContext);
export const addBookingHandler = async function (bookingData) {
  await axios.post("/api/new-booking", bookingData);
};

export const BookingProvider = ({ children }) => {
  const [confirmedBooking, setConfirmedBooking] = useState([]);

  return (
    <BookingContext.Provider
      value={{
        confirmedBooking,
        setConfirmedBooking,
        addNewBooking: addBookingHandler,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
