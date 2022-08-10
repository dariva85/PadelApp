const mongodb = require("mongodb");
require("dotenv").config();

const envVarNames = [
  "SERVER_PORT",
  "DB_USER",
  "DB_PASSWORD",
  "DB_HOST",
  "DB_PORT",
  "DB_DATABASE",
];

let envVars = {};
let idDavid = mongodb.ObjectId("62adf55dd1d8cd0272ddab9b");
let idTomas = mongodb.ObjectId("62adf55dd1d8cd0272ddab9c");
let idMarti = mongodb.ObjectId("62adf55dd1d8cd0272ddab9d");
let idAlex = mongodb.ObjectId("62adf55dd1d8cd0272ddab9e");

let idLiga1 = mongodb.ObjectId("62adf55dd1d8cd0272ddab9a");
let idLiga2 = mongodb.ObjectId("62adf55dd1d8cd0272ddab9f");

let idPartido1 = mongodb.ObjectId("62adf55dd1d8cd0272ddab91");
let idPartido2 = mongodb.ObjectId("62adf55dd1d8cd0272ddab92");

envVarNames.forEach((varName) => {
  if (process.env[varName] === undefined) {
    throw new Error(`Missing environment variable '${varName}'`);
  }
  envVars[varName] = process.env[varName];
});

const getMongoURL = () => {
  const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DATABASE } = envVars;

  return `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}?authSource=admin`;
};

const client = new mongodb.MongoClient(getMongoURL(), {
  useUnifiedTopology: true,
});

