export const localizeNumber = (number, locale = 'en') => {
  return Number(number).toLocaleString(locale);
};
