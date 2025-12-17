import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import EquipmentTable from './components/EquipmentTable';
import EquipmentForm from './components/EquipmentForm';
import * as api from './services/api';

function App() {
  const [equipment, setEquipment] = useState([]);
  const [editingEquipment, setEditingEquipment] = useState(null);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isLoading, setIsLoading] = useState(true);

  // Fetch equipment on component mount
  useEffect(() => {
    fetchEquipment();
  }, []);

  const fetchEquipment = async () => {
    try {
      setIsLoading(true);
      const data = await api.getEquipment();
      setEquipment(data);
    } catch (error) {
      showMessage('Failed to load equipment. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => {
      setMessage({ text: '', type: '' });
    }, 5000);
  };

  const handleAdd = async (formData) => {
    try {
      await api.createEquipment(formData);
      showMessage('Equipment added successfully!', 'success');
      await fetchEquipment();
    } catch (error) {
      showMessage(error.message || 'Failed to add equipment', 'error');
      throw error;
    }
  };

  const handleEdit = (equipmentItem) => {
    setEditingEquipment(equipmentItem);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdate = async (formData) => {
    try {
      await api.updateEquipment(editingEquipment.id, formData);
      showMessage('Equipment updated successfully!', 'success');
      setEditingEquipment(null);
      await fetchEquipment();
    } catch (error) {
      showMessage(error.message || 'Failed to update equipment', 'error');
      throw error;
    }
  };

  const handleDelete = async (id) => {
    const equipmentItem = equipment.find(item => item.id === id);
    const confirmMessage = `Are you sure you want to delete "${equipmentItem?.name}"?`;
    
    if (window.confirm(confirmMessage)) {
      try {
        await api.deleteEquipment(id);
        showMessage('Equipment deleted successfully!', 'success');
        await fetchEquipment();
      } catch (error) {
        showMessage(error.message || 'Failed to delete equipment', 'error');
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingEquipment(null);
  };

  const handleFormSubmit = async (formData) => {
    if (editingEquipment) {
      await handleUpdate(formData);
    } else {
      await handleAdd(formData);
    }
  };

  return (
    <div className="app">
      <Header />
      
      <main className="main-content">
        {message.text && (
          <div className={`message message-${message.type}`}>
            {message.text}
          </div>
        )}

        <EquipmentForm
          equipment={editingEquipment}
          onSubmit={handleFormSubmit}
          onCancel={handleCancelEdit}
        />

        <section className="equipment-section">
          <h2>Equipment List</h2>
          {isLoading ? (
            <div className="loading">Loading equipment...</div>
          ) : (
            <EquipmentTable
              equipment={equipment}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </section>
      </main>
    </div>
  );
}

export default App;

