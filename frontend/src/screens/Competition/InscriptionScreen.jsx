import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TopBar from "../../components/TopBar";
import InscriptionBtn from "../../components/InscriptionBtn";
import "./InscriptionScreen.css";
import * as api from "../../api/api.js";
import * as usr from "../../User";

export default function InscriptionScreen() {
  const { competitionId } = useParams();
  const [inscriptions, setInscriptions] = useState([]);
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

  const LoadOpenedInscriptions = async () => {
    const {
      success,
      result: Inscription,
      error,
    } = await api.findAllOpenedInscriptions(competitionId);
    if (success) {
      setInscriptions(Inscription.results[0]);
    } else {
      setMessage(error);
    }
  };

  const signUpToInscription = async (inscriptionId, userId) => {
    const signupdata = {
      userId: userId,
      inscriptionId: inscriptionId,
    };
    const { success, result, error } = await api.signUpOnCompetition({
      signupdata,
    });
    if (success) {
      LoadOpenedInscriptions();
    } else {
      setMessage(error);
    }
  };

  const AddInscriptiontionButtons = (inscriptionItems) => {
    return inscriptionItems.map((item) => (
      <div id={item._id} className="inscription">
        <InscriptionBtn
          className="inscription"
          Inscription={item}
          userId={usr.readUser()._id}
          signUpClickEvent={signUpToInscription}
        />
      </div>
    ));
  };

  useEffect(() => {
    LoadCompetition();
    LoadOpenedInscriptions();
  }, []);

  return (
    <div className="main-screen">
      <TopBar title={competition.nombre} linkedItems={LinkedMenuItems} />
      <div className="inscriptions-container">
        {AddInscriptiontionButtons(inscriptions)}
      </div>
    </div>
  );
}
