import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Form from "./form.js";
import Dashboard from "./dashboard.jsx";
import Usuarios from "./usuario.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/form" element={<Form />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/usuarios" element={<Usuarios />} />
    </Routes>
  </BrowserRouter>
);
