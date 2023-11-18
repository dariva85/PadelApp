const mongodb = require("mongodb");
const fs = require("fs");
const bcrypt = require("bcryptjs");

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

async function Populate() {
  console.log("Connecting...");

  await client.connect();
  const db = client.db(envVars.DB_DATABASE);

  if ((await db.collection("usuarios").countDocuments()) !== 0) {
    console.log("DB Already populate with users!");
  } else {
    console.log("Inserting Users");
    const users = await InsertUsers(db);
  }

  if ((await db.collection("competiciones").countDocuments()) !== 0) {
    console.log("DB Already populate with competitions!");
  } else {
    console.log("Inserting Competitions");
    const competitions = await InsertCompetitions(db);
  }

  if ((await db.collection("partidos").countDocuments()) !== 0) {
    console.log("DB Already populate with partidos!");
  } else {
    console.log("Inserting partidos");
    const partido = await InsertPartidos(db);
  }

  let currentDate = new Date().toISOString();
  if (
    (await db
      .collection("inscripciones")
      .find({
        fechaPartido: { $gte: currentDate },
      })
      .countDocuments()) < 3
  ) {
    console.log("DB Already populate with inscripciones!");
  } else {
    console.log("Inserting inscripciones");
    await InsertingInscripciones(db);
  }

  if ((await db.collection("rankings").countDocuments()) !== 0) {
    console.log("DB Already populate with rankings!");
  } else {
    console.log("Inserting rankings");
    let Ranking = await InsertRankings(db);
  }

  console.log("The database was started without any problems.");
  client.close();
}

module.exports = {
  Populate,
};
async function InsertRankings(db) {
  return await db.collection("rankings").insertMany([
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
        efficiencia: 3.33,
        efficienciaPuntos: 5.07,
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
}

async function InsertingInscripciones(db) {
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
  while (m.getMonth() !== 1) {
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
      pistas: [
        {
          Club: "Up Club",
          PistaNum: "1",
          Hora: mondays[i + 1],
        },
        {
          Club: "Up Club",
          PistaNum: "2",
          Hora: mondays[i + 1],
        },
        {
          Club: "Up Club",
          PistaNum: "3",
          Hora: mondays[i + 1],
        },
      ],
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
      pistas: [
        {
          Club: "Up Club",
          PistaNum: "3",
          Hora: wednesdays[i + 1],
        },
        {
          Club: "Up Club",
          PistaNum: "5",
          Hora: wednesdays[i + 1],
        },
        {
          Club: "Up Club",
          PistaNum: "7",
          Hora: wednesdays[i + 1],
        },
      ],
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
      pistas: [
        {
          Club: "Up Club",
          PistaNum: "2",
          Hora: fridays[i + 1],
        },
        {
          Club: "Up Club",
          PistaNum: "4",
          Hora: fridays[i + 1],
        },
        {
          Club: "Up Club",
          PistaNum: "6",
          Hora: fridays[i + 1],
        },
      ],
    });
  }
}

