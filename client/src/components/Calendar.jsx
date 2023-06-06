import React, { useContext } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { DateRangeContext } from '../contexts/DateRangeContext';

function Calendar() {
  const { dateRange, setDateRange } = useContext(DateRangeContext);
  const [startDate, endDate] = dateRange;

  return (
    <DatePicker
      dateFormat='dd/MM/yyyy'
      selectsRange={true}
      placeholderText='Pick dates'
      startDate={startDate}
      endDate={endDate}
      onChange={(date) => setDateRange(date)}
      withPortal
    />
  );
}

export default Calendar;
