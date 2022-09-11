import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import "./InformationCompetitionScreen.css";
import * as api from "../api/api.js";
import * as usr from "../User";
import * as topBarCtxt from "../components/TopBarCtxt";
import InformationLayout from "../components/InformationLayout";

export default function InformationCompetitionScreen() {
  const { competitionId } = useParams();
  const { topBarInfo, setTopBarInfo } = useContext(topBarCtxt.Ctxt);
  const [topBarTilte, setTopBarTitle] = useState("Market");
  const [competition, setCompetition] = useState([]);

  const LoadCompetition = async () => {
    const {
      success,
      result: Competition,
      error,
    } = await api.getCompetition(competitionId);
    if (success) {
      setCompetition(Competition.results[0]);
      if (topBarTilte !== Competition.results[0].nombre)
        setTopBarTitle(Competition.results[0].nombre);
    } else {
      setMessage(error);
    }
  };

  useEffect(() => {
    LoadCompetition();
    if (topBarTilte != "Market") {
      let topBarInformation = topBarCtxt.menuByScreen.MarketInformationScreen;
      topBarInformation.title = topBarTilte;
      topBarCtxt.setTopBarInfo(topBarInformation, topBarInfo, setTopBarInfo);
    }
  }, [topBarTilte]);

  return (
    <div id="information-competition-main" className="main-screen">
      <div
        id="information-competition-container"
        className="information-container"
      >
        <InformationLayout competition={competition} />
      </div>
    </div>
  );
}
