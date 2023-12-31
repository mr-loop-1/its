import React, { useEffect, useState } from 'react';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useParams } from 'react-router-dom';
import CreateBug from '@/components/bugs/create';
import { getProject } from 'api/projects';
import ProjectHeader from '@/components/project/header';
import ProjectPeople from '@/components/project/people';
import BugsList from '@/components/project/bugs';

export default function Project() {
  const [isLoading, setIsLoading] = useState(true);
  const [refetch, toggleRefetch] = useState(false);
  const [project, setProject] = useState({ title: null });

  const { projectId } = useParams();
  useEffect(() => {
    setIsLoading(() => true);
    try {
      (async () => {
        const data = await getProject(localStorage.getItem('token'), projectId);
        setProject(() => data.data);
        setIsLoading(() => false);
      })();
    } catch (err) {
      console.log('🚀 ~ file: index.jsx:31 ~ useEffect ~ err:', err);
    }
  }, [refetch]);

  return (
    //! very imp right-0
    <div className="ml-16 md:ml-72 lg:ml-[22rem]">
      {isLoading ? (
        <ReloadIcon className=" h-16 w-16 animate-spin" />
      ) : (
        <div className="mx-5 mt-8 flex flex-col">
          <ProjectHeader
            title={project.title}
            id={project.id}
            project={project}
            refetch={refetch}
            toggleRefetch={toggleRefetch}
          />
          <ProjectPeople project={project} />
          <BugsList bugs={project.bugs} />
        </div>
      )}
    </div>
  );
}
