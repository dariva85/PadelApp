import React, { Component } from "react";
import "./CompetitionBtn.css";
import TestImage from "../assets/test_usr_image.jpeg";
import { useNavigate } from "react-router-dom";

export default function CompetitionBtn(props) {
  const navigate = useNavigate();

  const AddDescription = (props) => {
    try {
      console.log(props);
      if (props.Competition.descripcion !== 0) {
        return <p>{props.Competition.descripcion}</p>;
      }
    } catch (e) {}
  };

  const AddImage = (props) => {
    try {
      //if (props.img !== undefined) {
      return (
        <div className="img-container">
          <img id="competition-img" src={TestImage}></img>
        </div>
      );
      //}
    } catch (e) {}
  };

  return (
    <div
      onClick={() => {
        navigate(`/me/competitions/${props.Competition._id}/Inscriptions`);
      }}
      className="btn-container"
    >
      <div className="info-container">
        {AddImage(props)}
        <div className="text-container">
          <h2>{props.Competition.nombre}</h2>
          {AddDescription(props)}
        </div>
      </div>
    </div>
  );
}
