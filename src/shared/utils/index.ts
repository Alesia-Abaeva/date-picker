import { getDateInAMonth as number } from "./getDateInAMonth";
import {
  getNextMonthDays as next,
  getPreviousMonthDays as prev,
  getCurrentMonthDays as current,
} from "./getMonthDate";

export const getMonthDays = {
  number,
  next,
  prev,
  current,
};

export * from "./addZero";
export * from "./isValidDateString";
