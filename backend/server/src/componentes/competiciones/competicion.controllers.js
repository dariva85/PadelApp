const Competicion = require("./competicion.model");
const Usuario = require("../usuarios/usuario.model");
const Partido = require("../partidos/partido.model");

const createOne = async (req, res) => {
  try {
    const newCompetition = req.body;
    const doc = await Competicion.create(newCompetition);
    res.status(200).json({ results: [doc] });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Creation failed" });
  }
};

const updateOne = async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await Competicion.findOneAndUpdate({ _id: id }, req.body, {
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
    const doc = await Competicion.findOne({ _id: id });
    if (!doc) {
      return res.status(404).json({ error: "Not found" });
    }
    res.status(200).json({ results: [doc] });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Cannot get competition" });
  }
};

const deleteOne = async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await Competicion.findOneAndDelete({ _id: id }, { new: true });
    if (!doc) {
      return res.status(404).json({ error: "Not found" });
    }
    res.status(200).json({ results: [doc] });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Cannot delete" });
  }
};

const findAllofOneUser = async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await Usuario.find({ competicion: id }).lean().exec();
    if (!doc) {
      return res.status(404).json({ error: "Not found" });
    }
    res.status(200).json({ results: [doc] });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Cannot get competitions" });
  }
};

const findAllofOneMatch = async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await Partido.find({ competicion: id }).lean().exec();
    if (!doc) {
      return res.status(404).json({ error: "Not found" });
    }
    res.status(200).json({ results: [doc] });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Cannot get competitions" });
  }
};

module.exports = {
  createOne,
  updateOne,
  findOne,
  deleteOne,
  findAllofOneUser,
  findAllofOneMatch,
};
