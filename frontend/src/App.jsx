import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Project from './pages/projects';
import Register from './pages/auth/register';
import Login from './pages/auth/login';
import RouteGuard from './guard/route';
import Sidebar from './components/sidebar';
import Invites from './pages/invites';

function App() {
  return (
    <>
      {/* <Sidebar /> */}
      <Router>
        <Sidebar />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route element={<RouteGuard />}>
            <Route path="/invites" element={<Invites />} />
            <Route path="/projects/*" element={<Project />} />
            <Route path="/invites/*" element={<Project />} />
            <Route path="/bugs" element={<Project />}>
              <Route path="/bugs/:bugId" element={<Project />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
