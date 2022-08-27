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
            class="nav-link"
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
      console.log(props.title.length);
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

  return (
    <>
      <div id="main-div">
        <div id="yellow-div"></div>
        <img id="logo" src={PanteresLogo}></img>
        <div id="grey-div">
          <img id="usr-image" src={TestImage} />
        </div>
      </div>
      {AddNavBar(props)}
    </>
  );
}
