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
  const db = client.db("Padel");

  console.log("Inserting Users");
  const users = await db.collection("usuario").insertMany([
    {
      _id: mongodb.ObjectId("62adf55dd1d8cd0272ddab9b"),
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
      _id: mongodb.ObjectId("62adf55dd1d8cd0272ddab9c"),
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
      _id: mongodb.ObjectId("62adf55dd1d8cd0272ddab9d"),
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
      _id: mongodb.ObjectId("62adf55dd1d8cd0272ddab9e"),
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

  const competitions = await db.collection("competicion").insertMany([
    {
      idUsuario: [
        mongodb.ObjectId("62adf55dd1d8cd0272ddab9b"),
        mongodb.ObjectId("62adf55dd1d8cd0272ddab9c"),
        mongodb.ObjectId("62adf55dd1d8cd0272ddab9d"),
        mongodb.ObjectId("62adf55dd1d8cd0272ddab9e"),
      ],
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
      idUsuario: [
        mongodb.ObjectId("62adf55dd1d8cd0272ddab9b"),
        mongodb.ObjectId("62adf55dd1d8cd0272ddab9c"),
      ],
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
      idUsuario: [
        mongodb.ObjectId("62adf55dd1d8cd0272ddab9d"),
        mongodb.ObjectId("62adf55dd1d8cd0272ddab9e"),
      ],
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

  console.log("The database was started without any problems.");
  client.close();
}

main();
