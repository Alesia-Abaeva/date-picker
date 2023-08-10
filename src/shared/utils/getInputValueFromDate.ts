import { addZero } from "shared/utils";

export const getInputValueFromDate = (value: Date) => {
  const date = addZero(value.getDate());
  const month = addZero(value.getMonth() + 1);
  // TODO:
  const year = value.getFullYear();

  return `${date}-${month}-${year}`;
};
