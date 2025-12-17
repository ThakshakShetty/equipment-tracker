const express = require('express');
const router = express.Router();
const {
  getAllEquipment,
  createEquipment,
  updateEquipment,
  deleteEquipment
} = require('../controllers/equipmentController');

// GET /api/equipment - Get all equipment
router.get('/', getAllEquipment);

// POST /api/equipment - Create new equipment
router.post('/', createEquipment);

// PUT /api/equipment/:id - Update equipment
router.put('/:id', updateEquipment);

// DELETE /api/equipment/:id - Delete equipment
router.delete('/:id', deleteEquipment);

module.exports = router;

