import React, { useState } from "react";
import Render from "./components/Render";
import { MyForm } from "./components/Builder";

export function App() {

  const [workingSource, setWorkingSource] = useState({
    display: "form",
    components: [],
    columns: []
  });

  const [isSubmit, setIsSubmit] = useState(false);

  const onChange = (schema) => {
    if (schema.type === "columns") {
      let comp = JSON.parse(JSON.stringify(workingSource));
      let allComp = [];
      for (let v of comp?.components) {
        if (v.key != schema.key) { allComp.push(v); }
        else {
          allComp.push(schema);
        }
      }
      setWorkingSource({ ...workingSource, components: allComp });
    } else {
      setWorkingSource(schema);
    }

  };

  return (
    <div className="App">
      <button type="button" className="btn btn-primary" onClick={() => setIsSubmit(!isSubmit)}>
        Save
      </button>
      {!isSubmit ? <>
        <MyForm onChange={onChange} source={workingSource} />
      </> : <></>}

      {isSubmit ? <Render components={workingSource} /> : <></>}
    </div>
  );
}
