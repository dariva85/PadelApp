import React, { Component, useState, useEffect } from "react";
import "./MatchesCard.css";
import { useNavigate } from "react-router-dom";
import * as usr from "../User";
import * as api from "../api/api.js";
import calendar from "../assets/Calendar.svg";

export default function MatchesCard(props) {
  const [Match, setTheMatch] = useState(props);

  let NombreCompeti = props.matches.competicion[0].nombre;
  let Dia = String(new Date(props.matches.fecha).getDate());
  let Month = String(new Date(props.matches.fecha).getMonth() + 1);
  let Year = String(new Date(props.matches.fecha).getFullYear());
  console.log(Year.length);
  if (Dia.length == 1) {
    Dia = "0" + Dia;
  }
  if (Month.length == 1) {
    Month = "0" + Month;
  }
  let Fecha = Dia + "/" + Month + "/" + Year;
  let Horas = String(new Date(props.matches.fecha).getHours());
  let Minutos = String(new Date(props.matches.fecha).getMinutes());
  if (Horas.length == 1) {
    Horas = "0" + Horas;
  }
  if (Minutos.length == 1) {
    Minutos = "0" + Minutos;
  }

  let Hora = Horas + ":" + Minutos;
  let Status = props.matches.estado;
  let Names = {};

  for (const auxobject in props.matches.usuario) {
    Names[props.matches.usuario[auxobject]["_id"]] =
      props.matches.usuario[auxobject]["username"];
  }

  const MatchValueChanged = (NumMarcador, Partido, valor) => {
    Match.matches.allScoreBoard[Partido].final_score[NumMarcador].scoreboard =
      parseInt(valor.target.value);

    setTheMatch(Match);
  };

  const sendResults = async () => {
    //Hay que crear un endpoint donde yo le digo quien soy y que resultados les doy.
    console.log(Match.matches._id);
    let result = await api.submitMatch(usr.readUser()._id, {
      _id: Match.matches._id,
      allScoreBoard: Match.matches.allScoreBoard,
    });

    //Si una de esas dos cambia debo sobreescribir ese valor y el marcador de macth
    console.log(Match);
    if (
      result.result.results.estado !== Match.matches.estado ||
      result.result.results.allValidadores.length !==
        Match.matches.allValidadores.length
    ) {
      Match.matches.allScoreBoard = result.result.results.allScoreBoard;
      Match.matches.estado = result.result.results.estado;
      Match.matches.allValidadores = result.result.results.allValidadores;
      setTheMatch(Match);
      console.log(Match);
      window.location.reload(false);
    }
  };
  const AddButton = (Status, match) => {
    try {
      if (
        Status === "Pending" &&
        !match.allValidadores.includes(usr.readUser()._id)
      ) {
        return (
          <button onClick={() => sendResults()} className="ButtonAccept">
            Accept
          </button>
        );
      } else {
        return;
      }
    } catch (e) {
      return;
    }
  };
  const BotonEstado = (Status, match) => {
    // Caso 1: El partido aun está por empezar.
    // Caso 2: El partido empezado no validado.
    // Caso 3: Partido empezado, y estoy en validados.
    // Caso 4: El partido está Closed.
    try {
      //Debo comprobar si estoy o no en el allvalidadores.
      if (
        Status === "Pending" &&
        !match.allValidadores.includes(usr.readUser()._id)
      ) {
        return <div className="BotonEstado">{Status}</div>;
      } else if (
        Status === "Pending" &&
        match.allValidadores.includes(usr.readUser()._id)
      ) {
        return <div className="BotonEstado">Validated</div>;
      } else if (Status === "Closed") {
        return <div className="BotonEstado">Closed</div>;
      }
    } catch (e) {
      return;
    }
  };
  const Marcador = (props, number, names) => {
    try {
      return (
        <div className="MarcadorGrande">
          <div className="MarcadorNombres">
            <div>{names[props.final_score[0].player[0]].substr(0, 14)}</div>
            <div>{names[props.final_score[0].player[1]].substr(0, 14)}</div>
          </div>
          <div className="MarcadorNumeros">
            <input
              placeholder={props.final_score[0].scoreboard}
              onChange={(value) => MatchValueChanged(0, number, value)}
            ></input>

            <div className="Rayita"></div>
            <input
              placeholder={props.final_score[1].scoreboard}
              onChange={(value) => MatchValueChanged(1, number, value)}
            ></input>
          </div>

          <div className="MarcadorNombres">
            <div className="PlayerName">{names[props.final_score[1].player[0]].substr(0, 14)}</div>
            <div className="PlayerName">{names[props.final_score[1].player[1]].substr(0, 14)}</div>
          </div>
        </div>
      );
    } catch (e) {}
  };

  return (
    <div id="mainCard">
      <link href="https://css.gg/calendar.css" rel="stylesheet"></link>

      <div id="TitleMatch">
        <p>{NombreCompeti}</p>
      </div>

      <div className="ParteSuperiorCartaPartido">
        <img className="gg-calendar" id="calendario" src={calendar}></img>
        <div className="fecha">
          <div>{Fecha}</div>
          <div>{Hora}</div>
        </div>
        {BotonEstado(Status, props.matches)}
      </div>
      <div className="RayitaBlanca"></div>
      <div className="marcador">
        {" "}
        {Marcador(Match.matches.allScoreBoard[0], 0, Names)}
      </div>
      <div className="RayitaBlanca"></div>
      <div className="marcador">
        {" "}
        {Marcador(Match.matches.allScoreBoard[1], 1, Names)}
      </div>
      <div className="RayitaBlanca"></div>
      <div className="marcador">
        {" "}
        {Marcador(Match.matches.allScoreBoard[2], 2, Names)}
      </div>
      <div>{AddButton(Status, props.matches)}</div>
    </div>
  );
}
