import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { acceptInvite, getInvites } from 'api/invites';
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

  const handleAcceptInvite = async (inviteId) => {
    try {
      (async () => {
        await acceptInvite(localStorage.getItem('token'), inviteId);
        toggleRefetch(() => (refetch ? false : true));
      })();
    } catch (err) {
      console.log('🚀 ~ file: home.jsx:39 ~ handleAcceptInvite ~ err:', err);
    }
  };

  return (
    <div className="pl-24 pt-8 flex w-full h-full md:max-h-[90%] overflow-y-scroll box-border">
      <Card className="w-[95%] md:w-96 mx-auto my-auto">
        <CardHeader>
          <span className="text-2xl font-bold leading-tight text-fuchsia-900">
            welcome
          </span>
          <div className="text-4xl font-bold leading-tight break-words">
            {user.name}
          </div>
        </CardHeader>
        <CardHeader>
          <CardTitle>here are your project invites</CardTitle>
        </CardHeader>
        <CardContent>
          {invites.length ? (
            invites.map((invite) => {
              return (
                <div>
                  <div className="break-words text-2xl">
                    {invite.projectId.title}
                    <span
                      className="hover:underline ml-2 text-sm text-green-600 cursor-pointer"
                      onClick={handleAcceptInvite(() => invite.id)}
                    >
                      Accept
                    </span>
                  </div>
                  <div className="mt-2">
                    <img
                      src={`/profile/${invite.invitedBy.slug}.svg`}
                      className="h-7 w-7 inline "
                    />
                    <span className="ml-2">{invite.invitedBy.name}</span>
                  </div>
                  <Separator
                    orientation="horizontal"
                    className="mx-auto mt-3 w-[80%]"
                  />
                </div>
              );
            })
          ) : (
            <div className="">NO INVITES TO SHOW</div>
          )}

          {/* <Table>
            <TableHeader>
              <TableHead>project</TableHead>
              <TableHead>
                <span className="mx-auto text-center">sent by</span>
              </TableHead>
              <TableHead></TableHead>
            </TableHeader>
            <TableBody>
              {invites.map((invite) => {
                return (
                  <TableRow>
                    <TableCell className="break-words max-h-">
                      {invite.projectId.title}
                      aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                    </TableCell>
                    <TableCell>
                      <img
                        src={`/profile/${invite.invitedBy.slug}.svg`}
                        className="h-10 w-10 inline"
                      />
                      {invite.invitedBy.name}
                    </TableCell>
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
              {invites.map((invite) => {
                return (
                  <TableRow>
                    <TableCell>
                      {invite.projectId.title}
                      aaaaaaaaaaaaa
                    </TableCell>
                    <TableCell>
                      <img
                        src={`/profile/${invite.invitedBy.slug}.svg`}
                        className="h-10 w-10 inline"
                      />
                      {invite.invitedBy.name}
                    </TableCell>
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
          </Table> */}
        </CardContent>
      </Card>
    </div>
  );
}