async function InsertPartidos(db) {
  return await db.collection("partidos").insertMany([
    {
      _id: idPartido1,
      idUsuario: [idDavid, idTomas, idMarti, idAlex],
      idCompeticion: idLiga1,
      fecha: new Date(new Date().setMonth(new Date().getMonth() - 1)),
      fechaValidacion: new Date(new Date().setDate(new Date().getDay() + 10)),
      estado: "Pending",
      direccion: "Mataro",
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
      fechaValidacion: new Date(
        new Date().setDate(new Date().getDay() + 10000)
      ),
      direccion: "Badalona",
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
      direccion: "Barcelona",
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
      direccion: "Badalona",
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
}

async function InsertCompetitions(db) {
  return await db.collection("competiciones").insertMany([
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
            "Se juega cada semana sin excepción en el Club Padel Mataró Pistas 1 y 2. Los días de partido se publicaran esta misma semana antes de que empiecen los primeros enfrentamientos. Se podran escoger los días de partido y se valorará el porcentaje de partidos ganados para escoger al ganador.",
        },
        {
          titulo: "Reglas",
          parrafo:
            "Las reglas del torneo son las básicas del padel con la excepción de que en caso de empate en un juego se hará un punto de oro. El ganador de ese punto se lleva el juego. En caso de no terminar dentro de tiempo se decidirá el ganador con un super Tie Break a 11.",
        },
      ],
      direccion: "Carrer del Port n 23, Mataró",
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
      imagen: fs.readFileSync(`./src/assets/padelsemanal.jpeg`),
    },
    {
      _id: idLiga2,
      idUsuario: [idDavid, idTomas],
      idPartido: [],
      nombre: "Americana UpClub",
      descripcion: "Competición de padel sin equipos fijos",
      informacion: [
        {
          titulo: "Reglas",
          parrafo:
            "La unica regla es divertirse al maximo y respetar al compañero y al equipo rival. El resto de normas son iguales que las de cualquier torneo de padel y se pueden consultar en la web de WPT.",
        },
      ],
      direccion: "UpClup Padel Badalona",
      nInscritos: 2,
      maxInscritos: 200,
      reglas: "Ven a jugar y te divertiras",
      fechaInicioInscripcion: new Date(),
      fechaFinInscripcion: new Date(
        new Date().setMonth(new Date().getMonth() + 1)
      ),
      fechaInicio: new Date(),
      fechaFin: new Date(new Date().setMonth(new Date().getMonth() + 2)),
      tipo: "Americana",
      imagen: fs.readFileSync(`./src/assets/upclub.jpeg`),
    },
    {
      idUsuario: [],
      idPartido: [],
      nombre: "Liga Interclub",
      descripcion: "Competición Interclub Barcelona",
      informacion: [
        {
          titulo: "Descripción del torneo",
          parrafo:
            "La competición se celebrara durante los proximos 5 meses y los participantes pueden escoger los días que desean jugar. El torneo es abierto a todo el mundo y no es necesaria experiencia previa.",
        },
        {
          titulo: "Fechas de los partidos",
          parrafo:
            "Los partidos seran convocados por los organizadores pero serean los propios jugadores que se podran apuntar a los días que quieran. Si hay suficientes jugadores apuntados se presentara el partido como cerrado con la fecha y hora acordadas entre jugadores.",
        },
        {
          titulo: "Reglas",
          parrafo:
            "Las reglas del torneo son las básicas del padel con la excepción de que en caso de empate en un juego se hará un punto de oro. El ganador de ese punto se lleva el juego. En caso de no terminar dentro de tiempo se decidirá el ganador con un super Tie Break a 11.",
        },
      ],
      direccion: "Dónde va a ser? en el Interclub Barcelona",
      nInscritos: 2,
      maxInscritos: 200,
      reglas: "Que no te lo cuenten!!",
      fechaInicioInscripcion: new Date(),
      fechaFinInscripcion: new Date(
        new Date().setMonth(new Date().getMonth() + 1)
      ),
      fechaInicio: new Date(),
      fechaFin: new Date(new Date().setMonth(new Date().getMonth() + 3)),
      tipo: "Liga",
      imagen: fs.readFileSync(`./src/assets/padelsemanal.jpeg`),
    },
    {
      idUsuario: [],
      idPartido: [],
      nombre: "Liga Extra",
      descripcion:
        "Competición Extra Barcelona, esta va a ser un poco larga, pq hay que probar que pasa cuando nos pasamos de descripción",
      informacion: [
        {
          titulo: "Descripción del torneo",
          parrafo:
            "La competición se celebrara durante los proximos 5 meses y los participantes pueden escoger los días que desean jugar. El torneo es abierto a todo el mundo y no es necesaria experiencia previa.",
        },
        {
          titulo: "Fechas de los partidos",
          parrafo:
            "Los partidos seran convocados por los organizadores pero serean los propios jugadores que se podran apuntar a los días que quieran. Si hay suficientes jugadores apuntados se presentara el partido como cerrado con la fecha y hora acordadas entre jugadores.",
        },
        {
          titulo: "Reglas",
          parrafo:
            "Las reglas del torneo son las básicas del padel con la excepción de que en caso de empate en un juego se hará un punto de oro. El ganador de ese punto se lleva el juego. En caso de no terminar dentro de tiempo se decidirá el ganador con un super Tie Break a 11.",
        },
      ],
      direccion: "Dónde va a ser? en el Interclub Barcelona",
      nInscritos: 2,
      maxInscritos: 200,
      reglas: "Que no te lo cuenten!!",
      fechaInicioInscripcion: new Date(),
      fechaFinInscripcion: new Date(
        new Date().setMonth(new Date().getMonth() + 1)
      ),
      fechaInicio: new Date(),
      fechaFin: new Date(new Date().setMonth(new Date().getMonth() + 3)),
      tipo: "Liga",
      imagen: fs.readFileSync(`./src/assets/padelsemanal.jpeg`),
    },
  ]);
}

