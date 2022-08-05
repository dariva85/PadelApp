const Partido = require("./partido.model");
const Competicion = require("../competiciones/competicion.model");
const Usuario = require("../../usuarios/usuario.model");

const createOne = async (req, res) => {
  try {
    const newMatch = req.body;
    const doc = await Partido.create(newMatch);
    res.status(200).json({ results: [doc] });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Creation failed" });
  }
};

const updateOne = async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await Partido.findOneAndUpdate({ _id: id }, req.body, {
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

const findOne = async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await Partido.findOne({ _id: id });
    if (!doc) {
      return res.status(404).json({ error: "Not found" });
    }
    res.status(200).json({ results: [doc] });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Cannot get match" });
  }
};

const deleteOne = async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await Partido.findOneAndDelete({ _id: id }, { new: true });
    if (!doc) {
      return res.status(404).json({ error: "Not found" });
    }
    res.status(200).json({ results: [doc] });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Cannot delete" });
  }
};

const findAllofOneCompetition = async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await Competicion.find({ partido: id }).lean().exec();
    if (!doc) {
      return res.status(404).json({ error: "Not found" });
    }
    res.status(200).json({ results: [doc] });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Cannot get matches" });
  }
};

const findAllofOneUser = async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await Usuario.find({ partido: id }).lean().exec();
    if (!doc) {
      return res.status(404).json({ error: "Not found" });
    }
    res.status(200).json({ results: [doc] });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Cannot get matches" });
  }
};

module.exports = {
  createOne,
  updateOne,
  findOne,
  deleteOne,
  findAllofOneCompetition,
  findAllofOneUser,
};
