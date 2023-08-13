import { getMonthDays } from "shared/utils";

const VISIBLE_CELLS_AMOUNT = 7 * 6;

/** How many days should I take from the previous month,
 * if it's Mon, then you don't need to show anything in the previous month
 */
const getNumberPrevMonth = (year: number, month: number) => {
  const currentMonthFirstDay = new Date(year, month, 1);
  const dayOfTheWeek = currentMonthFirstDay.getDay();
  const prevMonthCellsAmount = dayOfTheWeek === 0 ? 6 : dayOfTheWeek - 1;

  return prevMonthCellsAmount;
};

export const getPreviousMonthDays = (year: number, month: number) => {
  const prevMonthCellsAmount = getNumberPrevMonth(year, month);

  const daysAmountInPrevMonth = getMonthDays.number(year, month - 1); // number of days in the previous month

  const dateCells: DateCellItem[] = [];

  const [cellYear, cellMonth] =
    month === 0 ? [year - 1, 11] : [year, month - 1];

  for (let i = prevMonthCellsAmount - 1; i >= 0; i--) {
    dateCells.push({
      year: cellYear,
      month: cellMonth,
      date: daysAmountInPrevMonth - i,
      type: "prev",
    });
  }

  return dateCells;
};

export const getNextMonthDays = (year: number, month: number) => {
  const prevMonthCellsAmount = getNumberPrevMonth(year, month);

  const daysAmount = getMonthDays.number(year, month);

  const dateCells: DateCellItem[] = [];

  const [cellYear, cellMonth] =
    month === 11 ? [year + 1, 0] : [year, month + 1];

  // get the number of days in the next month that are visible
  const nextMonthDays =
    VISIBLE_CELLS_AMOUNT - daysAmount - prevMonthCellsAmount;

  for (let i = 1; i <= nextMonthDays; i++) {
    dateCells.push({
      year: cellYear,
      month: cellMonth,
      date: i,
      type: "next",
    });
  }

  return dateCells;
};

/** to get all days */
export const getCurrentMonthDays = (
  year: number,
  month: number,
  numberOfDays: number
): DateCellItem[] => {
  const dateCells: DateCellItem[] = [];

  for (let i = 1; i <= numberOfDays; i++) {
    dateCells.push({
      year,
      month,
      date: i,
      type: "current",
    });
  }

  return dateCells;
};
