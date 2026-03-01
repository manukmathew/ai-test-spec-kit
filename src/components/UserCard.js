import React from 'react';

// Reusable card for a single user
// Props: user, onEdit, onDelete
function UserCard({ user, onEdit, onDelete }) {
  return (
    <div className="user-card" style={{ border: '1px solid #ccc', padding: '8px', borderRadius: '4px', marginBottom: '8px' }}>
      <div>
        <strong>{user.name}</strong> ({user.email})
      </div>
      <div style={{ marginTop: '4px' }}>
        <button onClick={() => onEdit(user)} aria-label={`Edit ${user.name}`}>Edit</button>{' '}
        <button onClick={() => onDelete(user)} aria-label={`Delete ${user.name}`}>Delete</button>
      </div>
    </div>
  );
}

export default React.memo(UserCard);
