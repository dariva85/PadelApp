import React, { Component, useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import * as topBarCtxt from "../../components/TopBarCtxt";
import "./RankingScreen.css";
import * as api from "../../api/api.js";
import arrowUp from "../../assets/Arrow upward.png";
import arrowDown from "../../assets/Arrow downward.png";
import equal from "../../assets/Equal Sign.png";

export default function RankingScreen() {
  const { competitionId } = useParams();
  const [ranking, setRanking] = useState([]);
  const [competition, setCompetition] = useState([]);
  const { topBarInfo, setTopBarInfo } = useContext(topBarCtxt.Ctxt);
  const [expandedRow, setExpandedRow] = useState(null);

  const handleRowClick = (index) => {
    var vw = Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0
    );
    if (vw <= 500) {
      setExpandedRow(expandedRow === index ? null : index);
    }
  };

  const LoadRankingItems = async () => {
    const {
      success,
      result: Ranking,
      error,
    } = await api.getRanking(competitionId);
    if (success) {
      console.log("ranking results:");
      console.log(Ranking.results[0]);
      setRanking(Ranking.results[0]);
    } else {
      console.log("Error loading ranking");
    }
  };

  const LoadCompetition = async () => {
    const {
      success,
      result: Competition,
      error,
    } = await api.getCompetition(competitionId);
    if (success) {
      setCompetition(Competition.results[0]);
    } else {
      setMessage(error);
    }
  };

  const getArrowImage = (tendencia) => {
    console.log(tendencia);
    switch (tendencia) {
      case 0:
        return <img className="tendency-img" src={equal}></img>;

      case 1:
        return <img className="tendency-img" src={arrowUp}></img>;

      case -1:
        return <img className="tendency-img" src={arrowDown}></img>;
    }
  };

  const AddTableRows = (rows) => {
    return rows.map((item, index) => {
      const isExpanded = expandedRow === index;
      return (
        <React.Fragment key={index}>
          <tr onClick={() => handleRowClick(index)}>
            <td className="position-column">
              <div>
                {getArrowImage(item.clasificacion.tendencia)}
                {index + 1}
              </div>
            </td>
            <td className="name-column">{`${item.nombre} ${item.apellidos}`}</td>
            <td className="percentage-column">{`${item.clasificacion.efficiencia} %`}</td>
            {AddExtraCloumnsData(item)}
          </tr>
          {isExpanded && (
            <tr className="expanded-row">
              <td colSpan="4">
                <div className="expanded-content">
                  {/* Aquí puedes añadir los datos adicionales que quieras mostrar */}
                  <p>
                    <strong>Nombre:</strong> {item.nombre} {item.apellidos}
                  </p>
                  <p>
                    <strong>Partidos Jugados:</strong>{" "}
                    {item.clasificacion.partidosJugados}
                  </p>
                  <p>
                    <strong>Partidos Ganados:</strong>{" "}
                    {item.clasificacion.partidosGanados}
                  </p>
                  <p>
                    <strong>Partidos Perdidos:</strong>{" "}
                    {item.clasificacion.partidosPerdidos}
                  </p>
                  <p>
                    <strong>Puntos a Favor:</strong>{" "}
                    {item.clasificacion.puntosAFavor}
                  </p>
                  <p>
                    <strong>Puntos en Contra:</strong>{" "}
                    {item.clasificacion.puntosEnContra}
                  </p>
                </div>
              </td>
            </tr>
          )}
        </React.Fragment>
      );
    });
  };

  const AddExtraCloumnsData = (item) => {
    var vw = Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0
    );
    console.log(`vw: ${vw}`);
    if (vw > 500) {
      return (
        <>
          <td className="num-column not-on-mobile">
            {item.clasificacion.partidosJugados}
          </td>
          <td className="num-column not-on-mobile">
            {item.clasificacion.partidosGanados}
          </td>
          <td className="num-column not-on-mobile">
            {item.clasificacion.partidosPerdidos}
          </td>
          <td className="num-column not-on-mobile">
            {item.clasificacion.puntosAFavor}
          </td>
          <td className="num-column not-on-mobile">
            {item.clasificacion.puntosEnContra}
          </td>
        </>
      );
    }
    return "";
  };

  useEffect(() => {
    LoadRankingItems();
    LoadCompetition();
    topBarCtxt.setTopBarInfo(
      topBarCtxt.menuByCompetition(competitionId).RankingScreen,
      topBarInfo,
      setTopBarInfo
    );
  }, []);

  const AddPositionTitle = () => {
    var vw = Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0
    );
    if (vw > 500) {
      return "Posición";
    }
    return "";
  };

  const AddExtraCloumnsTitles = () => {
    var vw = Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0
    );
    if (vw > 500) {
      return (
        <>
          <th id="PJ" className="num-column not-on-mobile">
            PJ
          </th>
          <th id="PG" className="num-column not-on-mobile">
            PG
          </th>
          <th id="PP" className="num-column not-on-mobile">
            PP
          </th>
          <th id="PF" className="num-column not-on-mobile">
            PF
          </th>
          <th id="PC" className="num-column not-on-mobile">
            PC
          </th>
        </>
      );
    }
    return "";
  };

  return (
    <div id="ranking-main">
      <div id="ranking-container">
        <div id="ranking-info">
          <div className="not-on-mobile">
            <h1>Ranking {competition.nombre}</h1>
          </div>
          <table id="ranking-table">
            <tr id="titles">
              <th id="position-title" className="position-column">
                {AddPositionTitle()}
              </th>
              <th id="name-title" className="name-column">
                Nombre
              </th>
              <th id="EFF" className="percentage-column">
                EFF
              </th>
              {AddExtraCloumnsTitles()}
            </tr>
            {AddTableRows(ranking)}
          </table>
        </div>
      </div>
    </div>
  );
}
