interface Range {
  min?: Date;
  max?: Date;
  value?: Date;
  cell: DateCellItem;
}

export const isInRange = ({ min, max, cell }: Range) => {
  if (min && max) {
    return (
      isSmallerThanDate({ cell, date: max }) &&
      isBiggerThanDate({ cell, date: min })
    );
  }

  if (min) {
    return isBiggerThanDate({ cell, date: min });
  }

  if (max) {
    return isSmallerThanDate({ cell, date: max });
  }

  return true;
};

const isBiggerThanDate = ({ date, cell }: DateCell) => {
  if (cell?.year > date.getFullYear()) {
    return true;
  }

  if (cell?.year < date.getFullYear()) {
    return false;
  }

  if (cell.month > date.getMonth()) {
    return true;
  }

  if (cell.month < date.getMonth()) {
    return false;
  }

  return cell.date >= date.getDate();
};

const isSmallerThanDate = ({ date, cell }: DateCell) => {
  if (cell.year > date.getFullYear()) {
    return false;
  }

  if (cell.year < date.getFullYear()) {
    return true;
  }

  if (cell.month > date.getMonth()) {
    return false;
  }

  if (cell.month < date.getMonth()) {
    return true;
  }

  return cell.date <= date.getDate();
};
