import React, { useState } from "react";
import Render from "./components/Render";
import { Builder } from "./components/Builder";
import { Routes, Route, useNavigate } from "react-router-dom";
import Submit from "./components/Submit";
export function App() {

  let [state, setState] = useState({})
  const [workingSource, setWorkingSource] = useState({
    display: "form",
    components: [],
    columns: []
  });


  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Builder setWorkingSource={setWorkingSource} workingSource={workingSource} />} />
        <Route path="/render" element={<Render setState={setState} components={workingSource} />} />
        <Route path="/submit" element={<Submit state={state} />} />
      </Routes>

    </div>
  );
}
