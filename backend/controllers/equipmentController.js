const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '../data/equipment.json');

// Helper function to read equipment data
const readEquipmentData = () => {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

// Helper function to write equipment data
const writeEquipmentData = (data) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

// Get all equipment
const getAllEquipment = (req, res) => {
  try {
    const equipment = readEquipmentData();
    res.status(200).json(equipment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch equipment' });
  }
};

// Create new equipment
const createEquipment = (req, res) => {
  try {
    const { name, type, status, lastCleanedDate } = req.body;

    // Validation
    if (!name || !type || !status || !lastCleanedDate) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const validTypes = ['Machine', 'Vessel', 'Tank', 'Mixer'];
    if (!validTypes.includes(type)) {
      return res.status(400).json({ error: 'Invalid equipment type' });
    }

    const validStatuses = ['Active', 'Inactive', 'Under Maintenance'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const equipment = readEquipmentData();
    const newEquipment = {
      id: Date.now().toString(),
      name: name.trim(),
      type,
      status,
      lastCleanedDate
    };

    equipment.push(newEquipment);
    writeEquipmentData(equipment);

    res.status(201).json(newEquipment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create equipment' });
  }
};

// Update equipment
const updateEquipment = (req, res) => {
  try {
    const { id } = req.params;
    const { name, type, status, lastCleanedDate } = req.body;

    // Validation
    if (!name || !type || !status || !lastCleanedDate) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const validTypes = ['Machine', 'Vessel', 'Tank', 'Mixer'];
    if (!validTypes.includes(type)) {
      return res.status(400).json({ error: 'Invalid equipment type' });
    }

    const validStatuses = ['Active', 'Inactive', 'Under Maintenance'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const equipment = readEquipmentData();
    const index = equipment.findIndex(item => item.id === id);

    if (index === -1) {
      return res.status(404).json({ error: 'Equipment not found' });
    }

    equipment[index] = {
      id,
      name: name.trim(),
      type,
      status,
      lastCleanedDate
    };

    writeEquipmentData(equipment);

    res.status(200).json(equipment[index]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update equipment' });
  }
};

// Delete equipment
const deleteEquipment = (req, res) => {
  try {
    const { id } = req.params;
    const equipment = readEquipmentData();
    const index = equipment.findIndex(item => item.id === id);

    if (index === -1) {
      return res.status(404).json({ error: 'Equipment not found' });
    }

    equipment.splice(index, 1);
    writeEquipmentData(equipment);

    res.status(200).json({ message: 'Equipment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete equipment' });
  }
};

module.exports = {
  getAllEquipment,
  createEquipment,
  updateEquipment,
  deleteEquipment
};

