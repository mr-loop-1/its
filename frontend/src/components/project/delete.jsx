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
import { createProject, deleteProject, editProject } from 'api/projects';
import { useNavigate } from 'react-router-dom';

export default function DeleteProject({ project, setProject }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      setOpen(() => false);
      setProject(() => null);
      setTimeout(() => {
        deleteProject(localStorage.getItem('token'), project.id);
        navigate('/projects');
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="ml-5 text-red-700 cursor-pointer">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button>
            <TrashIcon className="w-7 h-7" />
          </button>
        </DialogTrigger>
        <DialogContent className="block box-border overflow-scroll w-[90%] md:max-w-2xl h-fit rounded-lg max-h-[90%]">
          <DialogHeader>
            <DialogTitle className="mb-4">
              Please confirm before deleting
            </DialogTitle>
          </DialogHeader>
          <div className="">
            <Button
              type="submit"
              onClick={handleDelete}
              className="w-full bg-red-600 text-white"
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
