import * as React from "react";
import { clsx } from "clsx";
import { CONST } from "shared/const";
import { getMonthDays, isInRange, isToday } from "shared/utils";
import "./CalendarPopup.css";

interface CalendarPopupProps {
  selectedValue: Date; // the value selected by the user
  inputValue?: Date;
  onChange: (value: Date) => void;
  min?: Date;
  max?: Date;
}

const CalendarPopup: React.FC<CalendarPopupProps> = ({
  selectedValue,
  inputValue,
  onChange,
  min,
  max,
}) => {
  // variables responsible for the year and month in the calendar panel
  const [panelYear, setPanelYear] = React.useState(() =>
    selectedValue.getFullYear()
  );
  const [panelMonth, setPanelMonth] = React.useState(() =>
    selectedValue.getMonth()
  );

  const todayDate = React.useMemo(() => new Date(), []);

  /**
   * Why useLayoutEffect?
   * There will be no blinking in the interface, that is, first the component was rendered according to statics, then according to already changed values.
   * useLayoutEffect is called synchronously, after the DOM has been called,
   * that is, we will update the state again, and the component will be re-rendered
   */

  React.useLayoutEffect(() => {
    if (!inputValue) {
      return;
    }

    setPanelMonth(inputValue.getMonth());
    setPanelYear(inputValue.getFullYear());
  }, [inputValue]);

  const [year, day, nMonth] = React.useMemo(() => {
    const currentYear = selectedValue.getFullYear();
    const currentDate = selectedValue.getDate();
    const numberMonth = selectedValue.getMonth();

    return [currentYear, currentDate, numberMonth];
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
      <div className="SelectedDate" data-testid="calendar-popup-month">
        {CONST.MONTHS[panelMonth]} {panelYear}
      </div>
      <div className="Controller">
        <button onClick={prevYear} data-testid="calendar-btn-prev-year">
          Prev Year
        </button>
        <button onClick={prevMonth} data-testid="calendar-btn-prev-month">
          Prev Month
        </button>
        <div />
        <button onClick={nextMonth} data-testid="calendar-btn-next-month">
          Next Month
        </button>
        <button onClick={nextYear} data-testid="calendar-btn-next-year">
          Next Year
        </button>
      </div>

      <div className="CalendarPanel">
        {CONST.WEEK.map((weekDay) => (
          <div className="CalendarPanelItem" key={weekDay}>
            {weekDay}
          </div>
        ))}
        {dateCells.map((cell) => {
          const isSelectedDate =
            cell.date === day && cell.month === nMonth && cell.year === year; // current date
          const isTodayDate = isToday(todayDate, cell);
          const isNotCurrent = cell.type !== "current";
          const dateValue = new Date(cell.year, cell.month, cell.date);

          const isDateInRange = isInRange({
            value: dateValue,
            min,
            max,
          });

          return (
            <div
              key={`${cell.date}.${cell.month}`}
              className={clsx(
                "CalendarPanelItem",
                isDateInRange && "CalendarPanelItem--not-in-range"
              )}
              onClick={() => !isDateInRange && onDateSelect(cell)}
              data-testid="date-picker-popup-cell"
            >
              <span
                data-testid="date-picker-popup-cell-date"
                className={clsx(
                  isSelectedDate && "CurrentDate--selected",
                  isTodayDate && "CurrentDate--today",
                  isNotCurrent && "CurrentDate--not-current-month"
                )}
              >
                {cell.date}
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CalendarPopup;
