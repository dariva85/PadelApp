import React, { Component } from "react";
import TopBar from "../components/TopBar";
import "./MainScreen.css";

export default function MainScreen() {
  let topBarProps = {
    Title: "Mis Competiciones",
    LinkedItems: [
      { name: "Mis Partidos", link: "aMisPartidos" },
      { name: "Market", link: "aMarquet" },
    ],
  };

  return (
    <div className="main-screen">
      <TopBar props={topBarProps} />
    </div>
  );
}