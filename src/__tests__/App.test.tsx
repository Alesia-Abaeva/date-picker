import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Features } from "features/date-pick";

describe("Date Picker test", () => {
  it("should show correct date in input", () => {
    render(
      <Features.DatePicker value={new Date(2023, 7, 28)} onChange={() => {}} />
    );

    expect(screen.getByTestId("date-picker-input")).toHaveValue("28-08-2023");
  });

  it("should open popup when click on input", () => {
    const mockedFunction = jest.fn();
    const min = new Date(2023, 7, 28);
    const max = new Date(2023, 9, 28);

    render(
      <Features.DatePicker
        value={new Date(2024, 7, 20)}
        min={min}
        max={max}
        onChange={mockedFunction}
      />
    );
    const input = screen.getByTestId("date-picker-input");
    userEvent.click(input);

    // const element = screen.getByTestId("date-picker-popup");
    // console.log(element);
    // expect(screen.getByTestId("date-picker-input")).toHaveFocus();

    expect(screen.getByTestId("date-picker-popup")).toBeInTheDocument();
  });

  // it("should close popup when  we click on outside", () => {
  //   render(
  //     <Features.DatePicker value={new Date(2023, 7, 28)} onChange={() => {}} />
  //   );

  //   // open popup
  //   userEvent.click(screen.getByTestId("date-picker-input"));

  //   expect(screen.queryByTestId("date-picker-input")).toBeInTheDocument();

  //   // close popup
  //   userEvent.click(document.documentElement);
  //   expect(screen.queryByTestId("date-picker-popup")).not.toBeInTheDocument();
  // });

  // it("should highlight today");

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
