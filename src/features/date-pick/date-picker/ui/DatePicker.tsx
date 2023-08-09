import * as React from "react";
import { isValidDateString, addZero, parseToDate } from "shared/utils";
import { CalendarPopup } from "./components";
import "./DatePicker.css";

const DatePicker: React.FC<DatePickerProps> = ({ value, onChange }) => {
  const [showPopup, setShowPopup] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const ref = React.useRef<HTMLDivElement>(null);

  React.useLayoutEffect(() => {
    const date = addZero(value.getDate());
    const month = addZero(value.getMonth());
    const year = value.getFullYear();

    setInputValue(`${date}-${month}-${year}`);
  }, [value]);

  React.useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const onDocumentClick = (e: MouseEvent) => {
      const target = e.target;

      /**
       * Checking for typing.
       * we can click on the elements, on the nodes
       * and therefore check if you can specify specifics,
       * like inputNode or svg or else
       */
      if (!(target instanceof Node)) {
        return;
      }

      // check if there is content, if there is, we do nothing
      if (element.contains(target)) {
        return;
      }

      setShowPopup(false);
    };

    document.addEventListener("click", onDocumentClick);

    return () => {
      document.removeEventListener("click", onDocumentClick);
    };
  }, []);

  const onFocus = () => {
    setShowPopup(true);
  };

  const onBlur = () => {
    if (!isValidDateString(inputValue)) {
      return;
    }

    const { date, month, year } = parseToDate(inputValue);

    const dateObject = new Date(year, month, date);

    onChange(dateObject);
  };

  const onInputValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);
  };

  return (
    <>
      <div className="CalendarContainer" ref={ref}>
        <input
          type="text"
          onFocus={onFocus}
          value={inputValue}
          onChange={onInputValueChange}
          onBlur={onBlur}
        />
        {showPopup && (
          <div className="CalendarWrapper">
            <CalendarPopup value={value} onChange={onChange} />
          </div>
        )}
      </div>
    </>
  );
};

export default DatePicker;
