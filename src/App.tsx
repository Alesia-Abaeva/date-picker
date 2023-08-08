import * as React from "react";
import { Features } from "features/date-pick";
import "./App.css";

function App() {
  const [date, setDate] = React.useState(() => new Date());

  return (
    <>
      <Features.DatePicker value={date} onChange={setDate} />
    </>
  );
}

export default App;
