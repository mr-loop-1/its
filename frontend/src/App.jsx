import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Projects from './pages/projects';
import Register from './pages/auth/register';
import Login from './pages/auth/login';
import RouteGuard from './guard/route';
import Sidebar from './components/sidebar';
import Info from './pages/invites';
import Bug from './pages/bugs/bug';

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
            <Route path="/invites" element={<Info />} />
            <Route path="/projects/*" element={<Projects />} />
            <Route path="/invites/*" element={<Projects />} />
            <Route path="/bugs/:bugId" element={<Bug />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
