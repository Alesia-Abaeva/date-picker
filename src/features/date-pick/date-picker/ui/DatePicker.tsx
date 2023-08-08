import * as React from "react";
import { CalendarPopup } from "./components";
import "./DatePicker.css";

const DatePicker: React.FC<DatePickerProps> = ({ value, onChange }) => {
  const [showPopup, setShowPopup] = React.useState(false);

  const onFocus = () => {
    setShowPopup(true);
  };

  return (
    <>
      <div>
        <input type="text" onFocus={onFocus} />
        {showPopup && <CalendarPopup value={value} onChange={onChange} />}
      </div>
    </>
  );
};

export default DatePicker;
