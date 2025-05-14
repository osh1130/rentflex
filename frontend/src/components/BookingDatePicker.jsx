import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function BookingDatePicker({ onSelect }) {
  const [startDate, setStartDate] = useState(null);
  const handleChange = date => {
    setStartDate(date);
    onSelect(date);
  };
  return (
    <DatePicker
      selected={startDate}
      onChange={handleChange}
      minDate={new Date()}
      placeholderText="Select a date"
    />
  );
}
