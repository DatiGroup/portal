import { rankItem } from '@tanstack/match-sorter-utils';
import { FilterFn } from '@tanstack/react-table';
import { isValidDate } from './dateUtils';

export const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // store the ranking info
  addMeta({ itemRank });

  // return if the item should be filtered in/out
  return itemRank.passed;
};

export const dateRangeFilter: FilterFn<any> = (row, columnId, value) => {
  // raw inputs
  const [start, end] = value;
  const cellDate: Date = row.getValue(columnId);

  // parsed dates
  const date = new Date(cellDate);
  const startDate = new Date(start);
  const endDate = new Date(end);

  // dates validation
  const isDate = isValidDate(date);
  const isStartDate = isValidDate(startDate);
  const isEndDate = isValidDate(endDate);

  //If one filter defined and date is null filter it
  if ((isStartDate || isEndDate) && !isDate) return false;

  if (isStartDate && !isEndDate) {
    return date.getTime() >= startDate.getTime();
  } else if (!isStartDate && isEndDate) {
    return date.getTime() <= endDate.getTime();
  } else if (isStartDate && isEndDate) {
    return date.getTime() >= startDate.getTime() && date.getTime() <= endDate.getTime();
  } else return true;
};
