import * as React from "react";
import { CalendarPopup } from "./components";
import "./DatePicker.css";

const DatePicker: React.FC<DatePickerProps> = ({ value, onChange }) => {
  const [showPopup, setShowPopup] = React.useState(false);

  const ref = React.useRef<HTMLDivElement>(null);

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

  return (
    <>
      <div className="CalendarContainer" ref={ref}>
        <input type="text" onFocus={onFocus} />
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
