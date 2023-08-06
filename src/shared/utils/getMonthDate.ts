import { getMonthDays } from "shared/utils";

const VISIBLE_CELLS_AMOUNT = 7 * 6;

export const getPreviousMonthDays = (year: number, month: number) => {
  const currentMonthFirstDay = new Date(year, month, 1);
  const dayOfTheWeek = currentMonthFirstDay.getDay();

  /** How many days should I take from the previous month,
   * if it's Mon, then you don't need to show anything in the previous month
   */
  const prevMonthCellsAmount = dayOfTheWeek === 0 ? 6 : dayOfTheWeek - 1; //
  //

  const daysAmountInPrevMonth = getMonthDays.number(year, month - 1); // number of days in the previous month

  const dateCells: DateCellItem[] = [];

  const [cellYear, cellMonth] =
    month === 0 ? [year - 1, 11] : [year, month - 1];

  for (let i = prevMonthCellsAmount - 1; i >= 0; i--) {
    dateCells.push({
      year: cellYear,
      month: cellMonth,
      date: daysAmountInPrevMonth - i,
    });
  }

  console.log(year, month, dateCells, "PREV");
  return dateCells;
};

// 7
export const getNextMonthDays = (year: number, month: number) => {
  //TODO: copy paste
  const currentMonthFirstDay = new Date(year, month, 1);
  const dayOfTheWeek = currentMonthFirstDay.getDay();

  /** How many days should I take from the previous month,
   * if it's Mon, then you don't need to show anything in the previous month
   */
  const prevMonthCellsAmount = dayOfTheWeek === 0 ? 6 : dayOfTheWeek - 1; //
  //TODO: end copy paste

  const daysAmount = getMonthDays.number(year, month);

  const dateCells: DateCellItem[] = [];

  const [cellYear, cellMonth] =
    month === 11 ? [year + 1, 0] : [year, month + 1];

  // получаем кол-во дней в следующем месяце, которые видны
  const nextMonthDays =
    VISIBLE_CELLS_AMOUNT - daysAmount - prevMonthCellsAmount;

  console.log("nextMonthDays", nextMonthDays, daysAmount, prevMonthCellsAmount);

  for (let i = 1; i <= nextMonthDays; i++) {
    dateCells.push({
      year: cellYear,
      month: cellMonth,
      date: i,
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
    });
  }

  return dateCells;
};
