import React, { Component } from "react";
import "./TopBar.css";
import PanteresLogo from "../assets/panteres.png";
import TestImage from "../assets/test_usr_image.jpeg";
import { useNavigate } from "react-router-dom";

export default function TopBar(props) {
  const navigate = useNavigate();

  const AddNavBarLinkedItems = (LinkedItems) => {
    console.log(LinkedItems);
    if (LinkedItems != undefined) {
      return LinkedItems.map((item) => {
        return (
          <div
            id={item.name}
            className="nav-link"
            onClick={() => {
              navigate(item.link);
            }}
          >
            {item.name}
          </div>
        );
      });
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

  const AddUserAvatar = (props) => {
    try {
      if (props.userID.length !== 0) {
        return <img id="usr-image" src={TestImage} />;
      }
    } catch (e) {}
  };

  return (
    <>
      <div id="main-div">
        <div id="yellow-div"></div>
        <img id="logo" src={PanteresLogo}></img>
        <div id="grey-div">{AddUserAvatar(props)}</div>
      </div>
      {AddNavBar(props)}
    </>
  );
}
