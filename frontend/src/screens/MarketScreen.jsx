import React, { useContext, useEffect, useState } from "react";
import "./MarketScreen.css";
import CompetitionBtn from "../components/CompetitionBtn";
import * as api from "../api/api.js";
import * as usr from "../User";
import * as topBarCtxt from "../components/TopBarCtxt";

export default function MarketScreen() {
  const [competitions, setCompetitions] = useState([]);
  const { topBarInfo, setTopBarInfo } = useContext(topBarCtxt.Ctxt);

  const LoadCompetitions = async () => {
    const {
      success,
      result: dbCompetitions,
      error,
    } = await api.getNonSubcribedCompetitions(usr.readUser()._id);
    if (success) {
      setCompetitions(dbCompetitions.results[0]);
    } else {
      console.log(error);
    }
  };

  const AddCompetitionButtons = (competitionItems) => {
    return competitionItems.map((item) => (
      <div id={item._id} className="competition">
        <CompetitionBtn
          className="competition"
          Competition={item}
          href={`/competition/${item._id}`}
        />
      </div>
    ));
  };

  useEffect(() => {
    LoadCompetitions();
    topBarCtxt.setTopBarInfo(
      topBarCtxt.menuByScreen.MarketScreen,
      topBarInfo,
      setTopBarInfo
    );
  }, []);

  return (
    <div id="market-main" className="main-screen">
      <div id="market-container" className="competitions-container">
        {AddCompetitionButtons(competitions)}
      </div>
    </div>
  );
}
