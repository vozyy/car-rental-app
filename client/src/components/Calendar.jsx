import React, { useContext } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { DateRangeContext } from '../contexts/DateRangeContext';

function Calendar() {
  const { dateRange, setDateRange } = useContext(DateRangeContext);
  const [startDate, endDate] = dateRange;

  return (
    <DatePicker
      selectsRange={true}
      placeholderText='Pick dates'
      startDate={startDate}
      endDate={endDate}
      onChange={(update) => {
        setDateRange(update);
      }}
      withPortal
    />
  );
}

export default Calendar;
