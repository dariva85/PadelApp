import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import * as topBarCtxt from "../../components/TopBarCtxt";
import MatchesCard from "../../components/MatchesCard";
import "./CompetitionMatchesScreen.css";
import * as api from "../../api/api.js";
import * as usr from "../../User";

export default function CompetitionMatchesScreen() {
  const { competitionId } = useParams();
  const [names, setNames] = useState([]);
  const [matches, setMatches] = useState([]);
  const { topBarInfo, setTopBarInfo } = useContext(topBarCtxt.Ctxt);

  const LoadMatches = async () => {
    const {
      success,
      result: Matches,
      error,
    } = await api.getMatchesOfOneCompetition(competitionId);
    if (success) {
      setMatches(Matches.results[0]);
    } else {
      setMessage(error);
    }
  };

  useEffect(() => {
    LoadMatches();
    topBarCtxt.setTopBarInfo(
      topBarCtxt.menuByCompetition(competitionId).MatchesScreen,
      topBarInfo,
      setTopBarInfo
    );
  }, []);

  const AddMatchesCards = (competitionItems, names) => {
    return competitionItems.map((item) => <MatchesCard matches={item} S />);
  };

  return (
    <div className="main-screen">
      <div className="matches-container">{AddMatchesCards(matches, names)}</div>
    </div>
  );
}
