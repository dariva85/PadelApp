import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NavBar.css";

export default function NavBar(props) {
  const navigate = useNavigate();

  const AddNavBarItemName = (item) => {
    if (item.highlight !== undefined) {
      return <strong id={strong + item.name}>{item.name}</strong>;
    } else {
      return item.name;
    }
  };

  const AddNavBarLinkedItems = (LinkedItems) => {
    if (LinkedItems != undefined) {
      return (
        <div
          id="yellow-nav"
          className={!props.linkedMenuExpanded ? "MobileLinkedMenuHidden" : ""}
        >
          {LinkedItems.map((item) => {
            return (
              <div
                id={item.link}
                className="nav-link"
                onClick={() => {
                  props.itemClicked();
                  navigate(item.link);
                }}
              >
                <div id={"text-" + item.link} className={`${props.fade}`}>
                  {AddNavBarItemName(item)}
                </div>
              </div>
            );
          })}
          <div
            id="/userinfo-mobile"
            className="nav-link only-mobile-devices"
            onClick={() => {
              navigate("/userinfo");
            }}
          >
            <div id="MiCuenta" className={`${props.fade}`}>
              Mi cuenta
            </div>
          </div>
          <div
            id="/logout-mobile"
            className="nav-link only-mobile-devices"
            onClick={() => {
              props.logOut();
              navigate("/");
            }}
          >
            <div id="Salir" className={`${props.fade}`}>
              Salir
            </div>
          </div>
        </div>
      );
    }
  };

  const AddNavBar = (props) => {
    try {
      if (props.title.length !== 0) {
        return (
          <div id="nav-menu">
            <div id="grey-nav">
              <p
                id="navbar-text-title"
                className={`text-transition-div ${props.fade}`}
              >
                {props.title}
              </p>
            </div>
            {AddNavBarLinkedItems(props.linkedItems)}
          </div>
        );
      }
    } catch (e) {}
  };
  return AddNavBar(props);
}
