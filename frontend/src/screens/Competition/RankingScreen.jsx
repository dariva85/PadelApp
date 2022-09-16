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
    console.log(rows);
    return rows.map((item, index) => {
      return (
        <tr>
          <td className="position-column">
            <div>
              {getArrowImage(item.clasificacion.tendencia)}
              {index + 1}
            </div>
          </td>
          <td className="name-column">{`${item.nombre} ${item.apellidos}`}</td>
          <td className="percentage-column">{`${item.clasificacion.efficiencia} %`}</td>
          <td className="num-column">{item.clasificacion.partidosJugados}</td>
          <td className="num-column">{item.clasificacion.partidosGanados}</td>
          <td className="num-column">{item.clasificacion.partidosPerdidos}</td>
          <td className="num-column">{item.clasificacion.puntosAFavor}</td>
          <td className="num-column">{item.clasificacion.puntosEnContra}</td>
        </tr>
      );
    });
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

  return (
    <div id="main-screen">
      <div id="ranking-container">
        <div id="ranking-info">
          <h1>Ranking {competition.nombre}</h1>
          <table id="ranking-table">
            <tr id="titles">
              <th id="position-titile" className="position-column">
                Posición
              </th>
              <th id="name-title" className="name-column">
                Nombre
              </th>
              <th id="EFF" className="percentage-column">
                EFF
              </th>
              <th id="PJ" className="num-column">
                PJ
              </th>
              <th id="PG" className="num-column">
                PG
              </th>
              <th id="PP" className="num-column">
                PP
              </th>
              <th id="PF" className="num-column">
                PF
              </th>
              <th id="PC" className="num-column">
                PC
              </th>
            </tr>
          </table>
          <table id="ranking-table">{AddTableRows(ranking)}</table>
        </div>
      </div>
    </div>
  );
}
