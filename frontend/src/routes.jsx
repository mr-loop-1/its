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
        <Route path="/register" Component={Register} />
        <Route path="/login" Component={Login} />
        <Route element={<RouteGuard />}>
          <Route path="projects/*" Component={Project} />
          <Route path="invites/*" Component={Project} />
        </Route>
      </Routes>
    </Router>
  );
}
