import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';

const ManageUsers = lazy(() => import('./pages/ManageUsers'));

function App() {
  return (
    <Router>
      <nav style={{ padding: '8px', borderBottom: '1px solid #ccc' }}>
        <Link to="/" style={{ marginRight: '8px' }}>
          Home
        </Link>
        <Link to="/manage-users">Manage Users</Link>
      </nav>
      <main style={{ padding: '16px' }}>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/manage-users" element={<ManageUsers />} />
          </Routes>
        </Suspense>
      </main>
    </Router>
  );
}

export default App;
