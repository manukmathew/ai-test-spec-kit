import React, { useEffect, useState } from 'react';
import UserForm from '../components/UserForm';
import UserList from '../components/UserList';
import { getUsers, createUser, updateUser, deleteUser } from '../services/userService';

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(null); // user being edited
  const [submitting, setSubmitting] = useState(false);

  const fetchUsers = () => {
    setLoading(true);
    setError(null);
    getUsers()
      .then(data => setUsers(data))
      .catch(err => setError('Failed to load users'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAdd = user => {
    setSubmitting(true);
    createUser(user)
      .then(() => {
        fetchUsers();
        setEditing(null);
      })
      .catch(() => setError('Failed to create user'))
      .finally(() => setSubmitting(false));
  };

  const handleUpdate = user => {
    setSubmitting(true);
    updateUser(user.id, user)
      .then(() => {
        fetchUsers();
        setEditing(null);
      })
      .catch(() => setError('Failed to update user'))
      .finally(() => setSubmitting(false));
  };

  const handleDelete = user => {
    if (!window.confirm(`Delete ${user.name}?`)) return;
    deleteUser(user.id)
      .then(() => fetchUsers())
      .catch(() => setError('Failed to delete user'));
  };

  const onSubmit = user => {
    if (user.id) return handleUpdate(user);
    return handleAdd(user);
  };

  return (
    <div>
      <h1>Manage Users</h1>
      {error && <div role="alert" style={{ color: 'red' }}>{error}</div>}
      <UserForm
        initialData={editing || { name: '', email: '' }}
        onSubmit={onSubmit}
        onCancel={() => setEditing(null)}
        submitting={submitting}
      />

      {loading ? (
        <p>Loading users...</p>
      ) : (
        <UserList
          users={users}
          onEdit={user => setEditing(user)}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default ManageUsers;
