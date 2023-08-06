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
  const [panelYear, setPanelYear] = React.useState(() => value.getFullYear());
  const [panelMonth, setPanelMonth] = React.useState(() => value.getMonth());

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

    console.log(prevMonthDays, "prevMonthDays");
    console.log(currentMonthDays);

    return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
  }, [panelYear, panelMonth]);
  //   date cell in the calendar

  const nextYear = () => {
    setPanelYear(panelYear + 1);
  };

  const prevYear = () => {
    setPanelYear(panelYear - 1);
  };

  const nextMonth = () => {
    if (panelMonth === 11) {
      setPanelMonth(0);
      setPanelYear(panelYear + 1);
      return;
    }
    setPanelMonth(panelMonth + 1);
  };

  const prevMonth = () => {
    if (panelMonth === 0) {
      setPanelMonth(11);
      setPanelYear(panelYear - 1);
      return;
    }
    setPanelMonth(panelMonth - 1);
  };

  return (
    <>
      <div>DATE</div>
      <div>
        {day} {month} {year}
      </div>
      <div>
        {day} {panelMonth} {panelYear}
      </div>

      {/* TODO: add component */}

      <div className="Controller">
        <button onClick={prevYear}>prev year</button>
        <button onClick={nextYear}>next year</button>
        <button onClick={prevMonth}>prev month</button>
        <button onClick={nextMonth}>next month</button>
      </div>

      {/* TODO: end add component */}

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
