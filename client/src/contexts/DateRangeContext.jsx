import React, { createContext, useState } from 'react';

export const DateRangeContext = createContext();

export const DateRangeProvider = ({ children }) => {
  const [dateRange, setDateRange] = useState([null, null]);

  return (
    <DateRangeContext.Provider value={{ dateRange, setDateRange }}>
      {children}
    </DateRangeContext.Provider>
  );
};
