import { format } from "date-fns";
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CalendarComponent = ({ setDate }) => {


  const formatDate = (date) => date.toISOString().split("T")[0];

  // Handling when user selects a date
  const handleDateChange = (date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    setDate(formattedDate);
    console.log("Formatted Date:", formattedDate);
  };

  return (
    <div>
      <Calendar
        onChange={handleDateChange}  // Trigger onChange when the date is selected
        // tileContent={({ date }) => {
        //   const formattedDate = format(date, "yyyy-MM-dd");

        //   // Return the event count or marker if the date has corresponding items
        // }}
      />
    </div>
  );
};

export default CalendarComponent;
