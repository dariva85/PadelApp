import React, { useState, useEffect, useContext } from "react";
import "./UserInfo.css";
import * as topBarCtxt from "../../components/TopBarCtxt";

export default function UserInfo() {
  const { topBarInfo, setTopBarInfo } = useContext(topBarCtxt.Ctxt);

  useEffect(() => {
    topBarCtxt.setTopBarInfo(
      topBarCtxt.menuByUserInfo.UserInfo,
      topBarInfo,
      setTopBarInfo
    );
  }, []);

  return <></>;
}
