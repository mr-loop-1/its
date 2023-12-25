import react from 'react';
import ProjectListBar from '../../components/listbars/projectListBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Bugs from '../../components/projects/bugs';

function Hi() {
  return <h1>qwerty</h1>;
}

export default function Project() {
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
      asdqewq
      <ProjectListBar contents={contents} />
      <Routes>
        <Route path="/:projectId" Component={Bugs} />
      </Routes>
    </>
  );
}
