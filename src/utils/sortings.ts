import { compareItems, RankingInfo } from '@tanstack/match-sorter-utils';
import { SortingFn, sortingFns } from '@tanstack/react-table';

export const fuzzySort: SortingFn<any> = (rowA: any, rowB: any, columnId) => {
  let dir = 0;

  // only sort by rank if the column has ranking information
  if (rowA.columnFiltersMeta[columnId]) {
    dir = compareItems(rowA.columnFiltersMeta[columnId]! as RankingInfo, rowB.columnFiltersMeta[columnId]! as RankingInfo);
  }

  // provide an alphanumeric fallback for when the item ranks are equal
  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
};
