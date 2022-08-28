import React, { Component } from "react";
import TopBar from "../components/TopBar";
import "./CompetitionsScreen.css";

export default function CompetitionsScreen() {
  let LinkedMenuItems = [
    { name: "Mis Partidos", link: "/me/matches" },
    { name: "Market", link: "/me/market" },
  ];

  return (
    <div className="main-screen">
      <TopBar
        id="topBar"
        userID="tete"
        title="Mis Competiciones"
        linkedItems={LinkedMenuItems}
      />
    </div>
  );
}
