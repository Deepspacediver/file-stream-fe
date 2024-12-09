export const addDays = (date: Date | string, days: number) => {
  const dateConverted = new Date(date);
  dateConverted.setDate(dateConverted.getDate() + days);
  return dateConverted;
};
