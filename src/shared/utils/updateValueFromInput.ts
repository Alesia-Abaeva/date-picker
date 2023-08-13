import { isValidDateString, parseToDate } from "shared/utils";
/** проверяем валидное ли значение ввели в инпуте, если да - парсим и возвращаем объект даты */
export const updateValueFromInput = (inputValue: string) => {
  if (!isValidDateString(inputValue)) {
    console.log(inputValue, "isValidDateString");

    return;
  }

  // console.log(inputValue);

  const { date, month, year } = parseToDate(inputValue);
  const dateObject = new Date(year, month - 1, date);

  return dateObject;
};
