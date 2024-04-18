import React, { useState, useEffect } from "react";
import "./TopBar.css";
import PanteresLogo from "../../assets/panteres.png";
import homeLogo from "../../assets/HomeLogo.svg";
import moreLogo from "../../assets/more.svg";
import LogOutImg from "../../assets/logout.png";
import { useNavigate } from "react-router-dom";
import * as usr from "../../User";
import NavBar from "./NavBar";

export default function TopBar(props) {
  const navigate = useNavigate();
  const [fade, setFade] = useState("fade-in");
  const [linkedMenuExpanded, setLinkedMenuExpanded] = useState(false);

  const AddHomeBtn = () => {
    try {
      if (props.showHomeLogo) {
        return (
          <div className="top-bar-btn-container">
            <img
              id="home-img"
              className="top-bar-btn-img"
              src={homeLogo}
              alt="HOME"
              onClick={() => {
                navigate("/");
              }}
            />
          </div>
        );
      }
    } catch (e) {}
  };

  const AddMoreBtn = () => {
    try {
      if (props.showHomeLogo) {
        return (
          <div
            id="top-bar-more-btn"
            className={
              linkedMenuExpanded
                ? "top-bar-btn-container-clicked"
                : "top-bar-btn-container"
            }
          >
            <img
              className={
                linkedMenuExpanded
                  ? "top-bar-btn-img-clicked"
                  : "top-bar-btn-img"
              }
              src={moreLogo}
              alt="Menú"
              onClick={() => {
                setLinkedMenuExpanded(!linkedMenuExpanded);
              }}
            />
          </div>
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
          {AddMoreBtn()}
          {AddLogOutBtn()}
          {AddUserAvatar()}
          {AddHomeBtn()}
        </div>
      </div>
      <NavBar
        title={props.title}
        linkedItems={props.linkedItems}
        fade={fade}
        linkedMenuExpanded={linkedMenuExpanded}
        logOut={props.logout}
        itemClicked={() => {
          setLinkedMenuExpanded(!linkedMenuExpanded);
        }}
      ></NavBar>
    </div>
  );
}
