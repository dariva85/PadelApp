import React, { Component } from "react";
import TopBar from "../components/TopBar";
import "./MatchesScreen.css";

export default function MatchesScreen() {
  let LinkedMenuItems = [
    { name: "Mis Competiciones", link: "/main/competitions" },
    { name: "Market", link: "/main/market" },
  ];

  return (
    <div className="main-screen">
      <TopBar title="Mis Partidos" linkedItems={LinkedMenuItems} />
    </div>
  );
}
