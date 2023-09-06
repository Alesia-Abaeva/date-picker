import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Features } from "features/date-pick";
import React from "react";

const min = new Date(2023, 7, 28);
const max = new Date(2023, 8, 4);
const initialDate = new Date(2024, 7, 28);
const initialDateString = "28-08-2024";
const todayDate = new Date();
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

const TestApp = ({
  value = initialDate,
  onChange,
  min,
  max,
}: DatePickerProps) => {
  const [date, setDate] = React.useState(value);

  const handleChange = (value: Date) => {
    onChange?.(value);
    setDate(value);
  };

  return (
    <Features.DatePicker
      value={date}
      min={min}
      max={max}
      onChange={handleChange}
    />
  );
};

describe("Date Picker test", () => {
  it("should show correct date in input", () => {
    render(<TestApp value={initialDate} onChange={() => {}} />);

    expect(screen.getByTestId("date-picker-input")).toHaveValue(
      initialDateString
    );
  });

  it("should open popup when click on input", async () => {
    render(
      <TestApp value={initialDate} min={min} max={max} onChange={() => {}} />
    );
    const input = screen.getByTestId("date-picker-input");

    await userEvent.click(input);

    expect(screen.queryByTestId("dp-popup")).toBeInTheDocument();
  });

  it("should close popup when  we click on outside", async () => {
    render(<TestApp value={initialDate} onChange={() => {}} />);

    // open popup
    userEvent.click(screen.getByTestId("date-picker-input"));
    expect(screen.queryByTestId("date-picker-input")).toBeInTheDocument();

    // close popup
    await userEvent.click(document.documentElement);
    expect(screen.queryByTestId("dp-popup")).not.toBeInTheDocument();
  });

  it("should highlight today", async () => {
    render(<TestApp value={tomorrow} onChange={() => {}} />);

    // open popup
    await userEvent.click(screen.getByTestId("date-picker-input"));
    expect(screen.queryByTestId("dp-popup")).toBeInTheDocument();

    const todayCells = screen
      .getAllByTestId("date-picker-popup-cell-date")
      .filter((item) => item.classList.contains("CurrentDate--today"));

    expect(todayCells).toHaveLength(1);

    const today = todayCells[0];
    expect(today).toHaveClass("CurrentDate--today");
    expect(today).toHaveTextContent(todayDate.getDate().toString());
  });

  it("should highlight selected date", async () => {
    render(<TestApp value={initialDate} onChange={() => {}} />);

    // open popup
    await userEvent.click(screen.getByTestId("date-picker-input"));
    expect(screen.queryByTestId("dp-popup")).toBeInTheDocument();

    const selectedCell = screen
      .getAllByTestId("date-picker-popup-cell-date")
      .filter((item) => item.classList.contains("CurrentDate--selected"));

    expect(selectedCell).toHaveLength(1);

    const selected = selectedCell[0];
    expect(selected).toHaveClass("CurrentDate--selected");
    expect(selected).toHaveTextContent(initialDate.getDate().toString());
  });

  it("should select date", async () => {
    const onChange = jest.fn();

    render(
      <TestApp value={initialDate} min={min} max={max} onChange={onChange} />
    );

    const input = screen.getByTestId("date-picker-input");
    await userEvent.click(input); // open popup

    const selectCells = screen
      .getAllByTestId("date-picker-popup-cell-date")
      .filter((item) => item.textContent === "15"); // get 15-th date

    expect(selectCells).toHaveLength(1);

    await userEvent.click(selectCells[0]);

    // popup must close
    expect(screen.queryByTestId("dp-popup")).not.toBeInTheDocument();
    expect(onChange).toBeCalledTimes(1);
    expect(onChange).toBeCalledWith(new Date(2024, 7, 15));
    expect(input).toHaveValue("15-08-2024");
  });

  it("should apply valid date from input on outside click", async () => {
    const onChange = jest.fn();

    render(
      <TestApp value={initialDate} min={min} max={max} onChange={onChange} />
    );

    const input = screen.getByTestId("date-picker-input");

    await userEvent.clear(input);
    await userEvent.type(input, "31-08-2024");

    // outside click
    await userEvent.click(document.documentElement);

    expect(onChange).toBeCalledWith(new Date(2024, 7, 31));
  });

  it("should reset invalid date from input on outside click", async () => {
    const onChange = jest.fn();

    render(
      <TestApp value={initialDate} min={min} max={max} onChange={onChange} />
    );

    const input = screen.getByTestId("date-picker-input");

    await userEvent.clear(input);
    await userEvent.type(input, "35-08-2024");

    // outside click
    await userEvent.click(document.documentElement);

    expect(onChange).not.toBeCalledWith();
    expect(input).toHaveValue(initialDateString);
  });

  it("should show correct month in popup", async () => {
    render(
      <TestApp value={initialDate} min={min} max={max} onChange={() => {}} />
    );

    const initMonth = "August 2024";
    const input = screen.getByTestId("date-picker-input");

    await userEvent.click(input);
    const month = screen.getByTestId("calendar-popup-month");

    expect(month).toHaveTextContent(initMonth);
  });
  it("should move to the prev month", async () => {
    render(
      <TestApp value={initialDate} min={min} max={max} onChange={() => {}} />
    );

    const prevMonth = "July 2024";
    const prevPrevMonth = "June 2024";

    const input = screen.getByTestId("date-picker-input");

    await userEvent.click(input);

    const btn = screen.getByTestId("calendar-btn-prev-month");
    const month = screen.getByTestId("calendar-popup-month");

    await userEvent.click(btn);

    expect(month).toHaveTextContent(prevMonth);

    await userEvent.click(btn);

    expect(month).toHaveTextContent(prevPrevMonth);
  });

  it("should move to the next month", async () => {
    render(
      <TestApp value={initialDate} min={min} max={max} onChange={() => {}} />
    );

    const nextMonth = "September 2024";
    const nextNextMonth = "October 2024";

    const input = screen.getByTestId("date-picker-input");

    await userEvent.click(input);

    const btn = screen.getByTestId("calendar-btn-next-month");
    const month = screen.getByTestId("calendar-popup-month");

    await userEvent.click(btn);

    expect(month).toHaveTextContent(nextMonth);

    await userEvent.click(btn);

    expect(month).toHaveTextContent(nextNextMonth);
  });

  it("should move to the prev year", async () => {
    render(
      <TestApp value={initialDate} min={min} max={max} onChange={() => {}} />
    );

    const input = screen.getByTestId("date-picker-input");

    await userEvent.click(input);

    const btn = screen.getByTestId("calendar-btn-next-year");
    const month = screen.getByTestId("calendar-popup-month");

    await userEvent.click(btn);

    expect(month).toHaveTextContent("August 2025");

    await userEvent.click(btn);

    expect(month).toHaveTextContent("August 2026");
  });

  it("should move to the next year", async () => {
    render(
      <TestApp value={initialDate} min={min} max={max} onChange={() => {}} />
    );

    const input = screen.getByTestId("date-picker-input");

    await userEvent.click(input);

    const btn = screen.getByTestId("calendar-btn-prev-year");
    const month = screen.getByTestId("calendar-popup-month");

    await userEvent.click(btn);

    expect(month).toHaveTextContent("August 2023");

    await userEvent.click(btn);

    expect(month).toHaveTextContent("August 2022");
  });

  it("should update popup calendar when we update input value ", async () => {
    const onChange = jest.fn();

    render(
      <TestApp value={initialDate} min={min} max={max} onChange={onChange} />
    );

    const input = screen.getByTestId("date-picker-input");

    await userEvent.click(input);

    const month = screen.getByTestId("calendar-popup-month");

    await userEvent.clear(input);
    await userEvent.type(input, "01-08-2024");

    expect(input).toHaveValue("01-08-2024");
    expect(month).toHaveTextContent("August 2024");

    await userEvent.click(input);

    await userEvent.clear(input);
    await userEvent.type(input, "01-08-2022");

    expect(input).toHaveValue("01-08-2022");
    expect(month).toHaveTextContent("August 2022");
  });

  describe("test min max range", () => {
    it("highlight input with out of range date", async () => {
      render(
        <TestApp value={initialDate} min={min} max={max} onChange={() => {}} />
      );

      const input = screen.getByTestId("date-picker-input");
      // min
      await userEvent.clear(input);
      await userEvent.type(input, "29-08-2023");

      expect(input).toHaveClass("CalendarInput--invalid");

      // max
      await userEvent.clear(input);
      await userEvent.type(input, "04-09-2023");

      expect(input).toHaveClass("CalendarInput--invalid");

      // correct
      await userEvent.clear(input);
      await userEvent.type(input, "20-09-2023");

      expect(input).toHaveClass("CalendarInput");
      expect(input).not.toHaveClass("CalendarInput--invalid");
    });

    it("should disable dates uot of range", async () => {
      const onChange = jest.fn();

      render(
        <TestApp value={initialDate} min={min} max={max} onChange={onChange} />
      );

      const input = screen.getByTestId("date-picker-input");

      await userEvent.click(input);

      const btn = screen.getByTestId("calendar-btn-prev-year");

      await userEvent.click(btn);

      const dateCells = screen
        .getAllByTestId("date-picker-popup-cell-date")
        .filter((item) =>
          item.classList.contains("CurrentDate--not-current-month")
        );

      dateCells.forEach((cell) => userEvent.click(cell));
      expect(onChange).not.toBeCalled();
    });
  });
});
