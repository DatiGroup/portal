/*
Changes values like PENDING_EXTERNALLY to Pending externally*/

export const normalizeString = (value: string) => {
  const v = value ? value.toString().toUpperCase().replaceAll('_', ' ') : '';
  return v.charAt(0).toUpperCase() + v.slice(1).toLowerCase();
};

/**
 * Removes the trailing slash from a pathname if present.
 *
 * @param pathname - The pathname to process.
 * @returns The pathname without the trailing slash.
 *
 * @example
 * removeLastSlash('/dashboard/'); // '/dashboard'
 * removeLastSlash('/dashboard'); // '/dashboard'
 */
export const removeLastSlash = (pathname: string): string => {
  return pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
};

export const isEmptyString = (value: unknown): boolean => value === undefined || value === null || String(value).trim().length === 0;
