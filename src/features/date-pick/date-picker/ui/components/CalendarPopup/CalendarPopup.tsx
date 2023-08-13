import * as React from "react";
import { clsx } from "clsx";
import { CONST } from "shared/const";
import { getMonthDays, isToday } from "shared/utils";
import "./CalendarPopup.css";
interface CalendarPopupProps {
  selectedValue: Date; // значение которое выбранно пользователем
  inputValue?: Date;
  onChange: (value: Date) => void;
  min?: Date;
  max?: Date;
}

const CalendarPopup: React.FC<CalendarPopupProps> = ({
  selectedValue,
  inputValue,
  onChange,
}) => {
  // variables responsible for the year and month in the panel
  const [panelYear, setPanelYear] = React.useState(() =>
    selectedValue.getFullYear()
  );
  const [panelMonth, setPanelMonth] = React.useState(() =>
    selectedValue.getMonth()
  );

  const todayDate = React.useMemo(() => new Date(), []);

  // Почему useLayoutEffect? Не будет моргания в интерфейсе, то есть сначала компонент отрендерился по статике, потом по измененным.
  // useLayoutEffect вызывается синхронно, после того как вызывался DOM, то есть у нас обновится опять стейт, и компонент заново перерендерится
  React.useLayoutEffect(() => {
    if (!inputValue) {
      return;
    }

    setPanelMonth(inputValue.getMonth());
  }, [inputValue]);

  const [year, month, day, nMonth] = React.useMemo(() => {
    const currentYear = selectedValue.getFullYear();
    const currentDate = selectedValue.getDate();
    const currentMonth = CONST.MONTHS[selectedValue.getMonth()];
    const numberMonth = selectedValue.getMonth();

    return [currentYear, currentMonth, currentDate, numberMonth];
  }, [selectedValue]);

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
        {day} {panelMonth + 1} {panelYear}
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
        {dateCells.map(({ date, month: m, year: y, type }) => {
          const isSelectedDate = date === day && m === nMonth && y === year; //текущая дата
          const isTodayDate = isToday(todayDate, {
            date,
            month: m,
            year: y,
            type,
          });
          const isNotCurrent = type !== "current";

          return (
            <div
              key={`${date}.${m}`}
              className="CalendarPanelItem"
              onClick={() => onDateSelect({ date, month: m, year: y, type })}
            >
              <span
                className={clsx(
                  isSelectedDate && "CurrentDate-selected",
                  isTodayDate && "CurrentDate-today",
                  isNotCurrent && "CurrentDate-not-current-month"
                )}
              >
                {date}
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CalendarPopup;
