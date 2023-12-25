import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Sidebar from './components/sidebar';
import ListBar from './components/listBar';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>asd</h1>
      <Sidebar />
      <ListBar />
    </>
  );
}

export default App;
