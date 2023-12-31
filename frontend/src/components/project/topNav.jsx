import { Pencil2Icon, TrashIcon } from '@radix-ui/react-icons';
import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import EditProject from './edit';
import DeleteProject from './delete';

export default function ProjectTopNav({
  title,
  id,
  refetch,
  project,
  toggleRefetch,
}) {
  return (
    <div className="w-full">
      <div className="text-gray-500 text-sm">
        Projects /<Link to={`/projects/${id}`}>{title}</Link>
      </div>
      <div className="w-full text-4xl font-bold leading-tight flex">
        <span>{title}</span>
        <EditProject
          refetch={refetch}
          toggleRefetch={toggleRefetch}
          project={project}
        />
        <DeleteProject project={project} />
      </div>
    </div>
  );
}
