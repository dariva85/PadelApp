import React, { Component, useState, useEffect } from "react";
import TopBar from "../components/TopBar";
import CompetitionBtn from "../components/CompetitionBtn";
import "./CompetitionsScreen.css";
import * as api from "../api/api.js";

export default function CompetitionsScreen() {
  const [competitions, setCompetitions] = useState([]);

  let LinkedMenuItems = [
    { name: "Mis Partidos", link: "/me/matches" },
    { name: "Market", link: "/me/market" },
  ];

  const LoadCompetitions = async () => {
    const {
      success,
      result: dbCompetitions,
      error,
    } = await api.getCompetitions("62adf55dd1d8cd0272ddab9b");
    if (success) {
      setCompetitions(dbCompetitions.results[0]);
    } else {
      setMessage(error);
    }
  };

  const AddCompetitionButtons = (competitionItems) => {
    return competitionItems.map((item) => (
      <div id={item._id} className="competition">
        <CompetitionBtn className="competition" Competition={item} />
      </div>
    ));
  };

  useEffect(() => {
    LoadCompetitions();
  }, []);

  return (
    <div className="main-screen">
      <TopBar
        id="topBar"
        userID="tete"
        title="Mis Competiciones"
        linkedItems={LinkedMenuItems}
      />
      <div className="competitions-container">
        {AddCompetitionButtons(competitions)}
      </div>
    </div>
  );
}
