import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Project from './pages/projects';
import Register from './pages/auth/register';
import Login from './pages/auth/login';
import RouteGuard from './guard/route';

export default function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route element={<RouteGuard />}>
          <Route path="/projects/*" element={<Project />} />
          <Route path="/invites/*" element={<Project />} />
          <Route path="/bugs" element={<Project />}>
            <Route path="/bugs/:bugId" element={<Project />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}
