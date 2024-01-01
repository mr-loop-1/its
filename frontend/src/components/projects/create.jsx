import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalTitle,
  ModalTrigger,
  ModalHeader,
} from './ui';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Card } from '@/components/ui/card';
import { Cross1Icon } from '@radix-ui/react-icons';
import { useSelector } from 'react-redux';
import { createProject } from 'api/projects';

export default function CreateProject({ refetch, toggleRefetch }) {
  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state.auth.userInfo);

  const formSchema = z.object({
    title: z
      .string()
      .min(3, {
        message: 'atlease 2 char',
      })
      .max(40, { message: 'atmost 40 chars' }),
    description: z.string().max(150, { message: 'atmost 150 chars' }),
    githubUrl: z.string().url({ message: 'valid url please' }).max(100),
    githubPAT: z.string().max(100),
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    shouldUnregister: true,
  });

  const onSubmit = async (inputs) => {
    try {
      const data = {
        title: inputs.title,
        description: inputs.description,
        github: {
          url: inputs.url,
          token: inputs.token,
        },
        admin: user.id,
        manager: user.id,
        members: [user.id],
        invites: form.getValues('members') || [],
      };

      await createProject(localStorage.getItem('token'), data);
      toggleRefetch(() => (refetch ? false : true));
      setOpen(() => false);
    } catch (err) {
      console.log(err);
    }
  };

  const addElement = () => {
    const currentValues = form.getValues('members') || [];
    const newVal = form.watch('invite');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newVal)) {
      form.setError('invite', { type: 'server', message: 'Invalid email' });
    } else if (currentValues.includes(newVal)) {
      form.setError('invite', { type: 'server', message: 'Duplicate email' });
    } else {
      form.setValue('members', [...currentValues, newVal]);
      form.setValue('invite', '');
    }
  };

  const removeElement = (member) => {
    const currentValues = form.getValues('members') || [];
    const newValues = currentValues.filter((val) => val !== member);
    form.setValue('members', newValues);
  };

  return (
    <div className="w-full">
      <Modal open={open} onOpenChange={setOpen}>
        <ModalTrigger asChild>
          <Button variant="default" className="w-full">
            Create Project
          </Button>
        </ModalTrigger>
        <Separator className="my-6 w-full" orientation="horizontal" />
        <ModalContent className="block box-border overflow-y-scroll w-[90%] md:max-w-2xl h-fit rounded-lg max-h-[90%]">
          <ModalHeader>
            <ModalTitle>Create a Project</ModalTitle>
            <ModalDescription>
              Provide the information and members
            </ModalDescription>
          </ModalHeader>
          <div className="">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="my-4">
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="title" {...field} />
                      </FormControl>
                      <FormMessage />
                      {form.formState.errors.titleExists && (
                        <p>Project Title should be unique</p>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="my-4">
                      <FormLabel>Short Summary</FormLabel>
                      <FormControl>
                        <Textarea placeholder="summary" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Card className="py-2 px-3">
                  <FormLabel>Github Repo</FormLabel>
                  <FormField
                    control={form.control}
                    name="githubUrl"
                    render={({ field }) => (
                      <FormItem className="my-4">
                        <FormLabel>Url</FormLabel>
                        <FormControl>
                          <Input placeholder="github url" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="githubPAT"
                    render={({ field }) => (
                      <FormItem className="my-4">
                        <FormLabel>Restricted Access Token</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="github restricted pat"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </Card>

                <FormField
                  control={form.control}
                  name="invite"
                  render={({ field }) => (
                    <FormItem className="my-4">
                      <FormLabel>Send invite by email</FormLabel>
                      <div className="flex justify-between">
                        <FormControl>
                          <Input
                            placeholder="email"
                            className="mr-2"
                            {...field}
                          />
                        </FormControl>
                        <Button type="button" onClick={addElement}>
                          Add
                        </Button>
                      </div>
                      <FormMessage />
                      {/* <span>
                        {form.formState.errors.invite &&
                          form.formState.errors.invite.message}
                      </span> */}
                    </FormItem>
                  )}
                />

                <ul className="my-4">
                  {form.watch('members') &&
                    form.watch('members').map((member) => {
                      return (
                        <li key={member}>
                          <div className="flex items-center text-xs py-1 px-2 bg-gray-200 w-fit rounded">
                            {member}
                            <Cross1Icon
                              onClick={removeElement.bind(null, member)}
                              className="ml-3 text-gray-950 hover:text-red-600 cursor-pointer"
                            />
                          </div>
                        </li>
                      );
                    })}
                </ul>

                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </div>
        </ModalContent>
      </Modal>
    </div>
  );
}
