import React, { Component } from "react";
import "./InscriptionBtn.css";
import InscriptionPending from "../assets/InscriptionAvailable.png";
import SignedUp from "../assets/InscribedLogo.svg";
import PersonHeart from "../assets/PersonHeart.svg";

export default function InscriptionBtn({ Inscription, userId, ClickEvent }) {
  const AddImage = (Inscribed) => {
    try {
      const img = isUserInscribed(Inscribed) ? SignedUp : InscriptionPending;
      return (
        <div
          className={`${
            isUserInscribed(Inscription.inscritos)
              ? "inscribed-img-container"
              : "not-inscribed-img-container"
          }`}
        >
          <img
            id={`btnInscription-img`}
            className={`${getUserInscriptionStatusClass(Inscription)}`}
            src={img}
          ></img>
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

  const getUserInscriptionStatusClass = (Inscription) => {
    const cuePosition = Inscription.inscritos.indexOf(userId);
    const playerCourt = Math.floor(cuePosition / 4);
    const filledCourts = Math.floor(Inscription.inscritos.length / 4);

    if (Inscription.inscritos.includes(userId)) {
      if (playerCourt < filledCourts) return "inscribed";
      else return "pending";
    }
    return "notInscribed";
  };

  const getUserInscriptionStatusLabel = (Inscription) => {
    switch (getUserInscriptionStatusClass(Inscription)) {
      case "inscribed":
        return "Inscrito";
        break;
      case "pending":
        return "En cola";
        break;
    }
    return "";

    if (Inscription.inscritos.includes(userId)) {
      if (playerCourt < filledCourts) return "inscribed";
      else return "pending";
    }
    return "notInscribed";
  };

  return (
    <div
      onClick={() => ClickEvent(Inscription._id, userId)}
      className={`btnInscription-container ${getUserInscriptionStatusClass(
        Inscription
      )}`}
    >
      <div
        className={`btnInscription-info-block ${getUserInscriptionStatusClass(
          Inscription
        )}`}
      >
        <div className="btnInscription-text-container">
          <h1 className={`${getUserInscriptionStatusClass(Inscription)}`}>
            {Inscription.nombre}
          </h1>
          <p>{formatDate(Inscription.fechaPartido)}</p>
          <p>{Inscription.inscritos.length} Inscritos</p>
          <p>{Inscription.pistas.length} Pistas confirmadas</p>
        </div>
        <div className="btnInscription-img-container">
          {AddImage(Inscription.inscritos)}
          <strong>{getUserInscriptionStatusLabel(Inscription)}</strong>
        </div>
      </div>
    </div>
  );
}
