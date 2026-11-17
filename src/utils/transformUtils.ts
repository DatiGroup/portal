/**
 * Utility functions for transforming values, particularly useful for form inputs
 */

/**
 * Transforms a value to string, with fallback for null/undefined/NaN values
 * transformValue(null, "0")              // → "0"
 * transformValue(123.45)                 // → "123.45"
 *
 * @param value - The value to transform
 * @param fallback - The fallback value to return if value is null/undefined/NaN
 * @returns The transformed string value or fallback
 */
export function transformValue(value: unknown, fallback: string = ''): string {
  if (value == null || (typeof value === 'number' && Number.isNaN(value))) {
    return fallback;
  }
  return value.toString();
}

/**
 * Transforms input value for number fields by removing non-numeric characters
 * except for decimal point, and ensures only one decimal point exists
 * 
 * transformValueOnChange("123.45.67abc") // → "123.4567"
 * transformValueOnChange("$1,234.56")    // → "1234.56"

 * @param value - The input value to transform
 * @returns Cleaned numeric string
 */

export function transformValueOnChange(value: unknown): string {
  const stringValue = transformValue(value).replace(/[^0-9.]/g, '');
  const [integerPart, ...decimalParts] = stringValue.split('.');

  return decimalParts.length > 0 ? `${integerPart}.${decimalParts.join('')}` : integerPart;
}

/**
 * Transforms value to number on blur, with fallback for invalid values
 * transformValueOnBlur("123.45", "0")    // → 123.45
 * transformValueOnBlur("invalid", "0")   // → "0"
 *
 * @param value - The value to parse as number
 * @param fallback - The fallback value to return if parsing fails
 * @returns Parsed number or fallback
 */
export function transformValueOnBlur(value: unknown, fallback: string = ''): string | number {
  if (value == null || (typeof value === 'number' && Number.isNaN(value))) {
    return fallback;
  }

  const numericValue = parseFloat(value.toString());
  return Number.isNaN(numericValue) ? fallback : numericValue;
}

/**
 * Object containing transform functions for number inputs
 * Useful for form libraries like react-hook-form
 */
export const transformNumber = {
  onChange: transformValueOnChange,
  onBlur: transformValueOnBlur,
  value: transformValue
} as const;

/**
 * Checks whether a value is a strict number (integer or float).
 * Accepts number primitives and fully numeric strings.
 */
export function isActualNumber(value: unknown): boolean {
  if (typeof value === 'number') {
    return Number.isFinite(value);
  }

  if (typeof value !== 'string') {
    return false;
  }

  const normalized = value.trim();
  if (normalized === '') {
    return false;
  }

  return /^[+-]?(?:\d+\.?\d*|\.\d+)$/.test(normalized);
}

/**
 * Formats a value as float with exactly 2 digits after decimal point.
 * formatFloat2(12)         // "12.00"
 * formatFloat2("12.3")     // "12.30"
 * formatFloat2("invalid")  // ""
 */
export function formatFloat(numOfDecimals: number, value: unknown, fallback: string = ''): string {
  if (value == null || value === '') return fallback;

  const normalized = typeof value === 'string' ? value.replace(',', '.') : value.toString();
  const parsed = Number(normalized);

  return Number.isFinite(parsed) ? parsed.toFixed(numOfDecimals) : fallback;
}

// Type definitions for better TypeScript support
export type TransformValueFn = typeof transformValue;
export type TransformValueOnChangeFn = typeof transformValueOnChange;
export type TransformValueOnBlurFn = typeof transformValueOnBlur;
export type TransformNumberConfig = typeof transformNumber;
export type IsActualNumberFn = typeof isActualNumber;
export type FormatFloat2Fn = typeof formatFloat;
