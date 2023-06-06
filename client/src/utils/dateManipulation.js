import moment from 'moment';

export const formatDate = (date) => {
  return moment(date).format('DD/MM/YYYY');
};

export const getDateDifference = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const timeDifference = endDate.getTime() - startDate.getTime();
  const differenceInDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  return differenceInDays;
};
