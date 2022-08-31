import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useState } from "react";
import LoginScreen from "./screens/LoginScreen";
import CompetitionsScreen from "./screens/CompetitionsScreen";
import MatchesScreen from "./screens/MatchesScreen";
import MarketScreen from "./screens/MarketScreen";
import InscriptionScreen from "./screens/Competition/InscriptionScreen";
import InformationScreen from "./screens/Competition/InformationScreen";
import CompetitionMatchesScreen from "./screens/Competition/CompetitionMatchesScreen";
import RankingScreen from "./screens/Competition/RankingScreen";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route
            path="/me/competitions"
            element={
              <ProtectedRoute>
                <CompetitionsScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/me/matches"
            element={
              <ProtectedRoute>
                <MatchesScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/me/market"
            element={
              <ProtectedRoute>
                <MarketScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/me/competitions/:competitionId/Inscription"
            element={
              <ProtectedRoute>
                <InscriptionScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/me/competitions/:competitionId/Matches"
            element={
              <ProtectedRoute>
                <CompetitionMatchesScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/me/competitions/:competitionId/Ranking"
            element={
              <ProtectedRoute>
                <RankingScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/me/competitions/:competitionId/Information"
            element={
              <ProtectedRoute>
                <InformationScreen />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
