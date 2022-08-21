import "./App.css";
import TopBar from "./components/TopBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import LoginScreen from "./screens/LoginScreen";
import MainScreen from "./screens/MainScreen";

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginScreen />}></Route>
          <Route path="/main" element={<MainScreen />}></Route>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
