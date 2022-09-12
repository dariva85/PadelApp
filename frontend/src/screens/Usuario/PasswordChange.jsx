import React, { useState, useEffect, useContext } from "react";
import "./PasswordChange.css";
import * as topBarCtxt from "../../components/TopBarCtxt";

export default function PasswordChange() {
  const { topBarInfo, setTopBarInfo } = useContext(topBarCtxt.Ctxt);

  useEffect(() => {
    topBarCtxt.setTopBarInfo(
      topBarCtxt.menuByUserInfo.PasswordChange,
      topBarInfo,
      setTopBarInfo
    );
  }, []);
  return <></>;
}
