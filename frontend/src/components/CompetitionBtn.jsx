import React, { Component } from "react";
import "./CompetitionBtn.css";
import TestImage from "../assets/test_usr_image.jpeg";
import { useNavigate } from "react-router-dom";

export default function CompetitionBtn({ Competition, href }) {
  const navigate = useNavigate();

  const AddDescription = (Competition) => {
    try {
      if (Competition.descripcion !== 0) {
        return <p id="competition-description">{Competition.descripcion}</p>;
      }
    } catch (e) {}
  };

  const AddImage = (Competition) => {
    try {
      //if (props.img !== undefined) {
      return (
        <div className="img-container">
          <img
            id="competition-img"
            src={`data:image/jpeg;base64, ${Competition.imagen}`}
          ></img>
        </div>
      );
      //}
    } catch (e) {}
  };

  return (
    <div
      onClick={() => {
        if (href === undefined) {
          navigate(`/me/competitions/${Competition._id}/Inscription`);
        } else {
          navigate(href);
        }
      }}
      className="btn-container"
    >
      <div className="info-container">
        {AddImage(Competition)}
        <div className="text-container">
          <h2>{Competition.nombre}</h2>
          {AddDescription(Competition)}
        </div>
      </div>
    </div>
  );
}
