import * as React from "react";
import { Features } from "features/date-pick";
import "./App.css";

function App() {
  const [date, setDate] = React.useState(() => new Date());

  return (
    <>
      <Features.DatePicker
        value={date}
        onChange={setDate}
        min={new Date(2023, 8, 12)} // минимальное значение, которое можно выбрать
        max={new Date(2023, 9, 12)}
      />
    </>
  );
}

export default App;
