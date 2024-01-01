import { Pencil2Icon, TrashIcon } from '@radix-ui/react-icons';
import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import EditProject from './edit';
import DeleteProject from './delete';
import { useSelector } from 'react-redux';

export default function ProjectHeader({
  title,
  id,
  refetch,
  project,
  toggleRefetch,
}) {
  const user = useSelector((state) => state.auth.userInfo);

  const userStatus =
    project.admin.id == user.id
      ? 'ADMIN'
      : project.manager.id == user.id
      ? 'MANAGER'
      : 'MEMBER';

  return (
    <div className="w-full">
      <div className="text-gray-500 text-sm">
        Projects /<Link to={`/projects/${id}`}>{title}</Link>
      </div>
      <div className="w-full text-4xl font-bold leading-tight flex">
        <span>{title}</span>
        {userStatus == 'ADMIN' && (
          <>
            <EditProject
              refetch={refetch}
              toggleRefetch={toggleRefetch}
              project={project}
            />
            <DeleteProject project={project} />
          </>
        )}
      </div>
      <div className="mt-5 text-sm text-gray-600">
        You are{' '}
        {(userStatus == 'ADMIN' && 'the admin. You have all the rights.') ||
          (userStatus == 'MANAGER' &&
            'the manager. You cannot edit, delete details and change manager in the project.') ||
          'a member. You only have bug related permissions.'}
      </div>
    </div>
  );
}
