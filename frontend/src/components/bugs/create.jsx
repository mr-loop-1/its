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
import { createProject, getCommits } from 'api/projects';
import { createBug } from 'api/bugs';

export default function CreateBug({ project }) {
  // console.log('🚀 ~ file: create.jsx:56 ~ CreateBug ~ project:', project);
  const [open, setOpen] = useState(false);
  const [commits, setCommits] = useState(null);
  const [loading, setLoading] = useState(false);

  const formSchema = z.object({
    title: z
      .string()
      .min(3, {
        message: 'atlease 2 char',
      })
      .max(40, { message: 'atmost 40 chars' }),
    description: z.string().max(150, { message: 'atmost 150 chars' }),
    priority: z.string(),
    ...(project.isGithub && { commit: z.string() }),
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    shouldUnregister: true,
  });
  const user = useSelector((state) => state.auth.userInfo);

  useEffect(() => {
    try {
      (async () => {
        if (project.isGithub) {
          // console.log(
          //   '🚀 ~ file: create.jsx:82 ~ project.isGithub:',
          //   project.isGithub,
          // );
          const result = await getCommits(
            localStorage.getItem('token'),
            project.id,
          );
          setCommits(() => result.data);
        }
        setLoading(() => true);
      })();
    } catch (err) {
      // console.log('🚀 ~ file: create.jsx:81 ~ useEffect ~ err:', err);
    }
  }, [open]);

  // console.log('commits', commits);

  const onSubmit = async (inputs) => {
    // console.log('🚀 ~ file: index.jsx:90 ~ onSubmit ~ inputs:', inputs);
    try {
      const data = {
        title: inputs.title,
        description: inputs.description,
        admin: user.id,
        priority: inputs.priority,
        ...(project.isGithub && {
          commit: {
            id: commits[inputs.commit].commitId,
            timestamp: commits[inputs.commit].timestamp,
          },
        }),
      };
      await createBug(localStorage.getItem('token'), data, project.id);
      setOpen(() => false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="default"
            className="w-40 rounded-lg mb-4 bg-[#1a52a7]"
          >
            Create Bug
          </Button>
        </DialogTrigger>
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
                            {/* <SelectGroup> */}
                            <SelectItem
                              value="LOW"
                              className="bg-[#54BBFF] hover:bg-[#54BBFF] text-black"
                            >
                              Low
                            </SelectItem>
                            <SelectItem
                              value="NORMAL"
                              className="bg-[#f2a93a] hover:bg-[#f2a93a] text-black"
                            >
                              Normal
                            </SelectItem>
                            <SelectItem
                              value="SEVERE"
                              className="bg-[#E0230D] hover:bg-[#E0230D] text-black"
                            >
                              Severe
                            </SelectItem>
                            {/* </SelectGroup>   */}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                  required
                />
                {project.isGithub && loading && commits.length ? (
                  <FormField
                    control={form.control}
                    name="commit"
                    render={({ field }) => (
                      <FormItem className="my-4">
                        <FormLabel>Reporting Commit</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                            required
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue
                                defaultValue={0}
                                placeholder={commits[0].commitId}
                              />
                            </SelectTrigger>
                            <SelectContent>
                              {/* <SelectGroup> */}
                              {commits.map((commit, idx) => {
                                // console.log(
                                //   '🚀 ~ file: create.jsx:242 ~ {commits.map ~ idx:',
                                //   idx + 1,
                                // );
                                return (
                                  <SelectItem value={idx.toString()}>
                                    #{commit.commitId}&nbsp;({commit.branchName}
                                    )
                                  </SelectItem>
                                );
                              })}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                    required
                  />
                ) : (
                  <FormLabel>No commits in the project yet</FormLabel>
                )}

                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
