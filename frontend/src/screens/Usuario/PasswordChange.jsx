import React, { useState, useEffect, useContext } from "react";
import { BsFillEyeFill, BsFillEyeSlashFill} from "react-icons/bs";
import { BiErrorAlt } from "react-icons/bi";
import * as usr from "../../User";
import "./PasswordChange.css";
import * as api from "../../api/api";
import * as topBarCtxt from "../../components/TopBarCtxt";

export default function PasswordChange() {
  const { topBarInfo, setTopBarInfo } = useContext(topBarCtxt.Ctxt);
  const [passwordWarning, setPasswordWarning] = useState("");
  const [warningType, setWarningType] = useState("error");
  const [newPassword, setNewPassword] = useState("");
  const [currentPasswordType, setCurrentPasswordType] = useState("password");
  const [newPasswordType, setNewPasswordType] = useState("password");
  const [repeatPasswordType, setRepeatPasswordType] = useState("password");
  const [currentPassword, setCurrentPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [userInfo, setUserInfo] = useState(usr.readUser());

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
        <button type="button" className="icon" onClick={() => {
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
            <button type="button" className="icon" onClick={() => {
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(newPassword != repeatPassword) {
      setWarningType('error');
      setPasswordWarning("La nueva contraseña no coincide");
      return;
    }
    const { success, result: token, error } = await api.login({email: userInfo.email, password: currentPassword});
    if(success === false) {
      setWarningType('error');
      setPasswordWarning("La contraseña actual no es correcta");
      return;
    }
    setUserInfo({
      ...userInfo,
      password: newPassword,
    });
    const results = await api.updatePassword(userInfo);
    if(results.success) {
      setPasswordWarning("La contraseña se ha cambiado correctamente");
      setWarningType('success');
    }
    

  }

  const reset = () => {
    setCurrentPassword("");
    setNewPassword("");
    setRepeatPassword("");
    setNewPasswordType("password");
    setCurrentPasswordType("password");
    setRepeatPasswordType("password");
    setPasswordWarning("");
  }

  return (
    <div id="passwordChange-screen" className="main-screen" onSubmit={handleSubmit}>
      <div hidden={passwordWarning === "" ? true : false} >
        <div id={warningType} >
          <div id={warningType + '-icon'} >
            < BiErrorAlt />
          </div>
        {passwordWarning}
        </div>
      </div>
      <form id="password-form">
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
          <button type="submit" style={{color:"green"}} onClick={handleSubmit} className="submit-button">Aceptar</button>
          <button type="submit" style={{color:"red"}} onClick={reset} className="submit-button">Cancelar</button>
        </div>
      </form>
    </div>
  );
}
