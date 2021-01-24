import { DatePicker, Space } from "antd";

import "./App.scss";

function App() {
  const test = (date, dateString) => {

    console.log(date, dateString);
  };
  return (
    <div className="app">
      <h1>Web personal</h1>
      <DatePicker onChange={test}/>
    </div>
  );
}

export default App;
