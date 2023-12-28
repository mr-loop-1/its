import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Pencil2Icon, TrashIcon } from '@radix-ui/react-icons';
import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

export default function BugsList({ bugs }) {
  bugs = bugs.slice(0, 10);

  const bugg = [
    {
      id: 'ndh1i23',
      bugId: '123',
      title: 'not responding callback in menu',
      priority: 1,
      progress: 2,
      commits: {
        open: '7832gea12',
      },
      updatedAt: '7 min ago',
      assignedTo: {
        id: 'aushdkndwq211343',
        name: 'harsha',
        slug: '',
      },
    },
    {
      id: 'ndh1i23',
      bugId: '123',
      title: 'not responding callback in menu',
      priority: 1,
      progress: 2,
      commits: {
        open: '7832gea12',
      },
      updatedAt: '7 min ago',
      assignedTo: {
        id: 'aushdkndwq211343',
        name: 'harsha',
        slug: '',
      },
    },
  ];
  return (
    <div className="w-full">
      <Table>
        <TableCaption>recently updated bugs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead className="w-[100px]"></TableHead>
            <TableHead>title</TableHead>
            <TableHead>status</TableHead>
            <TableHead>assigned</TableHead>
            <TableHead>commit</TableHead>
            {/* <TableHead className="text-right">Amount</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {bugg.map((bug) => (
            <>
              <TableRow key={bug.id}>
                <TableCell className="font-medium">{bug.priority}</TableCell>
                <TableCell>{bug.title}</TableCell>
                <TableCell>{bug.title}</TableCell>
                <TableCell className="text-right">{bug.progress}</TableCell>
              </TableRow>
              <TableRow key={bug.id}>
                <TableCell colspan={2}>{bug.updatedAt}</TableCell>
              </TableRow>
            </>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
