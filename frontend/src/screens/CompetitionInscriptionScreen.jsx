import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TopBar from "../components/TopBar";
import "./CompetitionInscriptionScreen.css";
import * as api from "../api/api.js";

export default function CompetitionInscriptionScreen() {
  const { competitionId } = useParams();
  const [competition, setCompetition] = useState([]);

  let LinkedMenuItems = [
    { name: "Inscripción", link: "", highlight: true },
    {
      name: "Partidos",
      link: "/me/competitions/${props.Competition._id}/Matches",
    },
    {
      name: "Ranking",
      link: "/me/competitions/${props.Competition._id}/Ranking",
    },
    {
      name: "Información",
      link: "/me/competitions/${props.Competition._id}/Information",
    },
  ];

  const LoadCompetitions = async () => {
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
    LoadCompetitions();
  }, []);

  return (
    <div className="main-screen">
      <TopBar title={competition.nombre} linkedItems={LinkedMenuItems} />
    </div>
  );
}
