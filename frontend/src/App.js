import React, { useEffect, useState } from "react";
import keycloak from "./keycloak.jsx";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Login from "./keycloak.jsx";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  return <Login />;
}

export default App;
