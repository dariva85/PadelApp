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
import InformationCompetitionScreen from "./screens/InformationCompetitionScreen";
import RankingScreen from "./screens/Competition/RankingScreen";
import UserInfo from "./screens/Usuario/UserInfo";
import PasswordChange from "./screens/Usuario/PasswordChange";
import * as tk from "./api/token";
import { useEffect } from "react";
import TopBar from "./components/TopBar/TopBar";
import * as topBarCtxt from "./components/TopBarCtxt";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  const [token, setToken] = useState(tk.isTokenValid());
  const [topBarInfo, setTopBarInfo] = useState({ title: "" });
  const TopBarCtxtValue = { topBarInfo, setTopBarInfo };
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

  const AddTopBar = () => {
    if (topBarInfo != null) {
      return (
        <TopBar
          id="topBar"
          title={topBarInfo.title}
          linkedItems={topBarInfo.linkedItems}
          showUserImage={
            topBarInfo.showUserImage ? topBarInfo.showUserImage : false
          }
          showHomeLogo={
            topBarInfo.showHomeLogo ? topBarInfo.showHomeLogo : false
          }
          logout={logout}
        />
      );
    } else {
      return <TopBar id="topBar" />;
    }
  };

  if (!token) {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    console.log(clientId);
    return (
      <GoogleOAuthProvider clientId={clientId}>
        <LoginScreen onLogin={login} />
      </GoogleOAuthProvider>
    );
  }
  return (
    <div id="app-div">
      <topBarCtxt.Ctxt.Provider id="top-bar-ctxt" value={TopBarCtxtValue}>
        {AddTopBar()}
        <div id="top-bar-padding"></div>
        <Routes>
          <Route path="/" element={<CompetitionsScreen />} />
          <Route path="/me/matches" element={<MatchesScreen />} />
          <Route path="/me/market" element={<MarketScreen />} />
          <Route
            path="/competition/:competitionId"
            element={<InformationCompetitionScreen />}
          />
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
          <Route path="/userinfo" element={<UserInfo />} />
          <Route path="/passwordchange" element={<PasswordChange />} />
        </Routes>
      </topBarCtxt.Ctxt.Provider>
    </div>
  );
}

export default App;
