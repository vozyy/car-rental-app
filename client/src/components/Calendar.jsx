import React, { useContext } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { DateRangeContext } from '../contexts/DateRangeContext';
import styles from './Calendar.modules.css';

function Calendar() {
  const { dateRange, setDateRange } = useContext(DateRangeContext);
  const [startDate, endDate] = dateRange;

  return (
    <DatePicker
      className={styles['try-style']}
      dateFormat='dd/MM/yyyy'
      selectsRange={true}
      placeholderText='Clic here'
      startDate={startDate}
      endDate={endDate}
      onChange={(date) => setDateRange(date)}
      withPortal
    />
  );
}

export default Calendar;
