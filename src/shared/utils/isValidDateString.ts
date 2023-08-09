import { getMonthDays } from "shared/utils";

export const isValidDateString = (value: string) => {
  const validValueRegex = /^\d{2}-\d{2}-\d{4}$/;

  if (!validValueRegex.test(value)) {
    return false;
  }

  const { date, month, year } = parseToDate(value);

  if (month < 1 || month > 12 || date < 1) {
    return false;
  }

  const maxDaysInMonth = getMonthDays.number(year, month - 1);

  if (date > maxDaysInMonth) {
    return false;
  }

  return true;
};

export const parseToDate = (value: string) => {
  const [date, month, year] = value.split("-").map((v) => parseInt(v, 10));

  return { date, month, year };
};
