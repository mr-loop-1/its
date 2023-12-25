import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Project from './pages/projects';

export default function Routing() {
  return (
    <Router>
      {/* <Switch> */}
      <Routes>
        <Route path="stream" Component={Project} />
        <Route path="projects/*" Component={Project} />
        <Route path="invites/*" Component={Project} />
        {/* <Route path="projects" Component={Project} /> */}
      </Routes>
      {/* </Switch> */}
    </Router>
  );
}
