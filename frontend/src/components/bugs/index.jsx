import React from 'react';
import { Link } from 'react-router-dom';
import { Textarea } from './ui';
import EditBug from './editBug';
import Deletebug from './deleteBug';

export default function BugMain({ bug }) {
  return (
    <>
      <div className="text-sm text-gray-600">
        <Link
          className="hover:underline md:hover:underline"
          to={`/projects/${bug.project.id}`}
        >
          {bug.project.title}
        </Link>
        &nbsp;/&nbsp;
        <Link
          className="hover:underline md:hover:underline"
          to={`/bugs/${bug.id}`}
        >
          {bug.title}
        </Link>
      </div>

      <header className="mt-5">
        <div className="text-3xl tracking-tight font-bold flex">
          {bug.title}
          <EditBug bug={bug} />
          <Deletebug bug={bug} />
        </div>
        <Textarea
          value={bug.description}
          readonly
          className="border-none mt-5"
        />
      </header>
      <main>
        <div className="">Created By</div>
        <span className="">
          <img
            src={`/profile/${bug.createdBy.slug}.svg`}
            className="w-10 h-10 inline"
          />
          <span className="ml-2">{bug.createdBy.name}</span>
        </span>
        <div className="">Root commit</div>
        <span className="">
          <span className="ml-2">#hgas6hq32h3</span>
        </span>
      </main>
    </>
  );
}
