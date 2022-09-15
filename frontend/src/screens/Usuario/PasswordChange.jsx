import React, { useState, useEffect, useContext } from "react";
import { BsFillEyeFill, BsFillEyeSlashFill} from "react-icons/bs";
import "./PasswordChange.css";
import * as topBarCtxt from "../../components/TopBarCtxt";

export default function PasswordChange() {
  const { topBarInfo, setTopBarInfo } = useContext(topBarCtxt.Ctxt);
  const [newPassword, setNewPassword] = useState("");
  const [currentPasswordType, setCurrentPasswordType] = useState("password");
  const [newPasswordType, setNewPasswordType] = useState("password");
  const [repeatPasswordType, setRepeatPasswordType] = useState("password");
  const [currentPassword, setCurrentPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const togglePassword = ()=>{
    if(passwordType==="password")
    {
     setPasswordType("text");
     return;
    }
    setPasswordType("password");
  }

  const startVisibilityIcon = (passwordType, passwordId) => {
    if(passwordType == 'text') {
      return (
        <button className="icon" onClick={() => {
          if(passwordId === 'new') {
            setNewPasswordType('password');
          } else if(passwordId === 'current') {
            setCurrentPasswordType('password');
          } else if(passwordId === 'repeat') {
            setRepeatPasswordType('password');
          }
        }
          }>
          <BsFillEyeFill />
        </button> );
    } else {
        return (
            <button className="icon" onClick={() => {
              if(passwordId === 'new') {
                setNewPasswordType('text');
              } else if(passwordId === 'current') {
                setCurrentPasswordType('text');
              } else if(passwordId === 'repeat') {
                setRepeatPasswordType('text');
              }
            }
              }>
              <BsFillEyeSlashFill />
            </button> );
    }
  }

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

  const reset = () => {
    setCurrentPassword("");
    setNewPassword("");
    setRepeatPassword("");
    setNewPasswordType("password");
    setCurrentPasswordType("password");
    setRepeatPasswordType("password");
  }

  return (
    <div id="passwordChange-screen">
      <form id="password-form" onSubmit={handleSubmit}>
        <label className ="label-form">
          Contraseña actual
          <div class="show-password">
            <input className="box-form" type={currentPasswordType} onChange={e => setCurrentPassword(e.target.value)} value={currentPassword} name="Contraseña actual" />
            {startVisibilityIcon(currentPasswordType, 'current')}
        </div>
        </label>
        <label className ="label-form">
          Contraseña nueva
          <div class="show-password">
            <input className="box-form" type={newPasswordType} onChange={e => setNewPassword(e.target.value)} value={newPassword} name="Contraseña nueva" />
            {startVisibilityIcon(newPasswordType, 'new')}
        </div>
        </label>
        <label className ="label-form">
          Repite contraseña
          <div class="show-password">
            <input className="box-form" type={repeatPasswordType} onChange={e => setRepeatPassword(e.target.value)} value={repeatPassword} name="Repite contraseña" />
            {startVisibilityIcon(repeatPasswordType, 'repeat')}
        </div>
        </label>
        <div id="buttons-form">
          <button style={{color:"green"}} onClick={handleSubmit} className="submit-button">Aceptar</button>
          <button style={{color:"red"}} onClick={reset} className="submit-button">Cancelar</button>
        </div>
      </form>
    </div>
  );
}
