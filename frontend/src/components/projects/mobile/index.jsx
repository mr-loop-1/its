import React, { useEffect, useState } from 'react';
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
import { useSelector } from 'react-redux';
import { createProject } from 'api/projects';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

export default function ProjectNavbarMobile({
  projects,
  refetch,
  toggleRefetch,
}) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

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
    // defaultValues: {
    //   username: '',
    // },
    shouldUnregister: true,
  });
  const user = useSelector((state) => state.auth.userInfo);

  const onSubmit = async (inputs) => {
    console.log('🚀 ~ file: index.jsx:90 ~ onSubmit ~ inputs:', inputs);
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
        invites: form.getValues('members'),
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
    console.log('🚀 ~ file: index.jsx:76 ~ addElement ~ newVal:', newVal);
    form.setValue('members', [...currentValues, newVal]);
  };

  const removeElement = (member) => {
    const currentValues = form.getValues('members') || [];
    const newValues = currentValues.filter((val) => val !== member);
    form.setValue('members', newValues);
  };

  // const navigate = useNavigate();

  // useEffect(() => {
  //   return () => {
  //     form.reset();
  //   };
  // });

  return (
    <div className="">
      <div className="md:hidden left-16 right-0 p-5">
        <Select></Select>
      </div>
      <div className="fixed left-16 top-0 w-56 lg:w-96 h-screen pt-0 pb-6 px-10 bg-[rgb(244,245,247)] overflow-x-hidden overflow-y-auto border-r border-solid border-r-[#dfe1e6]">
        <header
          className="flex items-center mt-8 mb-6 cursor-pointer"
          onClick={() => navigate('/projects')}
        >
          <img src="/rose.svg" className="w-8 md:w-12 lg:w-16" />
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
          <Modal open={open} onOpenChange={setOpen}>
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
                            <Textarea
                              // defaultValue="asddsa"
                              placeholder="summary"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
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
                              required
                            >
                              <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select Priority Level" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectItem value="LOW">Low</SelectItem>
                                  <SelectItem value="NORMAL">Medium</SelectItem>
                                  <SelectItem value="SEVERE">Severe</SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                      required
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
                            <FormLabel>Access Token</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="github pat"
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
                          <FormLabel>Invite members by email</FormLabel>
                          <div className="flex justify-between">
                            <FormControl>
                              <Input
                                placeholder="value"
                                className="mr-2"
                                {...field}
                              />
                            </FormControl>
                            <Button type="button" onClick={addElement}>
                              Add
                            </Button>
                          </div>
                          <FormMessage />
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
                    [isActive ? 'text-[#8b4ea8] bg-[#ebecf0]' : ''].join(' ')
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
                <Separator
                  className="w-[50%] mx-auto"
                  orientation="horizontal"
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
