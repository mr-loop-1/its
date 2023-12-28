import { ReloadIcon } from '@radix-ui/react-icons';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function Invites() {
  const [invites, setInvites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await axios.get('http://localhost:5000/users/invites', {
          headers: { Authorization: `Bearer:${localStorage.getItem('token')}` },
        });
        console.log('🚀 ~ file: index.jsx:20 ~ data.data:', data.data);
        setInvites(() => data.data);
        setIsLoading(() => false);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <>
      <div className="fixed right-0 left-72 lg:left-[448px] mt-8 mx-8 pr-10 lg:mx-16 overflow-hidden ">
        {isLoading ? (
          <ReloadIcon className=" h-40 w-40 animate-spin" />
        ) : (
          <div className="w-full flex flex-col">
            {invites.map((invite) => {
              return (
                <li>
                  {invite.projectId.title} || {invite.invitedBy.name}
                </li>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
