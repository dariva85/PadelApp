const Usuario = require("./usuario.model.js");
const Competicion = require("../competiciones/competicion.model");
const Partido = require("../partidos/partido.model");

//Checked
const createOne = async (req, res) => {
  try {
    const newUser = req.body;
    console.log(newUser);
    console.log(req.params);
    const doc = await Usuario.create(newUser);
    res.status(200).json({ results: [doc] });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Creation failed" });
  }
};

//Checked
const updateOne = async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await Usuario.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    if (!doc) {
      return res.status(404).json({ error: "Not found" });
    }
    return res.status(200).json({ results: doc });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Cannot update" });
  }
};

//Checked
const findOne = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const doc = await Usuario.findById(id).lean().exec();
    console.log(doc);
    if (!doc) {
      return res.status(404).json({ error: "Not found" });
    }
    res.status(200).json({ results: [doc] });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Cannot get user" });
  }
};

//Checked
const deleteOne = async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await Usuario.findOneAndDelete({ _id: id }, { new: true });
    if (!doc) {
      return res.status(404).json({ error: "Not found" });
    }
    res.status(200).json({ results: [doc] });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Cannot delete" });
  }
};

//Checked
const findAllofOneCompetition = async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await Competicion.find({ usuario: id }).lean().exec();
    if (!doc) {
      return res.status(404).json({ error: "Not found" });
    }
    res.status(200).json({ results: [doc] });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Cannot get users" });
  }
};

//Checked
const findAllofOneMatch = async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await Partido.find({ usuario: id }).lean().exec();
    if (!doc) {
      return res.status(404).json({ error: "Not found" });
    }
    res.status(200).json({ results: [doc] });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Cannot get users" });
  }
};

module.exports = {
  createOne,
  updateOne,
  findOne,
  deleteOne,
  findAllofOneCompetition,
  findAllofOneMatch,
};
