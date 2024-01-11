import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Projects from './pages/projects';
import Register from './pages/auth/register';
import Login from './pages/auth/login';
import RouteGuard from './guard/route';
import Sidebar from './components/sidebar';
import Info from './pages/info';
import Bug from './pages/bugs/bug';
import Home from './pages/home';
import ProjectMain from './components/projects/main';
import Project from './pages/project';
import TopBar from './pages/topbar';
import GlobalRouteGuard from './guard/global';

function App() {
  return (
    <>
      {/* <Sidebar /> */}
      <Router>
        <TopBar />
        <Sidebar />
        <Routes>
          <Route element={<GlobalRouteGuard />}>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Route>
          <Route element={<RouteGuard />}>
            <Route path="/" element={<Home />} />
            <Route path="/invites" element={<Info />} />

            <Route path="/projects/*" element={<Projects />}>
              <Route path=":projectId" element={<Project />} />
            </Route>
            {/* <Route path="/invites" element={<Projects />} /> */}
            <Route path="/bugs/:bugId" element={<Bug />} />
            <Route path="/bugs" element={<Bug />} />
            <Route path="/info" element={<Info />} />
          </Route>
          {/* </Route> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
