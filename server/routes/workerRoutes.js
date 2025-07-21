const express = require('express');
const router = express.Router();
const {
  createWorker,
  getWorkers,
  getWorkerById,
  updateWorker,
  deleteWorker
} = require('../controllers/workerController');

const { authMiddleware } = require('../middleware/authMiddleware');

router.get('/', getWorkers);
router.get('/:id', getWorkerById);
router.post('/', authMiddleware, createWorker);
router.put('/:id', authMiddleware, updateWorker);
router.delete('/:id', authMiddleware, deleteWorker);

module.exports = router;
