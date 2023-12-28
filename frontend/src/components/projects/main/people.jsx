import React, { useState } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from './ui';
import { Button } from '@/components/ui/button';

import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function ProjectPeople({ project }) {
  const [invite, setInvite] = useState('');
  const sendInvite = () => {
    setInvite(() => '');
  };

  const members = ['akjsd', 'asdhjknwqe', 'sadhujn', 'hasnd qwe', 'asdhjbkn'];

  return (
    <div className="w-full mt-5">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1" className="w-80 border-b-0">
          <AccordionTrigger>Add Member</AccordionTrigger>
          <AccordionContent>
            <div className="flex items-center justify-between">
              <Input
                type="email"
                className="my-1 ml-1"
                placeholder="hello@gmail.com"
                value={invite}
                onChange={(e) => setInvite(e.target.value)}
              />
              <Button className="ml-2 mr-1 my-1" onClick={sendInvite}>
                Invite
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div>
        <ul>
          {project.members.map((member) => {
            return (
              <>
                <li className="my-3 ">
                  <img src="/profile/001-man.svg" className="w-7 inline" />
                  <span>{member.name}</span>
                  {member.id == project.admin.id && (
                    <span className="bg-yellow-600 text-white box-border">
                      Admin
                    </span>
                  )}
                  {member.id == project.manager.id && (
                    <span className="bg-lime-600 text-white box-border">
                      Manager
                    </span>
                  )}
                </li>
                <li className="my-3 ">
                  <img src="/profile/001-man.svg" className="w-7 inline" />
                  <span>{member.name}</span>
                  {member.id == project.admin.id && (
                    <span className="bg-yellow-600 text-white box-border">
                      Admin
                    </span>
                  )}
                  {member.id == project.manager.id && (
                    <span className="bg-lime-600 text-white box-border">
                      Manager
                    </span>
                  )}
                </li>
              </>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

const RemoveMember = ({ members, removeHandler }) => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>Remove</DropdownMenuTrigger>
        <DropdownMenuContent></DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