async function InsertUsers(db) {
  return await db.collection("usuarios").insertMany([
    {
      _id: idDavid,
      idCompeticion: [],
      idPartido: [],
      nombre: "David",
      apellidos: "Rigal Vall",
      email: "david@gmail.com",
      telefono: "934987321",
      movil: "654987321",
      username: "dariva",
      direccion: "Carrer de l'Aigua n 243",
      codigoPostal: 25200,
      ciudad: "Cervera",
      provincia: "Lleida",
      imagenPerfil: `data:image/png;base64, ${fs.readFileSync(
        `./src/assets/NoImageAccount.png`,
        { encoding: "base64" }
      )}`,
      password: await encryptPassword("fullstack"),
      googleId: "",
    },
    {
      _id: idTomas,
      idCompeticion: [],
      idPartido: [],
      nombre: "Tomas",
      apellidos: "Navas",
      email: "tomas.navas@gmail.com",
      telefono: "938513468",
      movil: "654987321",
      username: "Zhomas",
      direccion: "Carrer Montfill n 78",
      codigoPostal: 76401,
      ciudad: "Moncada",
      provincia: "Barcelona",
      imagenPerfil: `data:image/png;base64, ${fs.readFileSync(
        `./src/assets/NoImageAccount.png`,
        { encoding: "base64" }
      )}`,
      password: await encryptPassword("fullstack"),
      googleId: "",
    },
    {
      _id: idMarti,
      idCompeticion: [],
      idPartido: [],
      nombre: "Xavi",
      apellidos: "Iglesia",
      email: "xavi@gmail.com",
      telefono: "972741236",
      movil: "654987321",
      username: "martiollealavedra",
      direccion: "Carrer Sant Pere 12",
      codigoPostal: 26502,
      ciudad: "Vic",
      provincia: "Girona",
      imagenPerfil: `data:image/png;base64, ${fs.readFileSync(
        `./src/assets/NoImageAccount.png`,
        { encoding: "base64" }
      )}`,
      password: await encryptPassword("fullstack"),
      googleId: "",
    },
    {
      _id: idAlex,
      idCompeticion: [],
      idPartido: [],
      nombre: "Alex",
      apellidos: "Lopez",
      email: "alex.lopez@yahoo.es",
      telefono: "932589741",
      movil: "654987321",
      username: "exal24",
      direccion: "Carrer Joaquim Terral n 23",
      codigoPostal: 17405,
      ciudad: "Esplugues",
      provincia: "Barcelona",
      imagenPerfil: `data:image/png;base64, ${fs.readFileSync(
        `./src/assets/NoImageAccount.png`,
        { encoding: "base64" }
      )}`,
      password: await encryptPassword("fullstack"),
      googleId: "",
    },
    {
      _id: idUsuario1,
      idCompeticion: [],
      idPartido: [],
      nombre: "Andreu",
      apellidos: "Perez Cases",
      email: "andreup@gmail.com",
      telefono: "934567494",
      movil: "654987321",
      username: "andreandre",
      direccion: "Avinguda Nord n 344",
      codigoPostal: 34776,
      ciudad: "Reus",
      provincia: "Tarragona",
      imagenPerfil: `data:image/png;base64, ${fs.readFileSync(
        `./src/assets/NoImageAccount.png`,
        { encoding: "base64" }
      )}`,
      password: await encryptPassword("fullstack"),
      googleId: "",
    },
    {
      _id: idUsuario2,
      idCompeticion: [],
      idPartido: [],
      nombre: "Manolo",
      apellidos: "Sanchez Comas",
      email: "manolo.sanchez@gmail.com",
      telefono: "972523221",
      movil: "654987321",
      username: "manolo77",
      direccion: "Carrer Vidreres n 51",
      codigoPostal: 17495,
      ciudad: "Figueres",
      provincia: "Girona",
      imagenPerfil: `data:image/png;base64, ${fs.readFileSync(
        `./src/assets/NoImageAccount.png`,
        { encoding: "base64" }
      )}`,
      password: await encryptPassword("fullstack"),
      googleId: "",
    },
    {
      _id: idUsuario3,
      idCompeticion: [],
      idPartido: [],
      nombre: "Joan",
      apellidos: "Garrido Puig",
      email: "joangp@gmail.com",
      telefono: "936452336",
      movil: "654987321",
      username: "jgarrido",
      direccion: "Carrer de Marina n 182",
      codigoPostal: 25670,
      ciudad: "Roses",
      provincia: "Girona",
      imagenPerfil: `data:image/png;base64, ${fs.readFileSync(
        `./src/assets/NoImageAccount.png`,
        { encoding: "base64" }
      )}`,
      password: await encryptPassword("fullstack"),
      googleId: "",
    },
    {
      _id: idUsuario4,
      idCompeticion: [],
      idPartido: [],
      nombre: "Hector",
      apellidos: "Serra Mota",
      email: "serramota@gmail.com",
      telefono: "972530926",
      movil: "654987321",
      username: "hsmota",
      direccion: "Carrer Puigventós n 34",
      codigoPostal: 17500,
      ciudad: "Tarrega",
      provincia: "Lleida",
      imagenPerfil: `data:image/png;base64, ${fs.readFileSync(
        `./src/assets/NoImageAccount.png`,
        { encoding: "base64" }
      )}`,
      password: await encryptPassword("fullstack"),
      googleId: "",
    },
    {
      _id: idUsuario5,
      idCompeticion: [],
      idPartido: [],
      nombre: "Oriol",
      apellidos: "Lopez Pla",
      email: "olopezpla@gmail.com",
      telefono: "934820196",
      movil: "654987321",
      username: "olopezp",
      direccion: "Carrer Major n 6",
      codigoPostal: 25440,
      ciudad: "Manresa",
      provincia: "Barcelona",
      imagenPerfil: `data:image/png;base64, ${fs.readFileSync(
        `./src/assets/NoImageAccount.png`,
        { encoding: "base64" }
      )}`,
      password: await encryptPassword("fullstack"),
      googleId: "",
    },
    {
      _id: idUsuario6,
      idCompeticion: [],
      idPartido: [],
      nombre: "Lluis",
      apellidos: "Armengol Pineda",
      email: "armengol.lluis@gmail.com",
      telefono: "931221878",
      movil: "654987321",
      username: "armengolp",
      direccion: "Carrer Ferreries n 67",
      codigoPostal: 18600,
      ciudad: "Banyoles",
      provincia: "Girona",
      imagenPerfil: `data:image/png;base64, ${fs.readFileSync(
        `./src/assets/NoImageAccount.png`,
        { encoding: "base64" }
      )}`,
      password: await encryptPassword("fullstack"),
      googleId: "",
    },
    {
      _id: idUsuario7,
      idCompeticion: [],
      idPartido: [],
      nombre: "Xavier",
      apellidos: "Rodriguez Batllo",
      email: "xrodriguez@gmail.com",
      telefono: "6939281378",
      movil: "734987321",
      username: "xavier23",
      direccion: "Carrer Marc Feixes",
      codigoPostal: 28200,
      ciudad: "Igualada",
      provincia: "Lleida",
      imagenPerfil: `data:image/png;base64, ${fs.readFileSync(
        `./src/assets/NoImageAccount.png`,
        { encoding: "base64" }
      )}`,
      password: await encryptPassword("fullstack"),
      googleId: "",
    },
    {
      _id: idUsuario8,
      idCompeticion: [],
      idPartido: [],
      nombre: "Marc",
      apellidos: "Ochoa Puig",
      email: "marc.ochoa@gmail.com",
      telefono: "667439201",
      movil: "694987321",
      username: "marcop",
      direccion: "Carrer del Carme",
      codigoPostal: 12000,
      ciudad: "Girona",
      provincia: "Girona",
      imagenPerfil: `data:image/png;base64, ${fs.readFileSync(
        `./src/assets/NoImageAccount.png`,
        { encoding: "base64" }
      )}`,
      password: await encryptPassword("fullstack"),
      googleId: "",
    },
  ]);
}
