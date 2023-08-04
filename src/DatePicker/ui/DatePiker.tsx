import * as React from "react";
import { MONTHS } from "shared/const";
import { getDateInAMonth } from "shared/utils";

interface DatePickerProps {
  value: Date;
  onChange: (value: Date) => void;
}

export const DatePiker: React.FC<DatePickerProps> = ({ value, onChange }) => {
  // variables responsible for the year and month in the panel
  const [panelYear, setPanelDate] = React.useState(() => value.getFullYear());
  const [panelMonth, setPanelMonth] = React.useState(() => value.getFullYear());

  const [year, month, day] = React.useMemo(() => {
    const currentYear = value.getFullYear();
    const currentDate = value.getDate();
    const currentMonth = MONTHS[value.getMonth()];

    return [currentYear, currentMonth, currentDate];
  }, [value]);

  const dateCells: DateCellItem = React.useMemo(() => {
    const items: DateCellItem[] = [];

    // we determine how many days in a month

    const daysInAMonth = getDateInAMonth(panelYear, panelMonth);

    return items;
  }, [panelYear, panelMonth]);
  //   date cell in the calendar

  //   const nextYear = () => {};

  //   const prevYear = () => {};

  //   const nextMonth = () => {};

  //   const prevMonth = () => {};

  return (
    <>
      <div>DATE</div>
      <div>
        {day} {month} {year}
      </div>
    </>
  );
};
