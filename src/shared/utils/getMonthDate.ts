import { getDateInAMonth } from "shared/utils";

export const getPreviousMonthDays = (year: number, month: number) => {
  const currentMonthFirstDay = new Date(year, month, 1);
  const dayOfTheWeek = currentMonthFirstDay.getDate();

  /** How many days should I take from the previous month,
   * if it's Mon, then you don't need to show anything in the previous month
   */
  const prevMonthCellsAmount = dayOfTheWeek - 1; //

  const daysAmountInPrevMonth = getDateInAMonth(year, month - 1); // number of days in the previous month

  const dateCells: DateCellItem[] = [];

  const [cellYear, cellMonth] =
    month === 0 ? [year - 1, 11] : [year, month - 1];

  for (let i = 0; i < prevMonthCellsAmount; i++) {
    // TODO: negative month
    dateCells.push({
      year: cellYear,
      month: cellMonth,
      date: daysAmountInPrevMonth - i,
    });
  }
};

/** to get all days */
export const getCurrentMonthDays = (
  year: number,
  month: number,
  numberOfDays: number
): DateCellItem[] => {
  const dateCells: DateCellItem[] = [];

  for (let i = 1; i < numberOfDays; i++) {
    dateCells.push({
      year,
      month,
      date: i,
    });
  }

  return dateCells;
};
