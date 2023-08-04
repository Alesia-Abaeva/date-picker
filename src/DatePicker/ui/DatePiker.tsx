import * as React from "react";
import { MONTHS } from "shared/const";

interface DatePickerProps {
  value: Date;
  onChange: (value: Date) => void;
}

export const DatePiker: React.FC<DatePickerProps> = ({ value, onChange }) => {
  // переменные, отвечающие за год и месяц в панели
  const [panelYear, setPanelDate] = React.useState(() => value.getFullYear());
  const [panelMonth, setPanelMonth] = React.useState(() => value.getFullYear());

  const [year, month, day] = React.useMemo(() => {
    const currentYear = value.getFullYear();
    const currentDate = value.getDate();
    const currentMonth = MONTHS[value.getMonth()];

    return [currentYear, currentMonth, currentDate];
  }, [value]);

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
