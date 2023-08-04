export const getDateInAMonth = (year: number, month: number) => {
  const nextMonthDate = new Date(year, month + 1, 1);
  // mutates the date object
  nextMonthDate.setMinutes(-1);

  return nextMonthDate.getDate();
};
