import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NavBar.css";

export default function NavBar(props) {
  const navigate = useNavigate();

  const AddNavBarItemName = (item) => {
    if (item.highlight !== undefined) {
      return <strong>{item.name}</strong>;
    } else {
      return item.name;
    }
  };

  const AddNavBarLinkedItems = (LinkedItems) => {
    if (LinkedItems != undefined && props.linkedMenuExpanded) {
      return (
        <div id="yellow-nav">
          {LinkedItems.map((item) => {
            return (
              <div
                id={item.link}
                className="nav-link"
                onClick={() => {
                  navigate(item.link);
                }}
              >
                <div className={`${props.fade}`}>{AddNavBarItemName(item)}</div>
              </div>
            );
          })}
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
              <p className={`text-transition-div ${props.fade}`}>
                {props.title}
              </p>
            </div>
            {AddNavBarLinkedItems(props.linkedItems)}
          </div>
        );
      }
    } catch (e) {}
  };
  return <div>{AddNavBar(props)}</div>;
}
