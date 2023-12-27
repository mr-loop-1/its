import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import ProjectHeader from './topNav';
import { ReloadIcon } from '@radix-ui/react-icons';
import ProjectTopNav from './topNav';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const backendURL = 'http://127.0.0.1:5000';

export default function ProjectMain() {
  const [isLoading, setIsLoading] = useState(true);
  const [refetch, toggleFetch] = useState(false);
  const [project, setProject] = useState({ title: null });

  const { projectId } = useParams();
  useEffect(() => {
    try {
      (async () => {
        console.log('🚀 ~ file: index.jsx:19 ~ projectId:', projectId);
        const data = await axios.get(`${backendURL}/projects/${projectId}`, {
          headers: {
            Authorization: 'Bearer:' + localStorage.getItem('token'),
          },
        });
        console.log('🚀 ~ file: index.jsx:22 ~ data:', data);

        setProject(() => data.data);
        setIsLoading(() => false);
      })();
    } catch (err) {
      console.log('something wrong');
    }
  }, [refetch]);

  return (
    <div className="left-72 lg:left-[448px] fixed flex flex-col items-center mt-8 mx-8 lg:mx-16">
      {isLoading ? (
        <ReloadIcon className=" h-40 w-40 animate-spin" />
      ) : (
        <>
          <ProjectTopNav title={project.title} />
          {/* <ProjectHeader project={project} /> */}
        </>
      )}
    </div>
  );
}
