import react, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import ProjectNavbar from './../../components/projects/index.jsx';
import { getProjects } from 'api/projects';
import clsx from 'clsx';
import ProjectNavbarMobile from '@/components/projects/mobile/index.jsx';
import LandingPage from '@/components/projects/landing.jsx';

export default function Projects() {
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [refetch, toggleRefetch] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(() => true);
    try {
      (async () => {
        const data = await getProjects(localStorage.getItem('token'));
        setProjects(() => data.data);
        setIsLoading(() => false);
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
          toggleRefetch={toggleRefetch}
          projects={projects}
          loading={isLoading}
        />
        <LandingPage length={projects.length} />
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
          toggleRefetch={toggleRefetch}
          projects={projects}
          loading={isLoading}
        />
      </div>
      <Outlet />
    </>
  );
}
