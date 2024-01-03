import React, { useEffect, useState } from 'react';
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
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Card } from '@/components/ui/card';
import { Cross1Icon, Pencil2Icon, TrashIcon } from '@radix-ui/react-icons';
import { useSelector } from 'react-redux';
import { createProject, editProject } from 'api/projects';

export default function EditProject({ project, refetch, toggleRefetch }) {
  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state.auth.userInfo);

  const formSchema = z.object({
    title: z
      .string()
      .min(3, {
        message: 'atlease 2 char',
      })
      .max(40, { message: 'atmost 40 chars' }),
    // description: z.string().max(150, { message: 'atmost 150 chars' }),
    ...(project.isGithub && {
      githubUrl: z
        .string()
        // .url({ message: 'valid url please' })
        // .max(100)
        .regex(
          /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+$/,
          { message: 'valid github repo url' },
        )
        .optional(),
      githubPAT: z.string().max(100).optional(),
    }),
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    shouldUnregister: true,
  });

  const onSubmit = async (inputs) => {
    try {
      if (project.isGithub) {
        if (
          !(await checkGithub(
            inputs.githubUrl || project.github.url,
            inputs.githubPAT || project.github.token,
          ))
        ) {
          form.setError('githubPAT', {
            message: 'some problem in validating repo',
          });
          return;
        }
      }

      const data = {
        title: inputs.title,
        // description: inputs.description,
        github: {
          url: inputs.url,
          token: inputs.token,
        },
      };

      await editProject(localStorage.getItem('token'), data, project.id);
      toggleRefetch(() => (refetch ? false : true));
      setOpen(() => false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="ml-auto cursor-pointer">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button>
            <Pencil2Icon className="w-7 h-7" />
          </button>
        </DialogTrigger>
        <DialogContent className="block box-border overflow-scroll w-[90%] md:max-w-2xl h-fit rounded-lg max-h-[90%]">
          <DialogHeader>
            <DialogTitle>Edit the project</DialogTitle>
            <DialogDescription>don't break</DialogDescription>
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
                        <Input
                          placeholder="shadcn"
                          {...field}
                          defaultValue={project.title}
                        />
                      </FormControl>
                      <FormMessage />
                      {form.formState.errors.titleExists && (
                        <p>Project Title should be unique</p>
                      )}
                    </FormItem>
                  )}
                />
                {/* <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="my-4">
                      <FormLabel>Short Summary</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="summary"
                          {...field}
                          defaultValue={project.description}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}

                <Card className="py-2 px-3">
                  <FormLabel>Github Repo</FormLabel>
                  <FormField
                    control={form.control}
                    name="githubUrl"
                    render={({ field }) => (
                      <FormItem className="my-4">
                        <FormLabel>Url</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="github url"
                            {...field}
                            defaultValue={project.githubUrl}
                          />
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
                            defaultValue={project.githubPAT}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </Card>

                <Button type="submit">Edit</Button>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
