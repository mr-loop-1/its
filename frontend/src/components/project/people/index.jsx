import React, { useState } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from './../ui';
import { Button } from '@/components/ui/button';

import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { sendInvite } from 'api/invites';
import { useSelector } from 'react-redux';
import { makeManager, removeMember } from 'api/projects';

export default function ProjectPeople({ project, refetch, toggleRefetch }) {
  const [invite, setInvite] = useState('');
  const user = useSelector((state) => state.auth.userInfo);

  const handleInvite = async () => {
    try {
      await sendInvite(localStorage.getItem('token'), project.id, user.id);
      //toast
      setInvite(() => '');
    } catch (err) {
      console.log('🚀 ~ file: index.jsx:28 ~ handleInvite ~ err:', err);
    }
  };

  const handleManager = async (memberId) => {
    try {
      const data = {
        memberId: memberId,
      };
      await makeManager(localStorage.getItem('token'), project.id, data);
      toggleRefetch(() => (refetch ? false : true));
    } catch (err) {
      console.log('🚀 ~ file: index.jsx:38 ~ handleManager ~ err:', err);
    }
  };

  const handleRemove = async (memberId) => {
    try {
      await removeMember(localStorage.getItem('token'), project.id, memberId);
      toggleRefetch(() => (refetch ? false : true));
    } catch (err) {
      console.log('🚀 ~ file: index.jsx:47 ~ handleRemove ~ err:', err);
    }
  };

  return (
    <div className="w-full mt-5">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1" className=" border-b-0">
          <AccordionTrigger>Manage Members</AccordionTrigger>
          <AccordionContent>
            <div className="flex items-center justify-between">
              <Input
                type="email"
                className="my-1 ml-1"
                placeholder="hello@gmail.com"
                value={invite}
                onChange={(e) => setInvite(e.target.value)}
              />
              <Button className="ml-2 mr-1 my-1" onClick={handleInvite}>
                Invite
              </Button>
            </div>
            <div>
              <ul>
                {project.members.map((member) => {
                  return (
                    <>
                      <li className="my-3 ">
                        <img
                          src={`/profile/${member.slug}.svg`}
                          className="w-7 inline"
                        />
                        <span className="ml-2 text-xl">{member.name}</span>
                        {member.id == project.admin.id && (
                          <span className="ml-2 px-1 py-1 bg-yellow-600 text-white box-border">
                            Admin
                          </span>
                        )}
                        {member.id == project.manager.id && (
                          <span className="ml-2 px-1 py-1 bg-lime-600 text-white box-border">
                            Manager
                          </span>
                        )}
                        {member.id != project.manager.id && (
                          <span
                            className="ml-2 hover:underline text-lime-800  cursor-pointer"
                            onClick={() => handleManager(member.id)}
                          >
                            Make Manager
                          </span>
                        )}
                        {member.id != project.manager.id &&
                          member.id != project.admin.id && (
                            <span
                              className="ml-2 hover:underline text-red-800  cursor-pointer"
                              onClick={() => handleRemove(member.id)}
                            >
                              Remove
                            </span>
                          )}
                      </li>
                    </>
                  );
                })}
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
