import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { config } from '@/config/settingStore';
import { getFullDate } from '@/lib/utils';
import { Pencil2Icon, TrashIcon } from '@radix-ui/react-icons';
import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import CreateBug from '../bugs/create';

function StatusCell({ progress }) {
  return (
    <TableCell className="text-right font-bold ">
      {(progress == 'OPEN' && (
        <span className="bg-slate-400 text-white px-2">{progress}</span>
      )) ||
        (progress == 'TRIAGE' && (
          <span className="bg-red-300 text-red-900 px-2">{progress}</span>
        )) ||
        (progress == 'IN_PROGRESS' && (
          <span className="bg-blue-300 text-blue-900 px-2">IN PROGRESS</span>
        )) ||
        (progress == 'REVIEW_REQUIRED' && (
          <span className="bg-yellow-300 text-orange-900 px-2">
            REVIEW REQUIRED
          </span>
        )) ||
        (progress == 'CLOSED' && (
          <span className="bg-lime-300 text-lime-900 px-2">{progress}</span>
        ))}
    </TableCell>
  );
}

export default function BugsList({ bugs, project, refetch, toggleRefetch }) {
  const navigate = useNavigate();

  return (
    <div className="w-full px-2 pb-3 pt-5 mt-10 bg-gray-100 rounded">
      <CreateBug
        project={project}
        refetch={refetch}
        toggleRefetch={toggleRefetch}
      />
      <Table>
        <TableBody>
          {bugs.length ? (
            bugs.map((bug) => (
              <>
                <TableRow
                  key={bug.id}
                  onClick={() => navigate(`/bugs/${bug.id}`)}
                  className="cursor-pointer border-x-2 bg-white rounded-lg"
                >
                  <TableCell className="w-10 mx-10 ">
                    <img
                      src={`/priority/${bug.priority.toLowerCase()}.svg`}
                      className="w-10 h-10"
                    />
                  </TableCell>
                  <TableCell className="w-fit break-words">
                    <span className="hover:underline">{bug.title}</span>
                    <span className="text-xs text-lime-700 ml-2 font-bold hidden md:inline">
                      #{bug.commits.open}
                    </span>
                    <span className="ml-5 text-xs text-gray-400">
                      {getFullDate(bug.updatedAt)}
                    </span>
                  </TableCell>
                  <StatusCell progress={bug.progress} />
                  <TableCell className="font-medium w-10 mx-1">
                    <img
                      src={`/profile/${bug.assignedTo.slug}.svg`}
                      className="w-10 h-10"
                    />
                  </TableCell>
                </TableRow>
                {/* <TableRow key={bug.id}>
                  <TableCell colspan={2}>{bug.updatedAt}</TableCell>
                </TableRow> */}
              </>
            ))
          ) : (
            <span className="">No bugs to show</span>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
