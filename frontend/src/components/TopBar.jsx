import React, { Component } from "react";
import "./TopBar.css";
import PanteresLogo from "../assets/panteres.png";
import TestImage from "../assets/test_usr_image.jpeg";

export default function TopBar(props) {
  const AddNavBarLinkedItems = (LinkedItems) => {
    console.log(LinkedItems);
    if (LinkedItems != undefined) {
      return LinkedItems.map((item) => {
        return (
          <div
            class="nav-link"
            onClick={(item) => {
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
      console.log(props.props.Title.length);
      if (props.props.Title.length !== 0) {
        return (
          <div id="nav-menu">
            <div id="grey-nav">{props.props.Title}</div>
            <div id="yellow-nav">
              {AddNavBarLinkedItems(props.props.LinkedItems)}
            </div>
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
