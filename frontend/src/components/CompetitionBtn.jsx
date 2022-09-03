import React, { Component } from "react";
import "./CompetitionBtn.css";
import TestImage from "../assets/test_usr_image.jpeg";
import { useNavigate } from "react-router-dom";

export default function CompetitionBtn({ Competition }) {
  const navigate = useNavigate();

  const AddDescription = (Competition) => {
    try {
      console.log(props);
      if (Competition.descripcion !== 0) {
        return <p>{Competition.descripcion}</p>;
      }
    } catch (e) {}
  };

  const AddImage = (Competition) => {
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
        navigate(`/me/competitions/${Competition._id}/Inscription`);
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
