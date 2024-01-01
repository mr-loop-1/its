import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getInvites } from 'api/invites';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function Home() {
  const user = useSelector((state) => state.auth.userInfo);
  const [refetch, toggleRefetch] = useState(false);
  const [invites, setInvites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(() => true);
    try {
      (async () => {
        const result = await getInvites(localStorage.getItem('token'));
        console.log('🚀 ~ file: home.jsx:23 ~ result:', result);
        setInvites(() => result.data);
        setIsLoading(() => false);
      })();
    } catch (err) {
      console.log('🚀 ~ file: home.jsx:25 ~ useEffect ~ err:', err);
    }
  }, [refetch]);

  const handleAcceptInvite = async () => {};

  return (
    <div className="ml-24 mt-8">
      <header className="">
        <span className="text-2xl font-bold leading-tight text-fuchsia-900">
          welcome
        </span>
        <div className="text-4xl font-bold leading-tight break-words">
          {user.name}
        </div>
      </header>

      <Table>
        <TableHeader>
          <TableHead>project</TableHead>
          <TableHead>sent by</TableHead>
          <TableHead></TableHead>
        </TableHeader>
        <TableBody>
          {invites.map((invite) => {
            return (
              <TableRow>
                <TableCell>{invite.projectId.title}</TableCell>
                <TableCell>{invite.invitedBy.name}</TableCell>
                <TableCell>
                  <span
                    className="underline hover:text-blue-800 cursor-pointer"
                    onClick={handleAcceptInvite}
                  >
                    Accept
                  </span>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
