import * as React from "react";
import "./App.css";
import { DatePiker } from "./DatePicker";

function App() {
  const [date, setDate] = React.useState(() => new Date());

  return <DatePiker value={date} onChange={setDate} />;
}

export default App;
