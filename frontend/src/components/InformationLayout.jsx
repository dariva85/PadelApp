import React from "react";
import "./InformationLayout.css";
import PersonHeart from "../assets/Person Heart.png";
import { useNavigate } from "react-router-dom";
import * as usr from "../User";
import * as api from "../api/api";

export default function InformationLayout({ competition }) {
  const navigate = useNavigate();

  const AddImage = (Competition) => {
    try {
      if (Competition.imagen !== undefined) {
        return (
          <img
            id="competition-img"
            className="competition-img-info"
            src={`data:image/jpeg;base64, ${Competition.imagen}`}
          ></img>
        );
      }
    } catch (e) {}
  };
  const AddTextInfo = (Competition) => {
    try {
      console.log(Competition);
      return Competition.informacion.map((item) => {
        return (
          <div>
            <h2>{item.titulo}</h2>
            <p>{item.parrafo}</p>
          </div>
        );
      });
    } catch (e) {}
  };

  const AddSubscriptionBtn = (Competition) => {
    try {
      console.log(`My competi:`);
      console.log(Competition.nombre);

      if (Competition.idUsuario.includes(usr.readUser()._id)) {
        return (
          <div
            id="inscription-btn"
            className="uninscribe-btn"
            onClick={() => {
              suscribeOrUnsuscribe(Competition);
            }}
          >
            <h2>Desinscribir</h2>
          </div>
        );
      } else {
        return (
          <div
            id="inscription-btn"
            className="inscribe-btn"
            onClick={() => {
              suscribeOrUnsuscribe(Competition);
            }}
          >
            <h2>Inscribir</h2>
          </div>
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  const suscribeOrUnsuscribe = async (competition) => {
    const {
      success,
      result: Competition,
      error,
    } = await api.subscribeOrUnsubscribeOnCompetition({
      competitionId: competition._id,
      userId: usr.readUser()._id,
    });
    if (success) {
      console.log("success");
      navigate("/");
    } else {
      console.log("not success");
    }
  };

  return (
    <div id="main-information">
      <div id="main-square">
        <div id="title-information" className="txt-img-aligned">
          {AddImage(competition)}
          <h1>{competition.nombre}</h1>
        </div>
        <div id="text-information">{AddTextInfo(competition)}</div>
        <div id="inscribed-info">
          <div className="txt-img-aligned">
            <h3>{competition.nInscritos} Inscribed</h3>
            <img className="counter-img" src={PersonHeart} />
          </div>
          <div className="txt-img-aligned">
            <h3>{competition.maxInscritos} Max</h3>
            <img className="counter-img" src={PersonHeart} />
          </div>
        </div>
        <div id="inscription-btn-container">
          {AddSubscriptionBtn(competition)}
        </div>
      </div>
    </div>
  );
}
