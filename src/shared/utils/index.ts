import { getDateInAMonth as number } from "./getDateInAMonth";
import {
  getNextMonthDays as next,
  getPreviousMonthDays as prev,
  getCurrentMonthDays as current,
} from "./getMonthDate";

//
// exports
//

export * from "./addZero";
export * from "./isValidDateString";
export * from "./getInputValueFromDate";
export * from "./updateValueFromInput";
export * from "./isToday";
export * from "./isInRange";

export const getMonthDays = {
  number,
  next,
  prev,
  current,
};
