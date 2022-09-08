import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import React, { useState } from "react";
import LoginScreen from "./screens/LoginScreen";
import CompetitionsScreen from "./screens/CompetitionsScreen";
import MatchesScreen from "./screens/MatchesScreen";
import MarketScreen from "./screens/MarketScreen";
import InscriptionScreen from "./screens/Competition/InscriptionScreen";
import InformationScreen from "./screens/Competition/InformationScreen";
import CompetitionMatchesScreen from "./screens/Competition/CompetitionMatchesScreen";
import RankingScreen from "./screens/Competition/RankingScreen";
import * as tk from "./api/token";
import { useEffect } from "react";

function App() {
  const [token, setToken] = useState(tk.isTokenValid());
  let location = useLocation();

  const login = () => {
    tk.saveToken(token);
    setToken(tk.isTokenValid());
  };

  const logout = () => {
    tk.deleteToken();
    setToken(tk.isTokenValid());
  };

  useEffect(() => {
    setToken(tk.isTokenValid());
  }, [location]);

  if (!token) {
    return <LoginScreen onLogin={login} />;
  }
  return (
    <Routes>
      <Route path="/" element={<CompetitionsScreen />} />
      <Route path="/me/matches" element={<MatchesScreen />} />
      <Route path="/me/market" element={<MarketScreen />} />
      <Route
        path="/me/competitions/:competitionId/Inscription"
        element={<InscriptionScreen />}
      />
      <Route
        path="/me/competitions/:competitionId/Matches"
        element={<CompetitionMatchesScreen />}
      />
      <Route
        path="/me/competitions/:competitionId/Ranking"
        element={<RankingScreen />}
      />
      <Route
        path="/me/competitions/:competitionId/Information"
        element={<InformationScreen />}
      />
    </Routes>
  );
}

export default App;
