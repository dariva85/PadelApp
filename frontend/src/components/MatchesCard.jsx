import React, { Component, useState, useEffect } from "react";
import "./MatchesCard.css";
import { useNavigate } from "react-router-dom";

export default function MatchesCard(props) {
  const [Match, setTheMatch] = useState(props);
  console.log(props.names)
  console.log(props.names["62adf55dd1d8cd0272ddab9c"])
  console.log(props.matches.allScoreBoard[0].final_score[0].player[0])
  console.log(props.names[props.matches.allScoreBoard[0].final_score[0].player[0]])
  
  let NombreCompeti = "Padel semanal"
  let Fecha = String(new Date(props.matches.fecha).getDate())+"/"+String(new Date(props.matches.fecha).getMonth())+"/"+String(new Date(props.matches.fecha).getFullYear())
  let Hora = String(new Date(props.matches.fecha).getHours())+":"+String(new Date(props.matches.fecha).getMinutes())
  let Status = "Pending"
  
  console.log(props.matches.fecha)
  
  const MatchValueChanged = (NumMarcador,Partido,valor) => {
    console.log("jola")
    Match.matches.allScoreBoard[Partido].final_score[NumMarcador].scoreboard = valor;
    setTheMatch(Match);
    console.log(Match)

  }
  const Marcador = (props,number,names) => {
    console.log("names");
    console.log(names);
    try {


        return <div className="MarcadorGrande">
          <div className="MarcadorNombres">
          <div>{names[props.final_score[0].player[0]].substr(0, 14)}</div>  
          <div>{names[props.final_score[0].player[1]].substr(0, 14)}</div>  
          </div> 
          <div className="MarcadorNumeros">

          <input placeholder = {props.final_score[0].scoreboard} onchanged={value => MatchValueChanged(0,number,value)}></input>
            
          <div className="Rayita"></div>
          <input placeholder = {props.final_score[1].scoreboard} onchanged={value => MatchValueChanged(1,number,value)}></input>
          </div> 

          <div className="MarcadorNombres">
          <div>{names[props.final_score[1].player[0]].substr(0, 14)}</div>  
          <div>{names[props.final_score[1].player[1]].substr(0, 14)}</div>    
          </div> 
          
          
          
          </div>
        

    } catch (e) {}
  };

  return (
    
        <div id="mainCard">
          <link href='https://css.gg/calendar.css' rel='stylesheet'></link>

            <div id="tittlematch">
                <p>{NombreCompeti}</p> 
            </div>
            
            <div className="ParteSuperiorCartaPartido"> 
              
            <i class="gg-calendar" id="calendario"></i>
            <div className="fecha">
              <div>{Fecha}</div>
              <div>{Hora}</div>
            </div>
              <div className="BotonEstado">
                {Status}
              </div>  
            </div>
            <div className="RayitaBlanca"></div>
            <div className="marcador"> {Marcador(Match.matches.allScoreBoard[0],0,props.names)}</div>
            <div className="RayitaBlanca"></div>
            <div className="marcador"> {Marcador(Match.matches.allScoreBoard[1],1,props.names)}</div>
            <div className="RayitaBlanca"></div>
            <div className="marcador"> {Marcador(Match.matches.allScoreBoard[2],2,props.names)}</div>
            <div className="ButtonAccept">Accept</div>            
        </div>
  );
}


/*
PASOS

Debo generar un template de uso de un objeto de partido.
Detras utilizar un Hook que lo tome como valor de entrada.
Substituir lo que tengo por una estructura del objeto linea 1.
Subtituir los marcadores numericos por inputs.
Gestionar el onchage con el set state.
Por último dar funcionalidad al boton enviar.

[{6,5},{6,4}{4,3}]
MatchValueChanged(matchId, playersId, newValue){
matches[matchId].finalScore[playersId].scoreboard = newValue;
setMatches(matches)
}


<input onchanged={(value) => MatchValueChanged(0,0,value)}

*/