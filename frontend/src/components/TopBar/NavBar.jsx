import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NavBar(props) {
  const navigate = useNavigate();
  const [fade, setFade] = useState("fade-in");

  const AddNavBarItemName = (item) => {
    if (item.highlight !== undefined) {
      return <strong>{item.name}</strong>;
    } else {
      return item.name;
    }
  };

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
            <div className={`${props.fade}`}>{AddNavBarItemName(item)}</div>
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
            <div id="grey-nav">
              <p className={`text-transition-div ${fade}`}>{props.title}</p>
            </div>
            <div id="yellow-nav">{AddNavBarLinkedItems(props.linkedItems)}</div>
          </div>
        );
      }
    } catch (e) {}
  };
  return <div>{AddNavBar(props)}</div>;
}
