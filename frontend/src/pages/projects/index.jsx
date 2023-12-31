import react, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Button } from './../../components/ui/button';
import ProjectNavbar from './../../components/projects/navbar/index.jsx';
import axios from 'axios';
import ProjectMain from '@/components/projects/main';
import { getProjects } from 'api/projects';
const backendURL = 'http://127.0.0.1:5000';

function Hi() {
  return <h1>qwerty</h1>;
}

export default function Project() {
  const [projects, setProjects] = useState([]);
  const [refetch, toggleFetch] = useState(false);

  useEffect(() => {
    try {
      (async () => {
        const data = await getProjects(localStorage.getItem('token'));
        setProjects(() => data.data);
      })();
    } catch (err) {
      console.log('🚀 ~ file: index.jsx:30 ~ useEffect ~ err:', err);
    }
  }, [refetch]);

  return (
    <>
      <ProjectNavbar
        refetch={refetch}
        toggleRefetch={toggleFetch}
        projects={projects}
      />
      <Routes>
        <Route path="/:projectId" Component={ProjectMain} />
      </Routes>
    </>
  );
}
