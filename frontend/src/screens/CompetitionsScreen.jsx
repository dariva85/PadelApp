import React, { Component } from "react";
import TopBar from "../components/TopBar";
import "./CompetitionsScreen.css";

export default function CompetitionsScreen() {
  let LinkedMenuItems = [
    { name: "Mis Partidos", link: "/main/matches" },
    { name: "Market", link: "/main/market" },
  ];

  return (
    <div className="main-screen">
      <TopBar title="Mis Competiciones" linkedItems={LinkedMenuItems} />
    </div>
  );
}
