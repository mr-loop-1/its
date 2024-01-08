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
import { addStreamItem } from 'api/stream';

export default function Comment({ bugId, refetch, toggleRefetch }) {
  const [open, setOpen] = useState(false);

  const formSchema = z.object({
    comment: z.string(),
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    shouldUnregister: true,
  });
  const user = useSelector((state) => state.auth.userInfo);

  const onSubmit = async (inputs) => {
    console.log('🚀 ~ file: index.jsx:90 ~ onSubmit ~ inputs:', inputs);
    try {
      const data = {
        streamType: 'COMMENT',
        author: {
          id: user.id,
          name: user.name,
          slug: user.slug,
        },
        comment: inputs.comment,
        timestamp: new Date(),
      };

      await addStreamItem(localStorage.getItem('token'), data, bugId);
      toggleRefetch(() => (refetch ? false : true));
      form.setValue('comment', '');
      setOpen(() => false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full md:w-[60%]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem className="my-4">
                {/* <FormLabel>Title</FormLabel> */}
                <FormControl>
                  <Textarea {...field} className="" />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit">Add Comment</Button>
        </form>
      </Form>
    </div>
  );
}
