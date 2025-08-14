const Worker = require('../models/Worker');

// Create a new worker
exports.createWorker = async (req, res) => {
  try {
    const worker = await Worker.create(req.body);
    res.status(201).json(worker);
  } catch (err) {
    console.error('❌ Error creating worker:', err.message);
    res.status(400).json({ error: err.message });
  }
};

// Get all workers, with optional filtering by skill and county
exports.getWorkers = async (req, res) => {
  try {
    const { skill, county } = req.query;
    const filters = {};
    if (skill) filters.skill = skill;
    if (county) filters.county = county;

    const workers = await Worker.find(filters).populate('reviews');
    res.status(200).json(workers);
  } catch (err) {
    console.error('❌ Error fetching workers:', err.message);
    res.status(500).json({ error: 'Failed to fetch workers' });
  }
};

// Get a single worker by ID
exports.getWorkerById = async (req, res) => {
  try {
    const { id } = req.params;

    // Optional: Validate ObjectId length
    if (!id || id.length !== 24) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    const worker = await Worker.findById(id).populate('reviews');
    if (!worker) {
      return res.status(404).json({ error: 'Worker not found' });
    }

    res.status(200).json(worker);
  } catch (err) {
    console.error('❌ Error fetching worker by ID:', err.message);
    res.status(500).json({ error: 'Failed to fetch worker' });
  }
};

// Update a worker by ID
exports.updateWorker = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Worker.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ error: 'Worker not found for update' });
    }
    res.status(200).json(updated);
  } catch (err) {
    console.error('❌ Error updating worker:', err.message);
    res.status(500).json({ error: 'Failed to update worker' });
  }
};

// Delete a worker by ID
exports.deleteWorker = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Worker.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Worker not found for deletion' });
    }
    res.status(200).json({ message: 'Worker deleted successfully' });
  } catch (err) {
    console.error('❌ Error deleting worker:', err.message);
    res.status(500).json({ error: 'Failed to delete worker' });
  }
};
