import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Features } from "features/date-pick";

const min = new Date(2023, 7, 28);
const max = new Date(2023, 7, 29);
const initialDate = new Date(2024, 7, 28);
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

// add a day

// const todayDate = new Date(2024, 7, 29);
// const RealDate = Date;

describe("Date Picker test", () => {
  // beforeEach(() => {
  //   global.Date.now = () => +todayDate;
  // });

  // afterEach(() => {
  //   global.Date = RealDate;
  // });

  it("should show correct date in input", () => {
    render(<Features.DatePicker value={initialDate} onChange={() => {}} />);

    expect(screen.getByTestId("date-picker-input")).toHaveValue("28-08-2024");
  });

  it("should open popup when click on input", async () => {
    render(
      <Features.DatePicker
        value={initialDate}
        min={min}
        max={max}
        onChange={() => {}}
      />
    );
    const input = screen.getByTestId("date-picker-input");

    await userEvent.click(input);

    expect(screen.queryByTestId("dp-popup")).toBeInTheDocument();
  });

  it("should close popup when  we click on outside", async () => {
    render(<Features.DatePicker value={initialDate} onChange={() => {}} />);

    // open popup
    userEvent.click(screen.getByTestId("date-picker-input"));
    expect(screen.queryByTestId("date-picker-input")).toBeInTheDocument();

    // close popup
    await userEvent.click(document.documentElement);
    expect(screen.queryByTestId("dp-popup")).not.toBeInTheDocument();
  });

  it("should highlight today", async () => {
    render(<Features.DatePicker value={tomorrow} onChange={() => {}} />);

    // open popup
    await userEvent.click(screen.getByTestId("date-picker-input"));
    expect(screen.queryByTestId("dp-popup")).toBeInTheDocument();

    const today = screen
      .getAllByTestId("date-picker-popup-cell-date")
      .filter((item) => item.classList.contains("CurrentDate--today"));

    console.log(today);

    expect(today[0]).toHaveClass("CurrentDate--today");
    expect(today).toHaveLength(1);
    // expect(today).toBeInTheDocument();

    // date-picker-popup-cell
  });

  // it("should select date");

  // it("should apply valid date from input on outside click");

  // it("should reset invalid date from input on outside click");

  // it("should highlight selected date");

  // it("should show correct month in popup");
  // it("should move to the prev month");
  // it("should move to the next month");
  // it("should move to the prev year");
  // it("should move to the next year");

  // it("should update popup calendar when we update input value ");

  // describe("test min max range", () => {
  //   it("should disable dates uot of range");

  //   it("highlight input with out of range date");
  // });
});
