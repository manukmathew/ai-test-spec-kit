import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Welcome</h1>
      <p>
        <Link to="/manage-users">Go to User Management</Link>
      </p>
    </div>
  );
}

export default Home;
