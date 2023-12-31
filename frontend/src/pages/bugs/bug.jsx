import react, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useParams,
} from 'react-router-dom';
import { Button } from './../../components/ui/button';
import axios from 'axios';
import ProjectMain from '@/components/projects/main';
const backendURL = 'http://127.0.0.1:5000';

export default function Bug() {
  const [bug, setBug] = useState([]);
  const [refetch, toggleFetch] = useState(false);
  const params = useParams();

  useEffect(() => {
    try {
      (async () => {
        const data = await axios.get(`${backendURL}/bugs/${params.bugId}`, {
          headers: {
            Authorization: 'Bearer:' + localStorage.getItem('token'),
          },
        });
        console.log('🚀 ~ file: bug.jsx:30 ~ data.data:', data.data);
        setBug(() => data.data);
      })();
    } catch (err) {
      console.log('🚀 ~ file: bug.jsx:31 ~ useEffect ~ err:', err);
      console.log('no bugs found');
    }
  }, [refetch]);

  console.log('bug............', bug);

  return (
    <>
      <div className="left-16 right-0 fixed px-20 pt-10">
        <div className=".header flex items-center">
          <Button className="">Back </Button>
          <h1 className="mx-auto">Bug</h1>
        </div>
        <span className="">{bug.title}</span>
      </div>
    </>
  );
}
