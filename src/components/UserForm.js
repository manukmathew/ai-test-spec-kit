import React, { useState, useEffect } from 'react';

// Props:
//  initialData: { name, email, id? } (optional)
//  onSubmit: (user) => Promise or void
//  onCancel: () => void (optional)
//  submitting: boolean

function UserForm({ initialData = { name: '', email: '' }, onSubmit, onCancel, submitting }) {
  const [name, setName] = useState(initialData.name);
  const [email, setEmail] = useState(initialData.email);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setName(initialData.name);
    setEmail(initialData.email);
    setErrors({});
  }, [initialData]);

  const validate = () => {
    const errs = {};
    if (!name.trim()) errs.name = 'Name is required';
    // simple email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) errs.email = 'Email is required';
    else if (!emailRegex.test(email)) errs.email = 'Email is invalid';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!validate()) return;
    const user = { name: name.trim(), email: email.trim() };
    if (initialData.id) user.id = initialData.id;
    onSubmit && onSubmit(user);
  };

  return (
    <form onSubmit={handleSubmit} aria-busy={submitting ? 'true' : 'false'}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          disabled={submitting}
        />
        {errors.name && <span role="alert" style={{ color: 'red' }}>{errors.name}</span>}
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          disabled={submitting}
        />
        {errors.email && <span role="alert" style={{ color: 'red' }}>{errors.email}</span>}
      </div>
      <div>
        <button type="submit" disabled={submitting}>
          {initialData.id ? 'Update' : 'Add'} User
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} disabled={submitting} style={{ marginLeft: '8px' }}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default React.memo(UserForm);
