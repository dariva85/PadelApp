import React, { useState, useContext, useEffect } from "react";
import "./MatchesScreen.css";
import MatchesCard from "../components/MatchesCard";
import * as topBarCtxt from "../components/TopBarCtxt";
import * as api from "../api/api.js";
import * as usr from "../User";

export default function MatchesScreen() {
  const { topBarInfo, setTopBarInfo } = useContext(topBarCtxt.Ctxt);
  const [macthes, setMacthes] = useState([]);

  const LoadMatches = async () => {
    console.log(usr.readUser());
    const {
      success,
      result: dbCompetitions,
      error,
    } = await api.getMatches(usr.readUser()._id);
    //630fa119fcafb33cdbb10fd5  Este es el id de una persona
    //62adf55dd1d8cd0272ddab91 este es de la competicion
    //62adf55dd1d8cd0272ddab9e
    if (success) {
      setMacthes(dbCompetitions.results[0]);
    } else {
      setMessage(error);
    }
  };

  const AddMatchesCards = (competitionItems) => {
    return competitionItems.map((item) => <MatchesCard matches={item} />);
  };
  useEffect(() => {
    LoadMatches();
    topBarCtxt.setTopBarInfo(
      topBarCtxt.menuByScreen.MatchesScreen,
      topBarInfo,
      setTopBarInfo
    );
  }, []);

  return (
    <div className="main-screen">
      <div className="matches-container">{AddMatchesCards(macthes)}</div>
    </div>
  );
}
