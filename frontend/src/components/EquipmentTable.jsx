import React from 'react';

const EquipmentTable = ({ equipment, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusClass = (status) => {
    const statusMap = {
      'Active': 'status-active',
      'Inactive': 'status-inactive',
      'Under Maintenance': 'status-maintenance'
    };
    return statusMap[status] || '';
  };

  if (equipment.length === 0) {
    return (
      <div className="empty-state">
        <p>No equipment records found. Add your first equipment to get started!</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="equipment-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Status</th>
            <th>Last Cleaned Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {equipment.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.type}</td>
              <td>
                <span className={`status-badge ${getStatusClass(item.status)}`}>
                  {item.status}
                </span>
              </td>
              <td>{formatDate(item.lastCleanedDate)}</td>
              <td>
                <div className="action-buttons">
                  <button
                    className="btn btn-edit"
                    onClick={() => onEdit(item)}
                    aria-label={`Edit ${item.name}`}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-delete"
                    onClick={() => onDelete(item.id)}
                    aria-label={`Delete ${item.name}`}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EquipmentTable;

