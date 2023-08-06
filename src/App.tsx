import * as React from "react";
import { DatePiker } from "./DatePicker";
import "./App.css";

function App() {
  const [date, setDate] = React.useState(() => new Date());

  return <DatePiker value={date} onChange={setDate} />;
}

export default App;
