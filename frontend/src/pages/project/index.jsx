import React, { useEffect, useState } from 'react';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useParams } from 'react-router-dom';
import CreateBug from '@/components/bugs/create';
import { getProject } from 'api/projects';
import ProjectHeader from '@/components/project/header';
import ProjectPeople from '@/components/project/people';
import BugsList from '@/components/project/bugs';
import { useSelector } from 'react-redux';
import ProjectCommits from '@/components/commits/commits';
import { useOutletContext } from 'react-router-dom';

export default function Project() {
  const [isLoading, setIsLoading] = useState(true);
  const [refetch, toggleRefetch] = useState(false);
  const [project, setProject] = useState(null);
  const [refetchParent, toggleRefetchParent] = useOutletContext();

  const { projectId } = useParams();
  console.log('🚀 ~ file: index.jsx:16 ~ Project ~ projectId:', projectId);
  useEffect(() => {
    console.log('here,.............................................');
    // setIsLoading(() => true);
    try {
      (async () => {
        const data = await getProject(localStorage.getItem('token'), projectId);
        setProject(() => data.data);
        setIsLoading(() => false);
      })();
    } catch (err) {
      console.log('🚀 ~ file: index.jsx:31 ~ useEffect ~ err:', err);
    }
  }, [refetch, projectId]);

  return (
    //! very imp right-0
    <div className="ml-16 md:ml-72 lg:ml-[22rem]">
      {isLoading ? (
        <ReloadIcon className=" h-16 w-16 animate-spin" />
      ) : (
        project && (
          <div className="mx-5 mt-8 flex flex-col">
            <ProjectHeader
              title={project.title}
              id={project.id}
              project={project}
              refetch={refetch}
              setProject={setProject}
              toggleRefetch={toggleRefetch}
              toggleRefetchParent={toggleRefetchParent}
              refetchParent={refetchParent}
            />

            <ProjectPeople
              project={project}
              refetch={refetch}
              toggleRefetch={toggleRefetch}
            />
            {project.isGithub ? (
              <ProjectCommits project={project} />
            ) : (
              <div className="mt-5 text-sm text-gray-700">
                No commit stats to show
              </div>
            )}

            <BugsList
              bugs={project.bugs}
              project={project}
              refetch={refetch}
              toggleRefetch={toggleRefetch}
            />
          </div>
        )
      )}
    </div>
  );
}
