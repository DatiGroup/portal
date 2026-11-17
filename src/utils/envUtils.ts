export const isNonProd = () => {
  const mode = import.meta.env.MODE;

  return mode !== 'production' && mode !== 'demo';
};
