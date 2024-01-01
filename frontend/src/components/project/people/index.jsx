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
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';

export default function ProjectPeople({ project, refetch, toggleRefetch }) {
  const user = useSelector((state) => state.auth.userInfo);

  const userStatus =
    project.admin.id == user.id
      ? 'ADMIN'
      : project.manager.id == user.id
      ? 'MANAGER'
      : 'MEMBER';

  const formSchema = z.object({ invite: z.string().email() });
  const form = useForm({
    resolver: zodResolver(formSchema),
    shouldUnregister: true,
  });

  const handleInvite = async (inputs) => {
    console.log('🚀 ~ file: index.jsx:43 ~ handleInvite ~ inputs:', inputs);
    try {
      if (
        project.members.map((member) => member.email).includes(inputs.invite)
      ) {
        form.setError('invite', { type: 'server', message: 'Duplicate email' });
      } else {
        const data = {
          invitedEmail: inputs.invite,
        };
        await sendInvite(localStorage.getItem('token'), data, project.id);
        form.setValue('invite', '');
      }
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
        <AccordionItem value="item-1" className="border-b-0">
          <AccordionTrigger className="bg-gray-100 rounded px-3">
            {userStatus != 'MEMBER' ? 'Manage Members' : 'See Members'}
          </AccordionTrigger>
          <AccordionContent>
            <div className="">
              {userStatus != 'MEMBER' && (
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(handleInvite)}
                    className="flex items-center mt-4"
                  >
                    <FormField
                      control={form.control}
                      name="invite"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button className="ml-2 mr-1 my-1" type="submit">
                      Invite
                    </Button>
                  </form>
                </Form>
              )}
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

                        {member.id != project.manager.id &&
                          !['MEMBER', 'MANAGER'].includes(userStatus) && (
                            <span
                              className="ml-2 hover:underline text-lime-800  cursor-pointer"
                              onClick={() => handleManager(member.id)}
                            >
                              Make Manager
                            </span>
                          )}
                        {member.id != project.manager.id &&
                          member.id != project.admin.id &&
                          userStatus != 'MEMBER' && (
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
