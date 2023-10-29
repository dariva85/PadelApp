import React, { Component, useState, useEffect, useContext } from "react";
import CompetitionBtn from "../components/CompetitionBtn";
import "./CompetitionsScreen.css";
import * as api from "../api/api.js";
import * as usr from "../User";
import * as topBarCtxt from "../components/TopBarCtxt";

export default function CompetitionsScreen() {
  const [competitions, setCompetitions] = useState([]);
  const { topBarInfo, setTopBarInfo } = useContext(topBarCtxt.Ctxt);

  const LoadCompetitions = async () => {
    const {
      success,
      result: dbCompetitions,
      error,
    } = await api.getCompetitions(usr.readUser()._id);
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
    topBarCtxt.setTopBarInfo(
      topBarCtxt.menuByScreen.CompetitionsScreen,
      topBarInfo,
      setTopBarInfo
    );
  }, []);

  return (
    <div id="competitions-main">
      <div id="competitions-container">
        {AddCompetitionButtons(competitions)}
      </div>
    </div>
  );
}
