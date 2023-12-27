import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalTitle,
  ModalTrigger,
  ModalHeader,
} from '../modal';
import { Button } from '../modal/button';
import {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
} from '../modal/form';
import { Label } from '../modal/label';
import { Input } from '../modal/input';
import {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
} from '../modal/select';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Textarea } from '../modal/textarea';
import { Command } from '../modal/command';
import { Separator } from '@/components/ui/separator';
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from './../modal/card';
import { Cross1Icon } from '@radix-ui/react-icons';

export default function ProjectSidebar({ projects }) {
  // console.log(
  //   '🚀 ~ file: index.jsx:45 ~ ProjectSidebar ~ projects:',
  //   typeof projects[0],
  //   Object.keys(projects[0]),
  //   projects,
  // );
  // const form = useForm();

  const formSchema = z.object({
    title: z.string().min(2, {
      message: 'Username must be at least 2 characters.',
    }),
    // members: z.array(z.string().email('All invitations must be email')),
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
    },
    shouldUnregister: true,
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  const addElement = () => {
    const currentValues = form.getValues('members') || [];
    const newVal = form.watch('invite');
    console.log('🚀 ~ file: index.jsx:76 ~ addElement ~ newVal:', newVal);
    form.setValue('members', [...currentValues, newVal]);
  };

  const removeElement = (member) => {
    const currentValues = form.getValues('members') || [];
    const newValues = currentValues.filter((val) => val !== member);
    form.setValue('members', newValues);
  };

  const navigate = useNavigate();

  // useEffect(() => {
  //   return () => {
  //     form.reset();
  //   };
  // });

  return (
    <div className="fixed left-16 top-0 w-56 lg:w-96 h-screen pt-0 pb-6 px-10 bg-[rgb(244,245,247)] overflow-x-hidden overflow-y-auto border-r border-solid border-r-[#dfe1e6]">
      <header
        className="flex items-center mt-8 mb-6 cursor-pointer"
        onClick={() => navigate('/projects')}
      >
        <img src="/proj.svg" className="w-8 md:w-12 lg:w-16" />
        <span className="ml-2 align-top">
          <span className="text-2xl font-semibold tracking-tight">
            {' '}
            all projects
          </span>
          <br />
          <span className="font-mono tracking-tight">active</span>
        </span>
      </header>
      <main>
        <Modal>
          <ModalTrigger asChild>
            <Button variant="default" className="w-full">
              Create Project
            </Button>
          </ModalTrigger>
          <Separator className="my-6 w-full" orientation="horizontal" />
          <ModalContent className="block box-border overflow-scroll w-[70vw] h-[80vh]">
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
                          <Input placeholder="shadcn" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="summary"
                    render={({ field }) => (
                      <FormItem className="my-4">
                        <FormLabel>Short Summary</FormLabel>
                        <FormControl>
                          <Textarea placeholder="summary" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="priority"
                    render={({ field }) => (
                      <FormItem className="my-4">
                        <FormLabel>Priority</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Select a fruit" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="apple">Apple</SelectItem>
                                <SelectItem value="banana">Banana</SelectItem>
                                <SelectItem value="blueberry">
                                  Blueberry
                                </SelectItem>
                                <SelectItem value="grapes">Grapes</SelectItem>
                                <SelectItem value="pineapple">
                                  Pineapple
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                    required
                  />

                  <Card className="py-2 px-3">
                    <FormLabel>Github Info</FormLabel>
                    <FormField
                      control={form.control}
                      name="githubUrl"
                      render={({ field }) => (
                        <FormItem className="my-4">
                          <FormLabel>repo url</FormLabel>
                          <FormControl>
                            <Input
                              type="url"
                              placeholder="github url"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="githubPat"
                      render={({ field }) => (
                        <FormItem className="my-4">
                          <FormLabel>public access token</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="github pat"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </Card>

                  <FormField
                    control={form.control}
                    name="invite"
                    render={({ field }) => (
                      <FormItem className="my-4">
                        <FormLabel>Add members</FormLabel>
                        <div className="flex justify-between">
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="value"
                              className="mr-2"
                              name="members"
                              {...field}
                            />
                          </FormControl>
                          <Button type="button" onClick={addElement}>
                            Add
                          </Button>
                        </div>
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
                              {/* <Button
                                type="button"
                                className="p-0"
                                variant="destructive"
                                
                              > */}
                              <Cross1Icon
                                onClick={removeElement.bind(null, member)}
                                className="ml-3 text-gray-950 hover:text-red-600 cursor-pointer"
                              />
                              {/* </Button> */}
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
      </main>
      {/* <ul>
        {projects.map((project) => {
          return (
            <li key={project.project.id}>
              <NavLink
                to={`/projects/${project.project.id}`}
                className={({ isActive }) =>
                  [isActive ? 'text-[#0052cc] bg-[#ebecf0]' : ''].join(' ')
                }
              >
                <div className="py-4 px-4 flex flex-col align-middle cursor-pointer bg-inherit rounded-md">
                  <div className="block text-xl font-normal tracking-tight">
                    {project.project.title}
                  </div>
                  <div className="flex">
                    <img src="/role/admin.svg" className="w-5" />
                    <span className="text-sm ml-2">admin</span>
                  </div>
                </div>
              </NavLink>
            </li>
          );
        })}
      </ul> */}

      <ul>
        {projects.map((project) => {
          return (
            <li key={project.project.id}>
              <NavLink
                to={`/projects/${project.project.id}`}
                className={({ isActive }) =>
                  [isActive ? 'text-[#0052cc] bg-[#ebecf0]' : ''].join(' ')
                }
              >
                {/* <Card className="py-2 px-4 cursor-pointer rounded-none bg-inherit"> */}
                <div className="py-4 px-4 flex flex-col align-middle cursor-pointer bg-inherit rounded-md">
                  <div className="block text-xl font-normal tracking-tight">
                    {project.project.title}
                  </div>
                  <div className="flex">
                    <img src="/role/admin.svg" className="w-5" />
                    <span className="text-sm ml-2">admin</span>
                  </div>
                </div>
                {/* </Card> */}
              </NavLink>
              <Separator className="w-[50%] mx-auto" orientation="horizontal" />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
