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
            <Button variant="outline">Edit Profile</Button>
          </ModalTrigger>
          <ModalContent className="max-w-96">
            <ModalHeader>
              <ModalTitle>Create a Project</ModalTitle>
              <ModalDescription>
                Provide the information and members
              </ModalDescription>
            </ModalHeader>
            <div className="">
              sad
              <form>
                <input defaultValue="test" {...form.register('example')} />
              </form>
              <Form {...form}>
                <form>
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="shadcn" {...field} />
                        </FormControl>
                        <FormDescription>
                          This is your public display name.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </div>
          </ModalContent>
        </Modal>
      </main>
      eqw
      <Form
        // control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input placeholder="shadcn" {...field} />
            </FormControl>
            <FormDescription>This is your public display name.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
