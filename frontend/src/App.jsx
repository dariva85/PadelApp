import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useState } from "react";
import LoginScreen from "./screens/LoginScreen";
import CompetitionsScreen from "./screens/CompetitionsScreen";
import MatchesScreen from "./screens/MatchesScreen";
import MarketScreen from "./screens/MarketScreen";
import CompetitionInscriptionScreen from "./screens/CompetitionInscriptionScreen";
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
            path="/me/competitions/:competitionId/Inscriptions"
            element={
              <ProtectedRoute>
                <CompetitionInscriptionScreen />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
