export const capitalizeString = (data: string) => {
  if (data.length === 0) {
    return data;
  }
  if (data.length === 1) {
    return data.toUpperCase();
  }
  return data[0].toUpperCase().concat(data.slice(1));
};
