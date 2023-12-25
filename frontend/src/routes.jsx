import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Project from './pages/projects';

export default function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={Project} />
        <Route path="projects/*" Component={Project} />
        <Route path="invites/*" Component={Project} />
      </Routes>
    </Router>
  );
}
