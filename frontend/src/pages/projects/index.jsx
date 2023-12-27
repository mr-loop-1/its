import react, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Bugs from '../../components/projects/bugs';
import { Button } from './../../components/ui/button';
import ProjectSidebar from './../../components/projects/sidebar/index.jsx';
import axios from 'axios';
import ProjectMain from '@/components/projects/main';
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
        const data = await axios.get(`${backendURL}/projects`, {
          headers: {
            Authorization: 'Bearer:' + localStorage.getItem('token'),
          },
        });
        console.log('🚀 ~ file: index.jsx:22 ~ data:', data);

        setProjects(() => data.data);
      })();
    } catch (err) {
      console.log('🚀 ~ file: index.jsx:30 ~ useEffect ~ err:', err);
      console.log('no projects found');
    }
  }, [refetch]);

  const contents = [
    {
      id: '123',
      title: 'Kanban Board',
      role: 'member',
    },
    {
      id: '124',
      title: 'Board Jam',
      role: 'member',
    },
  ];

  const bugsList = [{}];

  return (
    <>
      <ProjectSidebar projects={projects} />
      <Routes>
        <Route path="/:projectId" Component={ProjectMain} />
      </Routes>
    </>
  );
}
