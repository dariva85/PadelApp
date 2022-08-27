import React, { Component } from "react";
import TopBar from "../components/TopBar";
import "./MarketScreen.css";

export default function MarketScreen() {
  let LinkedMenuItems = [
    { name: "Mis competiciones", link: "/main/competitions" },
    { name: "Mis Partidos", link: "/main/matches" },
  ];

  return (
    <div className="market-screen">
      <TopBar title="Market" linkedItems={LinkedMenuItems} />
    </div>
  );
}
