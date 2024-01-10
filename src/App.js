import React, { useState } from "react";
import Render from "./components/Render";
import { Builder } from "./components/Builder";

export function App() {

  const [workingSource, setWorkingSource] = useState({
    display: "form",
    components: [],
    columns: []
  });

  const [isSubmit, setIsSubmit] = useState(false);



  return (
    <div className="App">
      {!isSubmit ? <><Builder setWorkingSource={setWorkingSource} workingSource={workingSource} /></> : <></>}
      {isSubmit ? <Render components={workingSource} /> : <></>}

      <button type="button" className="btn btn-primary" onClick={() => setIsSubmit(!isSubmit)}>
        Save
      </button>
    </div>
  );
}
