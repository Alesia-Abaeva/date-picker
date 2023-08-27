import * as React from "react";
import { clsx } from "clsx";
import { useLatest } from "shared/hook";
import {
  getInputValueFromDate,
  isInRange,
  updateValueFromInput,
} from "shared/utils";
import { CalendarPopup } from "./components";
import "./DatePicker.css";

interface DatePickerProps {
  value: Date;
  onChange: (value: Date) => void;
  min?: Date;
  max?: Date;
}

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  min,
  max,
}) => {
  const [showPopup, setShowPopup] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const ref = React.useRef<HTMLDivElement>(null);

  React.useLayoutEffect(() => {
    setInputValue(getInputValueFromDate(value));
  }, [value]);
  // так как мы не можем гарантировать, что вне компонента value не будет меняться

  const update = () => {
    setShowPopup(false);
    const date = updateValueFromInput(inputValue);

    if (!date) {
      // input value is invalid
      // reset the date
      setInputValue(getInputValueFromDate(value));
      return;
    }

    //
    const isDateInRange = isInRange({
      cell: {
        year: date.getFullYear(),
        month: date.getMonth(),
        date: date.getDate(),
        type: "current",
      },
      min,
      max,
    });

    if (isDateInRange) {
      setInputValue(getInputValueFromDate(value));
      return;
    }

    onChange(date);
  };

  const updateValueOnPopupCloseAction = () => {
    update();
  };

  const latestUpdateValueFromInput = useLatest(updateValueOnPopupCloseAction);

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

      latestUpdateValueFromInput.current();
    };

    document.addEventListener("click", onDocumentClick);

    return () => {
      document.removeEventListener("click", onDocumentClick);
    };
  }, [latestUpdateValueFromInput]);

  const handleChange = (value: Date) => {
    onChange(value);
    setShowPopup(false);
  };

  const onInputValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value.trim());
  };

  const onFocus = () => {
    setShowPopup(true);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "Enter") {
      return;
    }

    update();
  };

  // use memo for update input value
  const [inputValueDate, isValidInputValue] = React.useMemo(() => {
    const date = updateValueFromInput(inputValue);

    if (!date) {
      return [undefined, false];
    }

    const isDateInRange = isInRange({
      cell: {
        year: date.getFullYear(),
        month: date.getMonth(),
        date: date.getDate(),
        type: "current",
      },
      min,
      max,
    });

    return [date, !isDateInRange];
  }, [inputValue, min, max]);

  return (
    <>
      <h1>DatePicker </h1>
      <h4>To select or input a date.</h4>
      <div className="CalendarContainer" ref={ref}>
        <input
          type="text"
          onClick={onFocus}
          value={inputValue}
          onChange={onInputValueChange}
          onKeyDown={onKeyDown}
          className={clsx(!isValidInputValue && "CalendarInput--invalid")}
        />
        {showPopup && (
          <div className="CalendarWrapper">
            <CalendarPopup
              selectedValue={value}
              onChange={handleChange}
              inputValue={inputValueDate}
              min={min}
              max={max}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default DatePicker;
