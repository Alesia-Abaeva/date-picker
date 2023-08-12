import * as React from "react";
import { getInputValueFromDate, updateValueFromInput } from "shared/utils";
import { CalendarPopup } from "./components";
import "./DatePicker.css";

const DatePicker: React.FC<DatePickerProps> = ({ value, onChange }) => {
  const [showPopup, setShowPopup] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const ref = React.useRef<HTMLDivElement>(null);

  React.useLayoutEffect(() => {
    setInputValue(getInputValueFromDate(value));
  }, [value]);
  // так как мы не можем гарантировать, что вне компонента value не будет меняться

  // эффект, который открывает и закрывает поп-ап
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

  const onInputValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value.trim());
  };

  const handleUpdateValueFromInput = () => {
    const dateObject = updateValueFromInput(inputValue);

    if (!dateObject) {
      return;
    }
    onChange(dateObject);
  };

  const onFocus = () => {
    setShowPopup(true);
  };

  const onBlur = () => {
    handleUpdateValueFromInput();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "Enter") {
      return;
    }
    handleUpdateValueFromInput();
  };

  // use memo for update input value
  const inputValueDate = React.useMemo(() => {
    const dateObject = updateValueFromInput(inputValue);

    if (!dateObject) {
      return;
    }

    return dateObject;
  }, [inputValue]);

  return (
    <>
      <h1>DatePicker </h1>
      <h4>To select or input a date.</h4>
      <div className="CalendarContainer" ref={ref}>
        <input
          type="text"
          onFocus={onFocus}
          value={inputValue}
          onChange={onInputValueChange}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
        />
        {showPopup && (
          <div className="CalendarWrapper">
            <CalendarPopup
              selectedValue={value}
              onChange={onChange}
              inputValue={inputValueDate}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default DatePicker;
