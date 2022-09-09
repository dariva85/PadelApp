import React, { Component, useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import * as topBarCtxt from "../../components/TopBarCtxt";
import "./RankingScreen.css";
import * as api from "../../api/api.js";

export default function RankingScreen() {
  const { competitionId } = useParams();
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

  useEffect(() => {
    LoadCompetition();
    topBarCtxt.setTopBarInfo(
      topBarCtxt.menuByCompetition(competitionId).RankingScreen,
      topBarInfo,
      setTopBarInfo
    );
  }, []);

  return <div className="main-screen"></div>;
}
