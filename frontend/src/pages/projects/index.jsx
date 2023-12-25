import react from 'react';
import ProjectListBar from '../../components/listbars/projectListBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function Hi() {
  return <h1>qwerty</h1>;
}

export default function Project() {
  const contents = [
    {
      id: '123',
      title: 'ASD',
      role: 'member',
    },
  ];

  const bugsList = [{}];

  return (
    <>
      asdqewq
      <ProjectListBar contents={contents} />
      <Routes>
        <Route path="123" Component={Hi} />
      </Routes>
    </>
  );
}
