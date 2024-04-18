import React, { useState, useContext, useEffect } from "react";
import "./MatchesScreen.css";
import MatchesCard from "../components/MatchesCard";
import * as topBarCtxt from "../components/TopBarCtxt";
import * as api from "../api/api.js";
import * as usr from "../User";

export default function MatchesScreen() {
  const { topBarInfo, setTopBarInfo } = useContext(topBarCtxt.Ctxt);
  const [macthes, setMacthes] = useState([]);
  const [names, setNames] = useState([]);

  const LoadMatches = async () => {
    const {
      success,
      result: dbMatches,
      error,
    } = await api.getMatches(usr.readUser()._id);

    if (success) {
      setMacthes(dbMatches.results[0]);
    } else {
      setMessage(error);
    }
  };

  const AddMatchesCards = (competitionItems, names) => {
    return competitionItems.map((item) => <MatchesCard matches={item} S />);
  };
  useEffect(() => {
    LoadMatches();
    topBarCtxt.setTopBarInfo(
      topBarCtxt.menuByScreen.MatchesScreen,
      topBarInfo,
      setTopBarInfo
    );
  }, []);

  return (
    <div id="matches-main">
      <div className="matches-container">{AddMatchesCards(macthes, names)}</div>
    </div>
  );
}

/*
1. Eliminar el marco del input cuando [Completado]
  1.1 crear izquierdaclase y derecha clase para que salgan hacia fuera.
2. Al Clikar, voy directamente a la coleccion partido y comparo el resultado con mi hook de ese partido.
3. EL boton solo aparece si el estado del partido es pendiendte. [Completado]
4. Si difiere borro lista de validadores y pongo mi score.
5. Si igual añado el nombre a la lista de validadores y si soy el tercero, actualizo el estado.
  5.1 Actualizar ranking.

  NotStarted --> Este es por la fecha. Si el partido no se ha hecho pues se deduce su estado.
  + Sin boton [Completado]
  Pending --> Es igual que el otro pero la fecha determina si se ha jugado o no.
  +Con boton [Completado]
  Validated.
  + Sin boton [Completado]
  + Con reloj 
  Closed.
  + Sin boton. [Completado]
  + Sin estado.

*/
