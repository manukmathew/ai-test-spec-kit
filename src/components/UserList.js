import React from 'react';

// Props:
//  users: array of { id, name, email }
//  onEdit: (user) => void
//  onDelete: (user) => void
function UserList({ users = [], onEdit, onDelete }) {
  if (users.length === 0) {
    return <p>No users available.</p>;
  }

  return (
    <ul>
      {users.map(user => (
        <li key={user.id} style={{ marginBottom: '8px' }}>
          <strong>{user.name}</strong> ({user.email}){' '}
          <button onClick={() => onEdit(user)} aria-label={`Edit ${user.name}`}>
            Edit
          </button>{' '}
          <button onClick={() => onDelete(user)} aria-label={`Delete ${user.name}`}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

export default React.memo(UserList);
