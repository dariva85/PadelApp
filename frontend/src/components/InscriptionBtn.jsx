import React, { Component } from "react";
import "./InscriptionBtn.css";
import InscriptionPending from "../assets/InscriptionAvailable.png";
import SignedUp from "../assets/SignedUp.png";
import { useNavigate } from "react-router-dom";

export default function InscriptionBtn({
  Inscription,
  userId,
  signUpClickEvent,
}) {
  const navigate = useNavigate();

  const AddDescription = (Inscription) => {
    try {
      if (Inscription.descripcion !== 0) {
        return <p>{Inscription.descripcion}</p>;
      }
    } catch (e) {}
  };

  const AddImage = (Inscribed) => {
    try {
      const img = isUserInscribed(Inscribed) ? SignedUp : InscriptionPending;
      return (
        <div className="btnInscription-img-container">
          <img id="btnInscription-img" src={img}></img>
        </div>
      );
    } catch (e) {
      console.log(e);
    }
  };

  const formatDate = (date) => {
    date = new Date(Date.parse(date));
    var hours = date.getHours();
    var minutes = date.getMinutes();
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes;
    return (
      date.getDate() +
      "/" +
      (date.getMonth() + 1) +
      "/" +
      date.getFullYear() +
      "  " +
      strTime
    );
  };

  const isUserInscribed = (Inscribed) => {
    if (Inscribed.includes(userId)) {
      return true;
    }
    return false;
  };
  
  return (
    <div
      onClick={() => signUpClickEvent(Inscription._id, userId)}
      className={`btnInscription-container${
        isUserInscribed(Inscription.inscritos) ? "-signedup" : ""
      }`}
    >
      <div
        className={`btnInscription-info-container${
          isUserInscribed(Inscription.inscritos) ? "-signedup" : ""
        }`}
      >
        <div
          className={`btnInscription-text-container${
            isUserInscribed(Inscription.inscritos) ? "-signedup" : ""
          }`}
        >
          <h1>{Inscription.nombre}</h1>
          <p>{formatDate(Inscription.fechaPartido)}</p>
        </div>
        {AddImage(Inscription.inscritos)}
      </div>
    </div>
  );
}
