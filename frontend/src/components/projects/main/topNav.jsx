import { Pencil2Icon, TrashIcon } from '@radix-ui/react-icons';
import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

export default function ProjectTopNav({ title, id }) {
  return (
    <div className="w-full">
      <div className="text-gray-500 text-sm">
        Projects /<Link to={`/projects/${id}`}>{title}</Link>
      </div>
      <div className="w-full text-4xl font-bold leading-tight flex">
        <span>{title}</span>
        <Pencil2Icon className="ml-auto w-7 h-7 cursor-pointer" />
        <TrashIcon className="w-7 h-7 ml-5 text-red-700 cursor-pointer" />
      </div>
    </div>
  );
}
