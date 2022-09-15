import React, { useState, useEffect } from "react";
import "./TopBar.css";
import PanteresLogo from "../assets/panteres.png";
import { useNavigate } from "react-router-dom";
import * as usr from "../User";

export default function TopBar(props) {
  const navigate = useNavigate();
  const [fade, setFade] = useState("fade-in");
  const [fadeCount, setFadeCount] = useState(0);

  const AddNavBarLinkedItems = (LinkedItems) => {
    if (LinkedItems != undefined) {
      return LinkedItems.map((item) => {
        return (
          <div
            id={item.link}
            className="nav-link"
            onClick={() => {
              if (item.isLogOut != undefined && item.isLogOut) props.logout();
              navigate(item.link);
            }}
          >
            <div className={`text-transition-div, ${fade}`}>
              {AddNavBarItemName(item)}
            </div>
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
                <div className={`text-transition-div, ${fade}`}>
                  {props.title}
                </div>
            </div>
            <div id="yellow-nav">{AddNavBarLinkedItems(props.linkedItems)}</div>
          </div>
        );
      }
    } catch (e) {}
  };

  const AddHomeAvatar = () => {
    try {
      if (props.showHomeLogo) {
        return (
          <img
            id="home-logo"
            src="/src/assets/homeLogo.png"
            alt="HOME"
            onClick={() => {
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
            id="usr-image"
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
        <div id="yellow-div"></div>
        <img id="logo" src={PanteresLogo}></img>
        <div id="grey-div">
          {AddUserAvatar()}
          <div class="home-div">{AddHomeAvatar()}</div>
        </div>
      </div>
      {AddNavBar(props)}
    </div>
  );
}
