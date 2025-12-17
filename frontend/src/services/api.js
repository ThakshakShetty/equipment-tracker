const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Get all equipment
export const getEquipment = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/equipment`);
    if (!response.ok) {
      throw new Error('Failed to fetch equipment');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

// Create new equipment
export const createEquipment = async (equipmentData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/equipment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(equipmentData),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create equipment');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

// Update equipment
export const updateEquipment = async (id, equipmentData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/equipment/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(equipmentData),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to update equipment');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

// Delete equipment
export const deleteEquipment = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/equipment/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to delete equipment');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

