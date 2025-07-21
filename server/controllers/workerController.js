const Worker = require('../models/Worker');

exports.createWorker = async (req, res) => {
  try {
    const worker = await Worker.create(req.body);
    res.status(201).json(worker);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getWorkers = async (req, res) => {
  const { skill, county } = req.query;
  const filters = {};
  if (skill) filters.skill = skill;
  if (county) filters.county = county;

  const workers = await Worker.find(filters).populate('reviews');
  res.json(workers);
};

exports.getWorkerById = async (req, res) => {
  const worker = await Worker.findById(req.params.id).populate('reviews');
  if (!worker) return res.status(404).json({ error: 'Worker not found' });
  res.json(worker);
};

exports.updateWorker = async (req, res) => {
  const updated = await Worker.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.deleteWorker = async (req, res) => {
  await Worker.findByIdAndDelete(req.params.id);
  res.json({ message: 'Worker deleted' });
};
