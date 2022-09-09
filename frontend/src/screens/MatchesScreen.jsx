import React, { Component, useContext, useEffect } from "react";
import "./MatchesScreen.css";
import * as topBarCtxt from "../components/TopBarCtxt";

export default function MatchesScreen() {
  const { topBarInfo, setTopBarInfo } = useContext(topBarCtxt.Ctxt);

  useEffect(() => {
    topBarCtxt.setTopBarInfo(
      topBarCtxt.menuByScreen.MatchesScreen,
      topBarInfo,
      setTopBarInfo
    );
  }, []);
  return <div id="matches-main-screen" className="main-screen"></div>;
}
