const mongodb = require("mongodb");
const fs = require("fs"); //Auth Service
const bcrypt = require("bcrypt");

const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hash(password, salt);
};

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
let idDavid = mongodb.ObjectId("63132b99a1f7b03b4ca2e03a");
let idTomas = mongodb.ObjectId("62adf55dd1d8cd0272ddab9c");
let idMarti = mongodb.ObjectId("62adf55dd1d8cd0272ddab9d");
let idAlex = mongodb.ObjectId("62adf55dd1d8cd0272ddab9e");
let idUsuario1 = new mongodb.ObjectId();
let idUsuario2 = new mongodb.ObjectId();
let idUsuario3 = new mongodb.ObjectId();
let idUsuario4 = new mongodb.ObjectId();
let idUsuario5 = new mongodb.ObjectId();
let idUsuario6 = new mongodb.ObjectId();
let idUsuario7 = new mongodb.ObjectId();
let idUsuario8 = new mongodb.ObjectId();

let idLiga1 = mongodb.ObjectId("62adf55dd1d8cd0272ddab9a");
let idLiga2 = mongodb.ObjectId("62adf55dd1d8cd0272ddab9f");

let idPartido1 = mongodb.ObjectId("62adf55dd1d8cd0272ddab91");
let idPartido2 = mongodb.ObjectId("62adf55dd1d8cd0272ddab92");
let idPartido3 = mongodb.ObjectId("62adf55dd1d8cd0272ddab93");
let idPartido4 = mongodb.ObjectId("62adf55dd1d8cd0272ddab94");

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
      imagenPerfil: fs.readFileSync(`../db/UserImages/DemoUser.jpg`),
      password: await encryptPassword("fullstack"),
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
      imagenPerfil: fs.readFileSync(`../db/UserImages/DemoUser.jpg`),
      password: await encryptPassword("fullstack"),
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
      imagenPerfil: fs.readFileSync(`../db/UserImages/DemoUser.jpg`),
      password: await encryptPassword("fullstack"),
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
      imagenPerfil: fs.readFileSync(`../db/UserImages/DemoUser.jpg`),
      password: await encryptPassword("fullstack"),
    },
    {
      _id: idUsuario1,
      idCompeticion: [],
      idPartido: [],
      nombre: "Usuario1",
      apellidos: "Apellido1 Apellido2 ",
      email: "usuario1@gmail.com",
      username: "Usuario1",
      direccion: "casa Usuario1",
      codigoPostal: 25200,
      ciudad: "Ciudad",
      provincia: "provincia",
      imagenPerfil: fs.readFileSync(`../db/UserImages/DemoUser.jpg`),
      password: await encryptPassword("fullstack"),
    },
    {
      _id: idUsuario2,
      idCompeticion: [],
      idPartido: [],
      nombre: "Usuario2",
      apellidos: "Apellido1 Apellido2 ",
      email: "usuario2@gmail.com",
      username: "Usuario2",
      direccion: "casa Usuario2",
      codigoPostal: 25200,
      ciudad: "Ciudad",
      provincia: "provincia",
      imagenPerfil: fs.readFileSync(`../db/UserImages/DemoUser.jpg`),
      password: await encryptPassword("fullstack"),
    },
    {
      _id: idUsuario3,
      idCompeticion: [],
      idPartido: [],
      nombre: "Usuario3",
      apellidos: "Apellido1 Apellido2 ",
      email: "usuario3@gmail.com",
      username: "Usuario3",
      direccion: "casa Usuario3",
      codigoPostal: 25200,
      ciudad: "Ciudad",
      provincia: "provincia",
      imagenPerfil: fs.readFileSync(`../db/UserImages/DemoUser.jpg`),
      password: await encryptPassword("fullstack"),
    },
    {
      _id: idUsuario4,
      idCompeticion: [],
      idPartido: [],
      nombre: "Usuario4",
      apellidos: "Apellido1 Apellido2 ",
      email: "usuario4@gmail.com",
      username: "Usuario4",
      direccion: "casa Usuario4",
      codigoPostal: 25200,
      ciudad: "Ciudad",
      provincia: "provincia",
      imagenPerfil: fs.readFileSync(`../db/UserImages/DemoUser.jpg`),
      password: await encryptPassword("fullstack"),
    },
    {
      _id: idUsuario5,
      idCompeticion: [],
      idPartido: [],
      nombre: "Usuario5",
      apellidos: "Apellido1 Apellido2 ",
      email: "usuario5@gmail.com",
      username: "Usuario5",
      direccion: "casa Usuario5",
      codigoPostal: 25200,
      ciudad: "Ciudad",
      provincia: "provincia",
      imagenPerfil: fs.readFileSync(`../db/UserImages/DemoUser.jpg`),
      password: await encryptPassword("fullstack"),
    },
    {
      _id: idUsuario6,
      idCompeticion: [],
      idPartido: [],
      nombre: "Usuario6",
      apellidos: "Apellido1 Apellido2 ",
      email: "usuario6@gmail.com",
      username: "Usuario6",
      direccion: "casa Usuario6",
      codigoPostal: 25200,
      ciudad: "Ciudad",
      provincia: "provincia",
      imagenPerfil: fs.readFileSync(`../db/UserImages/DemoUser.jpg`),
      password: await encryptPassword("fullstack"),
    },
    {
      _id: idUsuario7,
      idCompeticion: [],
      idPartido: [],
      nombre: "Usuario7",
      apellidos: "Apellido1 Apellido2 ",
      email: "usuario7@gmail.com",
      username: "Usuario7",
      direccion: "casa Usuario7",
      codigoPostal: 25200,
      ciudad: "Ciudad",
      provincia: "provincia",
      imagenPerfil: fs.readFileSync(`../db/UserImages/DemoUser.jpg`),
      password: await encryptPassword("fullstack"),
    },
    {
      _id: idUsuario8,
      idCompeticion: [],
      idPartido: [],
      nombre: "Usuario8",
      apellidos: "Apellido1 Apellido2 ",
      email: "usuario8@gmail.com",
      username: "Usuario8",
      direccion: "casa Usuario8",
      codigoPostal: 25200,
      ciudad: "Ciudad",
      provincia: "provincia",
      imagenPerfil: fs.readFileSync(`../db/UserImages/DemoUser.jpg`),
      password: await encryptPassword("fullstack"),
    },
  ]);

  console.log("Inserting Competitions");

  const competitions = await db.collection("competiciones").insertMany([
    {
      _id: idLiga1,
      idUsuario: [
        idDavid,
        idTomas,
        idMarti,
        idAlex,
        idUsuario1,
        idUsuario2,
        idUsuario3,
        idUsuario4,
        idUsuario5,
        idUsuario6,
        idUsuario7,
        idUsuario8,
      ],
      idPartido: [],
      nombre: "Padel Semanal",
      descripcion: "Competición de padel de repetición semanal",
      informacion: [
        {
          titulo: "Descripción del torneo",
          parrafo:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
        {
          titulo: "Reglas",
          parrafo:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
      ],
      direccion: "Cualquier sitio",
      nInscritos: 4,
      maxInscritos: 200,
      reglas: "Que gane el mejor",
      fechaInicioInscripcion: new Date(),
      fechaFinInscripcion: new Date(
        new Date().setMonth(new Date().getMonth() + 1)
      ),
      fechaInicio: new Date(),
      fechaFin: new Date(new Date().setMonth(new Date().getMonth() + 1)),
      tipo: "Liga",
      imagen: fs.readFileSync(`../db/UserImages/padelsemanal.jpeg`),
    },
    {
      _id: idLiga2,
      idUsuario: [idDavid, idTomas],
      idPartido: [],
      nombre: "Americana UpClub",
      descripcion: "Competición de padel ",
      informacion: [
        {
          titulo: "Reglas",
          parrafo:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
      ],
      direccion: "upclub",
      nInscritos: 2,
      maxInscritos: 200,
      reglas: "Que gane yo",
      fechaInicioInscripcion: new Date(),
      fechaFinInscripcion: new Date(
        new Date().setMonth(new Date().getMonth() + 1)
      ),
      fechaInicio: new Date(),
      fechaFin: new Date(new Date().setMonth(new Date().getMonth() + 2)),
      tipo: "Americana",
      imagen: fs.readFileSync(`../db/UserImages/upclub.jpeg`),
    },
    {
      idUsuario: [],
      idPartido: [],
      nombre: "Liga Interclub",
      descripcion: "Competición Interclub",
      informacion: [
        {
          titulo: "Descripción del torneo",
          parrafo:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
        {
          titulo: "Fechas de los partidos",
          parrafo:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
        {
          titulo: "Reglas",
          parrafo:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
      ],
      direccion: "Dónde va a ser? en el Interclub",
      nInscritos: 2,
      maxInscritos: 200,
      reglas: "yo que se",
      fechaInicioInscripcion: new Date(),
      fechaFinInscripcion: new Date(
        new Date().setMonth(new Date().getMonth() + 1)
      ),
      fechaInicio: new Date(),
      fechaFin: new Date(new Date().setMonth(new Date().getMonth() + 3)),
      tipo: "Liga",
      imagen: fs.readFileSync(`../db/UserImages/padelsemanal.jpeg`),
    },
  ]);
  console.log("Inserting Partidos");

  const partido = await db.collection("partidos").insertMany([
    {
      _id: idPartido1,
      idUsuario: [idDavid, idTomas, idMarti, idAlex],
      idCompeticion: idLiga1,
      fecha: new Date(new Date().setMonth(new Date().getMonth() - 1)),
      fechaValidacion: new Date(new Date().setDate(new Date().getDay() + 10)),
      estado: "Pending",
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
      estado: "Pending",
      fecha: new Date(new Date().setDate(new Date().getDay() + 10)),
      fechaValidacion: new Date(new Date().setDate(new Date().getDay() + 10000)),
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
    {
      _id: idPartido3,
      idUsuario: [idDavid, idTomas, idMarti, idAlex],
      idCompeticion: idLiga2,
      estado: "Pending",
      fecha: new Date(new Date().setDate(new Date().getDay() + 10)),
      fechaValidacion: new Date(new Date().setDate(new Date().getDay() + 110)),
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
      allValidadores: [idMarti, idAlex],
    },
    {
      _id: idPartido4,
      idUsuario: [idDavid, idTomas, idMarti, idAlex],
      idCompeticion: idLiga2,
      estado: "Pending",
      fecha: new Date(new Date().setDate(new Date().getDay() + 10)),
      fechaValidacion: new Date(new Date().setDate(new Date().getDay() + 10)),
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
      allValidadores: [idMarti, idAlex],
    },
  ]);

  console.log("Inserting Inscripciones");

  let m = new Date();
  let w = new Date();
  let f = new Date();
  let mondays = [];
  let wednesdays = [];
  let fridays = [];

  m.setDate(1);
  m.setMonth(m.getMonth());
  w.setDate(3);
  w.setMonth(w.getMonth());
  f.setDate(5);
  f.setMonth(f.getMonth());
  // Get the first Monday in the month
  while (m.getDay() !== 1) {
    m.setDate(m.getDate() + 1);
    w.setDate(w.getDate() + 1);
    f.setDate(f.getDate() + 1);
  }
  m.setMinutes(0);
  m.setSeconds(0);
  m.setHours(19);
  w.setMinutes(0);
  w.setSeconds(0);
  w.setHours(19);
  f.setMinutes(0);
  f.setSeconds(0);
  f.setHours(19);
  // Get all the other Mondays in the month
  while (m.getMonth() !== 11) {
    var pushDate = new Date(m.getTime());
    mondays.push(pushDate);
    m.setDate(m.getDate() + 7);
    var pushDate = new Date(w.getTime());
    wednesdays.push(pushDate);
    w.setDate(w.getDate() + 7);
    var pushDate = new Date(f.getTime());
    fridays.push(pushDate);
    f.setDate(f.getDate() + 7);
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
      partidos: [],
    },
  ]);

  for (var i = 0; i < mondays.length - 1; i++) {
    let Inscripcions = await db.collection("inscripciones").insertOne({
      inscritos: [],
      idCompeticion: idLiga1,
      nombre: "Lunes",
      fechaInicio: mondays[i],
      fechaFin: mondays[i + 1],
      titulo: "JuegoDiario",
      fechaPartido: mondays[i + 1],
      maxInscritos: 8,
      estado: "Open",
      partidos: [],
    });
    Inscripcions = await db.collection("inscripciones").insertOne({
      inscritos: [],
      idCompeticion: idLiga1,
      nombre: "Miércoles",
      fechaInicio: wednesdays[i],
      fechaFin: wednesdays[i + 1],
      titulo: "JuegoDiario",
      fechaPartido: wednesdays[i + 1],
      maxInscritos: 8,
      estado: "Open",
      partidos: [],
    });
    Inscripcions = await db.collection("inscripciones").insertOne({
      inscritos: [],
      idCompeticion: idLiga1,
      nombre: "Viernes",
      fechaInicio: fridays[i],
      fechaFin: fridays[i + 1],
      titulo: "JuegoDiario",
      fechaPartido: fridays[i + 1],
      maxInscritos: 8,
      estado: "Open",
      partidos: [],
    });
  }

  console.log("Inserting Ranking");
  let Ranking = await db.collection("rankings").insertMany([
    {
      idCompeticion: idLiga1,
      idUsuario: idAlex,
      clasificacion: {
        efficiencia: 0.33,
        efficienciaPuntos: 0.15,
        tendencia: 1,
        partidosJugados: 6,
        partidosGanados: 4,
        partidosPerdidos: 2,
        puntosAFavor: 30,
        puntosEnContra: 22,
      },
    },
    {
      idCompeticion: idLiga1,
      idUsuario: idTomas,
      clasificacion: {
        efficiencia: 1.33,
        efficienciaPuntos: 0.03,
        tendencia: 1,
        partidosJugados: 6,
        partidosGanados: 4,
        partidosPerdidos: 2,
        puntosAFavor: 27,
        puntosEnContra: 25,
      },
    },
    {
      idCompeticion: idLiga1,
      idUsuario: idMarti,
      clasificacion: {
        efficiencia: -0.33,
        efficienciaPuntos: -0.07,
        tendencia: 0,
        partidosJugados: 6,
        partidosGanados: 2,
        partidosPerdidos: 4,
        puntosAFavor: 24,
        puntosEnContra: 28,
      },
    },
    {
      idCompeticion: idLiga1,
      idUsuario: idDavid,
      clasificacion: {
        efficiencia: -0.33,
        efficienciaPuntos: -0.04,
        tendencia: -1,
        partidosJugados: 6,
        partidosGanados: 2,
        partidosPerdidos: 4,
        puntosAFavor: 23,
        puntosEnContra: 25,
      },
    },
    {
      idCompeticion: idLiga1,
      idUsuario: idUsuario1,
      clasificacion: {
        efficiencia: -3.33,
        efficienciaPuntos: -0.04,
        tendencia: -1,
        partidosJugados: 6,
        partidosGanados: 2,
        partidosPerdidos: 4,
        puntosAFavor: 23,
        puntosEnContra: 25,
      },
    },
    {
      idCompeticion: idLiga1,
      idUsuario: idUsuario2,
      clasificacion: {
        efficiencia: 2,
        efficienciaPuntos: -0.04,
        tendencia: -1,
        partidosJugados: 6,
        partidosGanados: 2,
        partidosPerdidos: 4,
        puntosAFavor: 23,
        puntosEnContra: 25,
      },
    },
    {
      idCompeticion: idLiga1,
      idUsuario: idUsuario3,
      clasificacion: {
        efficiencia: 3.33,
        efficienciaPuntos: -0.04,
        tendencia: -1,
        partidosJugados: 6,
        partidosGanados: 2,
        partidosPerdidos: 4,
        puntosAFavor: 23,
        puntosEnContra: 25,
      },
    },
    {
      idCompeticion: idLiga1,
      idUsuario: idUsuario4,
      clasificacion: {
        efficiencia: 0.25,
        efficienciaPuntos: -0.04,
        tendencia: -1,
        partidosJugados: 6,
        partidosGanados: 2,
        partidosPerdidos: 4,
        puntosAFavor: 23,
        puntosEnContra: 25,
      },
    },
    {
      idCompeticion: idLiga1,
      idUsuario: idUsuario5,
      clasificacion: {
        efficiencia: -0.89,
        efficienciaPuntos: -0.04,
        tendencia: -1,
        partidosJugados: 6,
        partidosGanados: 2,
        partidosPerdidos: 4,
        puntosAFavor: 23,
        puntosEnContra: 25,
      },
    },
    {
      idCompeticion: idLiga1,
      idUsuario: idUsuario6,
      clasificacion: {
        efficiencia: -2,
        efficienciaPuntos: -0.04,
        tendencia: -1,
        partidosJugados: 6,
        partidosGanados: 2,
        partidosPerdidos: 4,
        puntosAFavor: 23,
        puntosEnContra: 25,
      },
    },
    {
      idCompeticion: idLiga1,
      idUsuario: idUsuario7,
      clasificacion: {
        efficiencia: -8,
        efficienciaPuntos: -0.04,
        tendencia: -1,
        partidosJugados: 6,
        partidosGanados: 2,
        partidosPerdidos: 4,
        puntosAFavor: 23,
        puntosEnContra: 25,
      },
    },
    {
      idCompeticion: idLiga1,
      idUsuario: idUsuario8,
      clasificacion: {
        efficiencia: -7.33,
        efficienciaPuntos: -0.04,
        tendencia: -1,
        partidosJugados: 6,
        partidosGanados: 2,
        partidosPerdidos: 4,
        puntosAFavor: 23,
        puntosEnContra: 25,
      },
    },
  ]);
  console.log("The database was started without any problems.");
  client.close();
}
main();
