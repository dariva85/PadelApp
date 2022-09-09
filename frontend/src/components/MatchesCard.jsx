import React, { Component } from "react";
import "./MatchesCard.css";
import { useNavigate } from "react-router-dom";

export default function MatchesCard(props) {
  let NombreCompeti = "Padel semanal"
  let Fecha = "DD/MM/YYYY"
  let Hora = "HH:MM"
  let Status = "Pending"

  let DefaultMarcador = {
    final_score: [
      {
        player: ["Marti", "Tomas"],
        scoreboard: 0,
      },
      {
        player: ["Alex", "David"],
        scoreboard: 6,
      },
    ],
  }

  const Marcador = (props) => {
    try {
        
        //Aqui el orden será: 
        // Distribucion horizontal --> Div con tres hijos
        // Hijo 1
        //     Div distribucion vertical con el nombre de los jugadores.
        // Hijo 2 
        //     Div horizontal con el marcador. Numero, linea, numero.
        // Hijo 3
        //     Div distribucion vertical con el nombre de los jugadores.

        return <div className="MarcadorGrande">
          <div className="MarcadorNombres">
          <div>{props.final_score[0].player[0]}</div>  
          <div>{props.final_score[0].player[1]}</div>  
          </div> 
          <div className="MarcadorNumeros">
          <div>{props.final_score[0].scoreboard}</div>  
          <div className="Rayita"></div>
          <div>{props.final_score[1].scoreboard}</div>    
          </div> 

          <div className="MarcadorNombres">
          <div>{props.final_score[1].player[0]}</div>  
          <div>{props.final_score[1].player[1]}</div>    
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
            <div className="marcador"> {Marcador(DefaultMarcador)}</div>
            <div className="RayitaBlanca"></div>
            <div className="marcador"> {Marcador(DefaultMarcador)}</div>
            <div className="RayitaBlanca"></div>
            <div className="marcador"> {Marcador(DefaultMarcador)}</div>
            <div className="ButtonAccept">Accept</div>            
        </div>
  );
}
