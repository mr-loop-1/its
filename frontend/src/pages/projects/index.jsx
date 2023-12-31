import react, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import ProjectNavbar from './../../components/projects/index.jsx';
import { getProjects } from 'api/projects';
import clsx from 'clsx';
import ProjectNavbarMobile from '@/components/projects/mobile/index.jsx';

export default function Project() {
  const [projects, setProjects] = useState([]);
  const [refetch, toggleFetch] = useState(false);
  const location = useLocation();

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
      <div className="hidden md:block" id="large-screen">
        <ProjectNavbar
          refetch={refetch}
          toggleRefetch={toggleFetch}
          projects={projects}
        />
      </div>
      <div
        id="small-screen"
        className={clsx(
          'block md:hidden',
          !/^\/projects?[^/]*$/.test(location.pathname) && 'hidden',
        )}
      >
        <ProjectNavbarMobile
          refetch={refetch}
          toggleRefetch={toggleFetch}
          projects={projects}
        />
      </div>
      <Outlet />
    </>
  );
}
