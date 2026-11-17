import dayjs, { Dayjs } from 'dayjs';

export type DatePickerFormat = Dayjs | Date | string | number | null | undefined;

export const isValidDate = (date: DatePickerFormat) => date !== null && date !== undefined && dayjs(date).isValid();

export const formatDate = {
  dateTime: 'DD MMM YYYY HH:mm', // 17 Apr 2022 12:00
  date: 'DD MMM YYYY', // 17 Apr 2022
  time: 'HH:mm', // 13:00 ,
  day: 'DD', // 13:00
  week: 'ddd', // 13:00 ,
  dayWeek: 'DD ddd',
  split: {
    dateTime: 'DD/MM/YYYY HH:mm', // 17/04/2022 12:00
    date: 'DD/MM/YYYY' // 17/04/2022
  },
  paramCase: {
    dateTime: 'DD-MM-YYYY HH:mm', // 17-04-2022 12:00
    date: 'DD-MM-YYYY' // 17-04-2022
  },
  file: 'YYYY-MMM'
};

export const formatDateString = (value: string | undefined | null, format: string = formatDate.date): string => {
  if (!value) return '';
  const date = dayjs(value);
  return date.isValid() ? date.format(format) : '';
};

export const checkIfDateBetween = (date: any, startDate: any, endDate: any): boolean => {
  let parsedStartDate = undefined;
  let parsedDate = undefined;
  let parsedEndDate = undefined;

  // parse dates
  try {
    parsedStartDate = new Date(startDate);
    parsedDate = new Date(date);
    parsedEndDate = new Date(endDate);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err: any) {
    return false;
  }

  // dates validation
  const isDate = isValidDate(date);
  const isStartDate = isValidDate(startDate);
  const isEndDate = isValidDate(endDate);

  //If one filter defined and date is null filter it
  if ((isStartDate || isEndDate) && !isDate) return false;

  if (isStartDate && !isEndDate) {
    return parsedDate.getTime() >= parsedStartDate.getTime();
  } else if (!isStartDate && isEndDate) {
    return parsedDate.getTime() <= parsedEndDate.getTime();
  } else if (isStartDate && isEndDate) {
    return parsedDate.getTime() >= parsedStartDate.getTime() && parsedDate.getTime() <= parsedEndDate.getTime();
  } else return true;
};

export const isExpired = (value: DatePickerFormat): boolean => {
  if (!isValidDate(value)) return false;
  return dayjs(value).isBefore(dayjs());
};
