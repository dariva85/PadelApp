import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TopBar from "../../components/TopBar";
import "./InscriptionScreen.css";
import * as api from "../../api/api.js";

export default function InscriptionScreen() {
  const { competitionId } = useParams();
  const [competition, setCompetition] = useState([]);

  let LinkedMenuItems = [
    { name: "Inscripción", link: "", highlight: true },
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
      link: `/me/competitions/${competitionId}/Information`,
    },
  ];

  const LoadCompetition = async () => {
    const {
      success,
      result: Competition,
      error,
    } = await api.getCompetition(competitionId);
    if (success) {
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
