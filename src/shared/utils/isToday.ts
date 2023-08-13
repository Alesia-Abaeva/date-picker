export const isToday = (today: Date, cell: DateCellItem) => {
  return (
    today.getFullYear() === cell.year &&
    today.getMonth() === cell.month &&
    today.getDate() === cell.date
  );
};
