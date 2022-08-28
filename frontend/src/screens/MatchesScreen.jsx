import React, { Component } from "react";
import TopBar from "../components/TopBar";
import "./MatchesScreen.css";

export default function MatchesScreen() {
  let LinkedMenuItems = [
    { name: "Mis Competiciones", link: "/me/competitions" },
    { name: "Market", link: "/me/market" },
  ];

  return (
    <div className="main-screen">
      <TopBar title="Mis Partidos" linkedItems={LinkedMenuItems} />
    </div>
  );
}
