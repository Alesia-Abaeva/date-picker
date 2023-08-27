interface Range {
  min?: Date;
  max?: Date;
  value: Date;
}

export const isInRange = ({ min, max, value }: Range) => {
  if (min && max) {
    return (
      isSmallerThanDate({ value, date: max }) &&
      isBiggerThanDate({ value, date: min })
    );
  }

  if (min) {
    return isBiggerThanDate({ value, date: min });
  }

  if (max) {
    return isSmallerThanDate({ value, date: max });
  }

  return true;
};

const isBiggerThanDate = ({ date, value }: DateCell) => {
  if (value.getFullYear() > date.getFullYear()) {
    return true;
  }

  if (value.getFullYear() < date.getFullYear()) {
    return false;
  }

  if (value.getMonth() > date.getMonth()) {
    return true;
  }

  if (value.getMonth() < date.getMonth()) {
    return false;
  }

  return value.getDate() >= date.getDate();
};

const isSmallerThanDate = ({ date, value }: DateCell) => {
  if (value.getFullYear() > date.getFullYear()) {
    return false;
  }

  if (value.getFullYear() < date.getFullYear()) {
    return true;
  }

  if (value.getMonth() > date.getMonth()) {
    return false;
  }

  if (value.getMonth() < date.getMonth()) {
    return true;
  }

  return value.getDate() <= date.getDate();
};
