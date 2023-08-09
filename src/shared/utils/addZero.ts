export const addZero = (value: number) => {
  if (value > 9) {
    return value.toString();
  }

  return `0${value}`;
};
