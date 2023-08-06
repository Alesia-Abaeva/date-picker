import * as React from "react";
import { CONST } from "shared/const";
import { getMonthDays } from "shared/utils";
import "./DatePiker.css";
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
    const currentMonth = CONST.MONTHS[value.getMonth()];

    return [currentYear, currentMonth, currentDate];
  }, [value]);

  const dateCells = React.useMemo<DateCellItem[]>(() => {
    // we determine how many days in a month

    // TODO:
    const daysInAMonth = getMonthDays.number(panelYear, panelMonth);

    const currentMonthDays = getMonthDays.current(
      panelYear,
      panelMonth,
      daysInAMonth
    );
    const prevMonthDays = getMonthDays.prev(panelYear, panelMonth);
    const nextMonthDays = getMonthDays.next(panelYear, panelMonth);

    console.log(prevMonthDays);

    return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
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
      <div className="CalendarPanel">
        {CONST.WEEK.map((weekDay) => (
          <div className="CalendarPanelItem" key={weekDay}>
            {weekDay}
          </div>
        ))}
        {dateCells.map((cell) => {
          return (
            <div
              key={`${cell.date}.${cell.month}`}
              className="CalendarPanelItem"
            >
              {cell.date}
            </div>
          );
        })}
      </div>
    </>
  );
};
