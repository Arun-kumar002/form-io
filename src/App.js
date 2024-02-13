import React, { useState } from "react";
import Render from "./components/Render";
import { Builder } from "./components/Builder";
import { Routes, Route } from "react-router-dom";
import Submit from "./components/Submit";
// import 'antd/dist/antd.css'
import GenericForms from "./components/GenericForms";
export function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<GenericForms />} />
        <Route path="/build" element={<Builder />} />
        <Route path="/render/:id" element={<Render />} />
        <Route path="/submit/:id" element={<Submit />} />
      </Routes>

    </div>
  );
}
