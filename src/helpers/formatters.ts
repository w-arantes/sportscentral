import { format } from 'date-fns';

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  return format(date, 'dd/MM/yyyy - HH:mm');
};

export const formatDateRange = (
  startDateString: string,
  endDateString: string
): string => {
  const startDate = new Date(startDateString);
  const endDate = new Date(endDateString);

  const formattedStartDate = format(startDate, 'dd/MM/yyyy HH:mm');
  const formattedEndDate = format(endDate, 'dd/MM/yyyy HH:mm');

  return `${formattedStartDate} - ${formattedEndDate}`;
};
