import React, { Component, useState, useEffect } from "react";
import TopBar from "../components/TopBar";
import MatchesCard from "../components/MatchesCard";
import "./MatchesScreen.css";
import * as api from "../api/api.js";

export default function MatchesScreen() {
  const [macthes, setMacthes] = useState([]);
  
  let LinkedMenuItems = [
    { name: "Mis Competiciones", link: "/me/competitions" },
    { name: "Market", link: "/me/market" },
  ];

  const LoadMatches = async () => {
    const {
      success,
      result: dbCompetitions,
      error,
    } = await api.getMatches("630fa119fcafb33cdbb10fd5");
    //630fa119fcafb33cdbb10fd5  Este es el id de una persona
    //62adf55dd1d8cd0272ddab91 este es de la competicion
    //62adf55dd1d8cd0272ddab9e
    if (success) {
      setMacthes(dbCompetitions.results[0]);
    } else {
      setMessage(error);
    }
  };

  const AddMatchesCards = (competitionItems) => {
    return competitionItems.map((item) => (
      
        <MatchesCard matches ={item} />
      
    ));
  };
  useEffect(() => {
    LoadMatches();
  }, []);
  
  return (
    <div className="main-screen">
      <TopBar title="Mis Partidos" linkedItems={LinkedMenuItems} />
      
      <div className="matches-container">
        {AddMatchesCards(macthes)}
      </div>
      
    </div>
  );
}
