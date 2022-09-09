import React, { useContext, useEffect } from "react";
import "./MarketScreen.css";
import * as topBarCtxt from "../components/TopBarCtxt";

export default function MarketScreen() {
  const { topBarInfo, setTopBarInfo } = useContext(topBarCtxt.Ctxt);

  useEffect(() => {
    topBarCtxt.setTopBarInfo(
      topBarCtxt.menuByScreen.MarketScreen,
      topBarInfo,
      setTopBarInfo
    );
  }, []);

  return <div className="main-screen"></div>;
}
