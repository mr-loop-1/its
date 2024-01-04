import React from 'react';
import { Link } from 'react-router-dom';
import { Textarea } from './ui';
import EditBug from './editBug';
import Deletebug from './deleteBug';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export default function BugMain({ bug, setBug }) {
  // console.log('🚀 ~ file: index.jsx:14 ~ BugMain ~ bug:', bug);
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
          <span>
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <img
                    src={`/priority/${bug.priority.toLowerCase()}.svg`}
                    className="w-7 h-7 inline my-auto mr-2"
                  />
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="text-lg font-normal tracking-tighter bg-white text-black"
                >
                  {bug.priority.toLowerCase()}&nbsp;priority
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {bug.title}
          </span>
          <EditBug bug={bug} />
          <Deletebug bug={bug} setBug={setBug} />
        </div>
        <Textarea
          value={bug.description}
          readonly
          className="border-none mt-5 text-sm"
        />
      </header>
      <main className="mt-5">
        <div className="my-2">reporter</div>
        <span className="">
          <img
            src={`/profile/${bug.createdBy.slug}.svg`}
            className="w-7 h-7 inline"
          />
          <span className="ml-2">{bug.createdBy.name}</span>
        </span>
        {bug.project.isGithub && (
          <>
            <div className="mt-4 mb-2">base commit</div>
            <span className="">
              <span className="ml-2 text-gray-600 ">
                <a
                  href={`${bug.project.githubUrl}/commits/${bug.commits.open}`}
                  target="_blank"
                >
                  #&nbsp;{bug.commits.open}
                </a>
              </span>
            </span>
          </>
        )}
      </main>
    </>
  );
}
