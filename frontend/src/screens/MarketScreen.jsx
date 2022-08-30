import React, { Component } from "react";
import TopBar from "../components/TopBar";
import "./MarketScreen.css";

export default function MarketScreen() {
  let LinkedMenuItems = [
    { name: "Mis competiciones", link: "/me/competitions" },
    { name: "Mis Partidos", link: "/me/matches" },
  ];

  return (
    <div className="main-screen">
      <TopBar title="Market" linkedItems={LinkedMenuItems} />
    </div>
  );
}
