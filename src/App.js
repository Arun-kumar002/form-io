import React, { useState } from "react";
import Render from "./components/Render";
import { Builder } from "./components/Builder";
import { Routes, Route } from "react-router-dom";
import Submit from "./components/Submit";
export function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Builder />} />
        <Route path="/render/:id" element={<Render />} />
        <Route path="/submit/:id" element={<Submit />} />
      </Routes>

    </div>
  );
}
