import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TopBar from "../../components/TopBar";
import "./InformationScreen.css";
import * as api from "../../api/api.js";

export default function InformationScreen() {
  const { competitionId } = useParams();
  const [competition, setCompetition] = useState([]);

  let LinkedMenuItems = [
    {
      name: "Incripción",
      link: `/me/competitions/${competitionId}/Inscription`,
    },
    {
      name: "Partidos",
      link: `/me/competitions/${competitionId}/Matches`,
    },
    {
      name: "Ranking",
      link: `/me/competitions/${competitionId}/Ranking`,
    },
    {
      name: "Información",
      link: "",
      highlight: true,
    },
  ];

  const LoadCompetition = async () => {
    const {
      success,
      result: Competition,
      error,
    } = await api.getCompetition(competitionId);
    if (success) {
      console.log(Competition);
      setCompetition(Competition.results[0]);
    } else {
      setMessage(error);
    }
  };

  useEffect(() => {
    LoadCompetition();
  }, []);

  return (
    <div className="main-screen">
      <TopBar title={competition.nombre} linkedItems={LinkedMenuItems} />
    </div>
  );
}
