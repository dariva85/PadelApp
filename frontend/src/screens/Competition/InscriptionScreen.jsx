import React, { Component, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InscriptionBtn from "../../components/InscriptionBtn";
import "./InscriptionScreen.css";
import * as api from "../../api/api.js";
import * as usr from "../../User";
import * as topBarCtxt from "../../components/TopBarCtxt";

export default function InscriptionScreen() {
  const { competitionId } = useParams();
  const [inscriptions, setInscriptions] = useState([]);
  const [competition, setCompetition] = useState([]);
  const { topBarInfo, setTopBarInfo } = useContext(topBarCtxt.Ctxt);

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

  const signUpOrDownOfInscription = async (inscriptionId, userId) => {
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
          ClickEvent={signUpOrDownOfInscription}
        />
      </div>
    ));
  };

  useEffect(() => {
    topBarCtxt.setTopBarInfo(
      topBarCtxt.menuByCompetition(competitionId).InscriptionScreen,
      topBarInfo,
      setTopBarInfo
    );
    LoadCompetition();
    LoadOpenedInscriptions();
  }, []);

  return (
    <div className="inscriptions-main">
      <div className="inscriptions-container">
        {AddInscriptiontionButtons(inscriptions)}
      </div>
    </div>
  );
}
