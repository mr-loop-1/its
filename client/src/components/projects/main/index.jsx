import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import ProjectHeader from './header';
import { ReloadIcon } from '@radix-ui/react-icons';
import ProjectTopNav from './topNav';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ProjectPeople from './people';
import BugsList from './bugs';

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
        setProject(() => data.data);
        setIsLoading(() => false);
      })();
    } catch (err) {
      console.log('something wrong');
    }
  }, [refetch]);

  return (
    //! very imp right-0
    <div className="fixed right-0 left-72 lg:left-[448px] mt-8 mx-8 pr-10 lg:mx-16 overflow-hidden ">
      {isLoading ? (
        <ReloadIcon className=" h-40 w-40 animate-spin" />
      ) : (
        <div className="w-full flex flex-col">
          <ProjectTopNav title={project.title} id={project.id} />
          <ProjectHeader project={project} />
          <ProjectPeople project={project} />
          <BugsList bugs={project.bugs} />
        </div>
      )}
    </div>
  );
}