async function main() {
  console.log("Connecting...");

  await client.connect();
  const db = client.db(envVars.DB_DATABASE);

  console.log("Inserting Users");
  const users = await db.collection("usuarios").insertMany([
    {
      _id: idDavid,
      idCompeticion: [],
      idPartido: [],
      nombre: "David",
      apellidos: "Rigal Vall",
      email: "david.rigalvall@gmail.com",
      username: "dariva",
      direccion: "Cervera es bien",
      codigoPostal: 25200,
      ciudad: "Cervera",
      provincia: "Lleida",
      imagenPerfil: null,
      password: "1234",
    },
    {
      _id: idTomas,
      idCompeticion: [],
      idPartido: [],
      nombre: "Tomas",
      apellidos: "Navas",
      email: "tomas.navas@gmail.com",
      username: "Zhomas",
      direccion: "Moncada zona chunga",
      codigoPostal: 25201,
      ciudad: "Moncada",
      provincia: "Bcn",
      imagenPerfil: null,
      password: "12345",
    },
    {
      _id: idMarti,
      idCompeticion: [],
      idPartido: [],
      nombre: "Marti",
      apellidos: "Olle",
      email: "marti.olle@hotmail.com",
      username: "martiollealavedra",
      direccion: "per allà Girona",
      codigoPostal: 25202,
      ciudad: "Vic?",
      provincia: "Girona",
      imagenPerfil: null,
      password: "123456",
    },
    {
      _id: idAlex,
      idCompeticion: [],
      idPartido: [],
      nombre: "Alex",
      apellidos: "Lopez",
      email: "alex.lopez@yahoo.es",
      username: "exal24",
      direccion: "per allà la sortida de la diagonal",
      codigoPostal: 25203,
      ciudad: "Esplugues",
      provincia: "Barcelona",
      imagenPerfil: null,
      password: "1234567",
    },
  ]);

  console.log("Inserting Competitions");

  const competitions = await db.collection("competiciones").insertMany([
    {
      _id: idLiga1,
      idUsuario: [idDavid, idTomas, idMarti, idAlex],
      idPartido: [],
      nombre: "Padel Semanal",
      descripcion: "Competición de padel de repetición semanal",
      direccion: "Cualquier sitio",
      nInscritos: 4,
      maxInscritos: 200,
      reglas: "Que gane el mejor",
      fechaInicio: new Date(),
      fechaFin: new Date(new Date().setMonth(new Date().getMonth() + 1)),
      Inscripciones: [],
      tipo: "Liga",
    },
    {
      _id: idLiga2,
      idUsuario: [idDavid, idTomas],
      idPartido: [],
      nombre: "Americana UpClub",
      descripcion: "Competición de padel ",
      direccion: "upclub",
      nInscritos: 2,
      maxInscritos: 200,
      reglas: "Que gane yo",
      fechaInicio: new Date(),
      fechaFin: new Date(new Date().setMonth(new Date().getMonth() + 2)),
      Inscripciones: [],
      tipo: "Americana",
    },
    {
      idUsuario: [idMarti, idAlex],
      idPartido: [],
      nombre: "Liga Interclub",
      descripcion: "Competición Interclub",
      direccion: "Dónde va a ser? en el Interclub",
      nInscritos: 2,
      maxInscritos: 200,
      reglas: "yo que se",
      fechaInicio: new Date(),
      fechaFin: new Date(new Date().setMonth(new Date().getMonth() + 3)),
      Inscripciones: [],
      tipo: "Liga",
    },
  ]);
  console.log("Inserting Partidos");

  const partido = await db.collection("partidos").insertMany([
    {
      _id: idPartido1,
      idUsuario: [idDavid, idTomas, idMarti, idAlex],
      idCompeticion: idLiga1,
      estado: "Pendiente de validar usuarios",
      fecha: new Date(new Date().setMonth(new Date().getDay + 3)),
      fechaValidacion: new Date(new Date().setMonth(new Date().getDay + 10)),
      direccion: "Pamplona",
      allScoreBoard: [
        {
          final_score: [
            {
              player: [idMarti, idTomas],
              scoreboard: 6,
            },
            {
              player: [idAlex, idDavid],
              scoreboard: 1,
            },
          ],
        },
        {
          final_score: [
            {
              player: [idMarti, idAlex],
              scoreboard: 6,
            },
            {
              player: [idTomas, idDavid],
              scoreboard: 2,
            },
          ],
        },
        {
          final_score: [
            {
              player: [idAlex, idTomas],
              scoreboard: 6,
            },
            {
              player: [idMarti, idDavid],
              scoreboard: 3,
            },
          ],
        },
      ],
      allValidadores: [idDavid, idTomas, idMarti, idAlex],
    },
    {
      _id: idPartido2,
      idUsuario: [idDavid, idTomas, idMarti, idAlex],
      idCompeticion: idLiga2,
      estado: "Pendiente de validar usuarios",
      fecha: new Date(new Date().setMonth(new Date().getDay + 3)),
      fechaValidacion: new Date(new Date().setMonth(new Date().getDay + 10)),
      direccion: "Gerona",
      allScoreBoard: [
        {
          final_score: [
            {
              player: [idMarti, idTomas],
              scoreboard: 0,
            },
            {
              player: [idAlex, idDavid],
              scoreboard: 6,
            },
          ],
        },
        {
          final_score: [
            {
              player: [idMarti, idAlex],
              scoreboard: 4,
            },
            {
              player: [idTomas, idDavid],
              scoreboard: 6,
            },
          ],
        },
        {
          final_score: [
            {
              player: [idAlex, idTomas],
              scoreboard: 7,
            },
            {
              player: [idMarti, idDavid],
              scoreboard: 5,
            },
          ],
        },
      ],
      allValidadores: [idDavid, idTomas, idMarti, idAlex],
    },
  ]);

  console.log("Inserting Inscripciones");

  let d = new Date();
  let mondays = [];

  d.setDate(1);
  // Get the first Monday in the month
  while (d.getDay() !== 1) {
    d.setDate(d.getDate() + 1);
  }
  d.setMinutes(0);
  d.setSeconds(0);
  d.setHours(19);
  // Get all the other Mondays in the month
  while (d.getMonth() !== 11) {
    var pushDate = new Date(d.getTime());
    mondays.push(pushDate);
    d.setDate(d.getDate() + 7);
  }

  const Inscripciones = await db.collection("inscripciones").insertMany([
    {
      inscritos: [
        { id: idDavid, timesStamp: new Date() },
        {
          id: idTomas,
          timesStamp: new Date(
            new Date().setMinutes(new Date().getMinutes() - 1)
          ),
        },
        {
          id: idMarti,
          timesStamp: new Date(
            new Date().setMinutes(new Date().getMinutes() - 2)
          ),
        },
        {
          id: idAlex,
          timesStamp: new Date(
            new Date().setMinutes(new Date().getMinutes() - 3)
          ),
        },
      ],
      idCompeticion: idLiga1,
      nombre: "Padel Semanal",
      FechaInicio: new Date(new Date().setMonth(new Date().getMonth() - 1)),
      FechaFin: new Date(new Date().setDate(new Date().getDay() + 1)),
      Titulo: "JuegoDiario",
      FechaPartido: new Date(new Date().setDate(new Date().getDay() + 2)),
      MaxInscritos: 8,
      Estado: "Open",
    },
  ]);

  for (var i = 0; i < mondays.length; i++) {
    let Inscripcions = await db.collection("inscripciones").insertOne({
      inscritos: [],
      idCompeticion: idLiga1,
      nombre: "Padel Semanal",
      fechaInicio: mondays[i],
      fechaFin: new Date().setDate(mondays[i].getDay() + 7),
      titulo: "JuegoDiario",
      fechaPartido: new Date().setDate(mondays[i].getDay() + 7),
      maxInscritos: 8,
      estado: "Open",
    });
  }

  console.log("Inserting Ranking");
  let Ranking = await db.collection("rankings").insertMany([
    {
      idCompeticion: idLiga1,
      idUsuario: idAlex,
      clasificacion: {
        posicion: 1,
        tendencia: 1,
        partidosJugados: 6,
        partidosGanados: 4,
        pardisosPerdidos: 2,
        puntosAFavor: 30,
        puntosEnContra: 22,
      },
    },
    {
      idCompeticion: idLiga1,
      idUsuario: idTomas,
      clasificacion: {
        posicion: 2,
        tendencia: 1,
        partidosJugados: 6,
        partidosGanados: 4,
        pardisosPerdidos: 2,
        puntosAFavor: 27,
        puntosEnContra: 25,
      },
    },
    {
      idCompeticion: idLiga1,
      idUsuario: idMarti,
      clasificacion: {
        posicion: 3,
        tendencia: 0,
        partidosJugados: 6,
        partidosGanados: 2,
        pardisosPerdidos: 4,
        puntosAFavor: 24,
        puntosEnContra: 28,
      },
    },
    {
      idCompeticion: idLiga1,
      idUsuario: idDavid,
      clasificacion: {
        posicion: 4,
        tendencia: -1,
        partidosJugados: 6,
        partidosGanados: 2,
        pardisosPerdidos: 4,
        puntosAFavor: 23,
        puntosEnContra: 25,
      },
    },
  ]);
  console.log("The database was started without any problems.");
  client.close();
}

main();
