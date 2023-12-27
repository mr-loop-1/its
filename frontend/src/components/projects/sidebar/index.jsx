import React from 'react';
import { useNavigate } from 'react-router-dom';
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

export default function ProjectSidebar({ projects }) {
  const form = useForm();

  // const formSchema = z.object({
  //   username: z.string().min(2, {
  //     message: 'Username must be at least 2 characters.',
  //   }),
  // });
  // const form = useForm({
  //   resolver: zodResolver(formSchema),
  //   defaultValues: {
  //     username: '',
  //   },
  // });

  const hello = [
    {
      id: 1,
      name: 'sda',
    },
    {
      id: 2,
      name: 'asde',
    },
  ];

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
  return (
    <div className="fixed left-16 top-0 w-56 lg:w-96 h-screen pt-0 pb-6 px-10 bg-[rgb(244,245,247)] overflow-x-hidden overflow-y-auto border-r border-solid border-r-[#dfe1e6]">
      <header
        className="flex items-center mt-8 mb-6"
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
          <ModalContent className="block box-border w-[70vw] h-[80vh]">
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
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="shadcn" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="summary"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Short Summary</FormLabel>
                        <FormControl>
                          <Textarea placeholder="summary" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormLabel>Github Info</FormLabel>
                  <FormField
                    control={form.control}
                    name="githubUrl"
                    render={({ field }) => (
                      <FormItem>
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
                      <FormItem>
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
                  <FormField
                    control={form.control}
                    name="priority"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Priority</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger className="w-[180px]" {...field}>
                              <SelectValue
                                placeholder="Select a fruit"
                                {...field}
                              />
                            </SelectTrigger>
                            <SelectContent {...field}>
                              <SelectGroup {...field}>
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
                  <FormField
                    control={form.control}
                    name="invite"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Add members</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="value" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Button type="button" onClick={addElement}>
                    Add
                  </Button>

                  <ul>
                    {form.watch('members') &&
                      form.watch('members').map((member) => {
                        return (
                          <li key={member}>
                            {member}
                            <Button
                              type="button"
                              onClick={removeElement.bind(null, member)}
                            >
                              Remove
                            </Button>
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
    </div>
  );
}
