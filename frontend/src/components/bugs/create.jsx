import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogHeader,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
} from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
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
} from '@/components/ui/select';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Cross1Icon } from '@radix-ui/react-icons';
import { useSelector } from 'react-redux';
import { createProject } from 'api/projects';
import { createBug } from 'api/bugs';

export default function CreateBug({ project }) {
  console.log('🚀 ~ file: create.jsx:56 ~ CreateBug ~ project:', project);
  const [open, setOpen] = useState(false);

  const formSchema = z.object({
    title: z
      .string()
      .min(3, {
        message: 'atlease 2 char',
      })
      .max(40, { message: 'atmost 40 chars' }),
    description: z.string().max(150, { message: 'atmost 150 chars' }),
    priority: z.string(),
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
        admin: user.id,
        priority: inputs.priority,
      };

      await createBug(localStorage.getItem('token'), data, project.id);
      setOpen(() => false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="w-full">
          Create Project
        </Button>
      </DialogTrigger>
      <Separator className="my-6 w-full" orientation="horizontal" />
      <DialogContent className="block box-border w-[70vw] h-fit">
        <DialogHeader>
          <DialogTitle>Create new Bug</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
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
                    <FormLabel>Description (optional)</FormLabel>
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
                            <SelectItem value="NORMAL">Normal</SelectItem>
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

              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
