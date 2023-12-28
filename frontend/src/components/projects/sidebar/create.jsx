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

export default function CreateProject({ projects }) {
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
        invites: form.getValues('members') || [],
      };

      await createProject(localStorage.getItem('token'), data);
      setOpen(false);
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

  return (
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
  );
}
