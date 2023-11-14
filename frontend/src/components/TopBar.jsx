import React, { useState, useEffect } from "react";
import "./TopBar.css";
import PanteresLogo from "../assets/panteres.png";
import homeLogo from "../assets/homeLogo.png";
import LogOutImg from "../assets/logout.png";
import { useNavigate } from "react-router-dom";
import * as usr from "../User";

export default function TopBar(props) {
  const navigate = useNavigate();
  const [fade, setFade] = useState("fade-in");

  const AddNavBarLinkedItems = (LinkedItems) => {
    if (LinkedItems != undefined) {
      return LinkedItems.map((item) => {
        return (
          <div
            id={item.link}
            className="nav-link"
            onClick={() => {
              navigate(item.link);
            }}
          >
            <div className={`${fade}`}>{AddNavBarItemName(item)}</div>
          </div>
        );
      });
    }
  };

  const AddNavBarItemName = (item) => {
    if (item.highlight !== undefined) {
      return <strong>{item.name}</strong>;
    } else {
      return item.name;
    }
  };
  const AddNavBar = (props) => {
    try {
      if (props.title.length !== 0) {
        return (
          <div id="nav-menu">
            <div id="grey-nav">
              <p className={`text-transition-div ${fade}`}>{props.title}</p>
            </div>
            <div id="yellow-nav">{AddNavBarLinkedItems(props.linkedItems)}</div>
          </div>
        );
      }
    } catch (e) {}
  };

  const AddHomeBtn = () => {
    try {
      if (props.showHomeLogo) {
        return (
          <img
            id="home-img"
            className="top-img"
            src={homeLogo}
            alt="HOME"
            onClick={() => {
              navigate("/");
            }}
          />
        );
      }
    } catch (e) {}
  };

  const AddLogOutBtn = () => {
    try {
      if (props.showHomeLogo) {
        return (
          <img
            id="log-out-img"
            className="top-img"
            src={LogOutImg}
            alt="Log Out"
            onClick={() => {
              props.logout();
              navigate("/");
            }}
          />
        );
      }
    } catch (e) {}
  };

  const AddUserAvatar = () => {
    try {
      if (usr.readUser().imagenPerfil !== undefined && props.showUserImage) {
        return (
          <img
            id="usr-img"
            className="top-img"
            src={usr.readUser().imagenPerfil}
            onClick={() => {
              navigate("/userinfo");
            }}
          />
        );
      }
    } catch (e) {}
  };

  const manageFade = () => {
    setFade("");
  };

  useEffect(() => {
    const timeout = setInterval(() => {
      manageFade();
    }, 2000);
  }, [fade]);

  useEffect(() => {
    setFade("fade-in");
  }, [props]);

  return (
    <div id="top-bar-main-div">
      <div id="main-div">
        <div id="yellow-div-logo">
          <img id="logo" src={PanteresLogo}></img>
        </div>
        <div id="grey-div">
          {AddLogOutBtn()}
          {AddUserAvatar()}
          {AddHomeBtn()}
        </div>
      </div>
      {AddNavBar(props)}
    </div>
  );
}
