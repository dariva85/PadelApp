import React, { useState, useEffect, useContext } from "react";
import "./PasswordChange.css";
import * as topBarCtxt from "../../components/TopBarCtxt";

export default function PasswordChange() {
  const { topBarInfo, setTopBarInfo } = useContext(topBarCtxt.Ctxt);
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    topBarCtxt.setTopBarInfo(
      topBarCtxt.menuByUserInfo.PasswordChange,
      topBarInfo,
      setTopBarInfo
    );
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  return (
    <div id="passwordChange-screen">
      <form id="password-form" onSubmit={handleSubmit}>
        <label className ="label-form">
          Contraseña actual
          <input className="box-form" type="text" name="Contraseña actual" />
        </label>
        <label className ="label-form">
          Contraseña nueva
          <input className="box-form" type="text" value={newPassword} onChange={(e) => setName(e.target.value)} name="Contraseña nueva" />
        </label>
        <label className ="label-form">
          Repite contraseña
          <input className="box-form" type="text" name="Repite contraseña" />
        </label>
        <div id="buttons-form">
          <button style={{color:"green"}} className="submit-button">Aceptar</button>
          <button style={{color:"red"}} className="submit-button">Cancelar</button>
        </div>
      </form>
    </div>
  );
}
