import React, { Component } from "react";
import "./TopBar.css";
import PanteresLogo from "../assets/panteres.png";
import TestImage from "../assets/test_usr_image.jpeg";
import { useNavigate } from "react-router-dom";
import * as usr from "../User";

export default function TopBar(props) {
  const navigate = useNavigate();

  const AddNavBarLinkedItems = (LinkedItems) => {
    if (LinkedItems != undefined) {
      return LinkedItems.map((item) => {
        return (
          <div
            className="nav-link"
            onClick={() => {
              navigate(item.link);
            }}
          >
            {AddNavBarItemName(item)}
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
            <div id="grey-nav">{props.title}</div>
            <div id="yellow-nav">{AddNavBarLinkedItems(props.linkedItems)}</div>
          </div>
        );
      }
    } catch (e) {}
  };

  const AddUserAvatar = () => {
    try {
      if (usr.readUser().imagenPerfil !== undefined) {
        return (
          <img
            id="usr-image"
            src={`data:image/jpeg;base64, ${usr.readUser().imagenPerfil}`}
          />
        );
      }
    } catch (e) {}
  };

  return (
    <>
      <div id="main-div">
        <div id="yellow-div"></div>
        <img id="logo" src={PanteresLogo}></img>
        <div id="grey-div">{AddUserAvatar()}</div>
      </div>
      {AddNavBar(props)}
    </>
  );
}
