import React, { useState } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from './ui';
import { Button } from '@/components/ui/button';

import { Input } from '@/components/ui/input';

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
    </div>
  );
}
