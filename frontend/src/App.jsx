import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import LoginScreen from "./screens/LoginScreen";
import CompetitionsScreen from "./screens/CompetitionsScreen";
import MatchesScreen from "./screens/MatchesScreen";
import MarketScreen from "./screens/MarketScreen";

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route
            path="/:userid/competitions"
            element={<CompetitionsScreen />}
          />
          <Route path="/:userid/matches" element={<MatchesScreen />} />
          <Route path="/:userid/market" element={<MarketScreen />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
