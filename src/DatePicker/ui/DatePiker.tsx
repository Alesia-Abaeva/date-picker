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

  const [year, month, day, nMonth] = React.useMemo(() => {
    const currentYear = value.getFullYear();
    const currentDate = value.getDate();
    const currentMonth = CONST.MONTHS[value.getMonth()];
    const numberMonth = value.getMonth();

    return [currentYear, currentMonth, currentDate, numberMonth];
  }, [value]);

  const dateCells = React.useMemo<DateCellItem[]>(() => {
    const daysInAMonth = getMonthDays.number(panelYear, panelMonth);

    const currentMonthDays = getMonthDays.current(
      panelYear,
      panelMonth,
      daysInAMonth
    );
    const prevMonthDays = getMonthDays.prev(panelYear, panelMonth);
    const nextMonthDays = getMonthDays.next(panelYear, panelMonth);

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

  const onDateSelect = (item: DateCellItem) => {
    onChange(new Date(item.year, item.month, item.date));
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
        {dateCells.map(({ date, month: m, year: y }) => {
          const isCurrentDate = date === day && m === nMonth && y === year;

          return (
            <div
              key={`${date}.${m}`}
              className="CalendarPanelItem"
              onClick={() => onDateSelect({ date, month: m, year: y })}
            >
              <span {...(isCurrentDate ? { className: "CurrentDate" } : {})}>
                {date}
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
};
