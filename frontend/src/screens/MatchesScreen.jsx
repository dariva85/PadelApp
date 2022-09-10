import React, { Component, useState, useEffect } from "react";
import TopBar from "../components/TopBar";
import MatchesCard from "../components/MatchesCard";
import "./MatchesScreen.css";
import * as api from "../api/api.js";
import * as usr from "../User";

export default function MatchesScreen() {
  const [macthes, setMacthes] = useState([]);
  const [names, setNames] = useState([]);
  
  let LinkedMenuItems = [
    { name: "Mis Competiciones", link: "/me/competitions" },
    { name: "Market", link: "/me/market" },
  ];

  const LoadMatches = async () => {
    console.log(usr.readUser()._id)
    const {
      success,
      result: dbCompetitions,
      error,
    } = await api.getMatches(usr.readUser()._id);
    //Aqui hay que recorrer la lista de matches para poder guardar todos los id de jugadores con sus nombres.
    let list_id = [];
    let Id_Name = {};
    for (const auxobject in dbCompetitions.results[0]) {
      list_id = list_id.concat(dbCompetitions.results[0][auxobject]["idUsuario"])
    }
    //Elimino los duplicados
    list_id = [...new Set(list_id)]


    for (const auxobject in list_id) {

      let aux = await api.getNamesUser(list_id[auxobject]);
      if (aux.success){
        Id_Name[String(list_id[auxobject])] = aux.result.results[0];
      }else{
        Id_Name[String(list_id[auxobject])] = "Anonym"
      }
      
    }
    setNames(Id_Name);

    if (success) {
      setMacthes(dbCompetitions.results[0]);
    } else {
      setMessage(error);
    }
  };

  const AddMatchesCards = (competitionItems,names) => {
    return competitionItems.map((item) => (
      
        <MatchesCard matches ={item} names = {names}/>
      
    ));
  };
  useEffect(() => {
    LoadMatches();
  }, []);
  
  return (
    <div className="main-screen">
      <TopBar title="Mis Partidos" linkedItems={LinkedMenuItems} />
      
      <div className="matches-container">
        {AddMatchesCards(macthes,names)}
      </div>
      
    </div>
  );
}
