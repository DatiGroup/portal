export const getNestedProperty = (obj: any, path: string): any => {
  return path.split('.').reduce((attr, key) => attr?.[key], obj);
};
