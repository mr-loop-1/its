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
import AssignBug from '@/components/bugs/assignBug';
import { ReloadIcon } from '@radix-ui/react-icons';
import Deletebug from '@/components/bugs/deleteBug';
import EditBug from '@/components/bugs/editBug';
import Stream from '@/components/stream';
import BugMain from '@/components/bugs';
import ChangeProgress from '@/components/bugs/changeStatus';
const backendURL = 'http://127.0.0.1:5000';

export default function Bug() {
  const [bug, setBug] = useState([]);
  const [refetch, toggleFetch] = useState(false);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    setLoading(() => true);
    try {
      (async () => {
        const data = await axios.get(`${backendURL}/bugs/${params.bugId}`, {
          headers: {
            Authorization: 'Bearer:' + localStorage.getItem('token'),
          },
        });
        console.log('🚀 ~ file: bug.jsx:30 ~ data.data:', data.data);
        setBug(() => data.data);
        setLoading(() => false);
      })();
    } catch (err) {
      console.log('🚀 ~ file: bug.jsx:31 ~ useEffect ~ err:', err);
      console.log('no bugs found');
    }
  }, [refetch]);

  return (
    <>
      {loading ? (
        // <ReloadIcon className=" h-40 w-40 animate-spin" />
        <></>
      ) : (
        <div className="ml-16 px-8 md:px-20 mt-10 pb-96">
          <BugMain bug={bug} />

          <div className=".assign&status flex">
            <AssignBug
              bugId={bug.id}
              currentAssigned={bug.assignedTo}
              projectUsers={bug.project.members}
              refetch={refetch}
              toggleRefetch={toggleFetch}
            />
            <ChangeProgress
              bugId={bug.id}
              currentStatus={bug.progress}
              refetch={refetch}
              toggleRefetch={toggleFetch}
            />
          </div>

          <Stream stream={bug.stream} bugId={bug.id} />
        </div>
      )}
    </>
  );
}
