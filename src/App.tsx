import React, { useState } from "react";

import TextField from "./components/text-field";

import "./App.css";

function App() {
  const [name, setName] = useState<string | null>(null);
  const [salary, setSalary] = useState<number | null>(null);
  const [dob, setDob] = useState<string | null>(null);

  return (
    <div>
      {/* <header className="App-header"></header> */}
      <div>
        <h1></h1>
        <TextField value={name} onChange={setName} type="text" />
        <TextField value={salary} type="number" onChange={setSalary} />
        <TextField value={dob} onChange={setDob} type="date" />
      </div>
    </div>
  );
}

export default App;
