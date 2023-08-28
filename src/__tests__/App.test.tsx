import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Features } from "features/date-pick";

describe("Date Picker test", () => {
  it("should show correct date in input", () => {
    render(
      <Features.DatePicker value={new Date(2023, 7, 28)} onChange={() => {}} />
    );

    expect(screen.getByTestId("date-picker-input")).toHaveValue("28-08-2023");
  });

  // it("should open popup when click on input");
  // it("should close popup when  we click on outside");

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
