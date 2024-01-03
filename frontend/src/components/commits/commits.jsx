import React, { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from './ui';
import { Button } from '@/components/ui/button';

import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { sendInvite } from 'api/invites';
import { useSelector } from 'react-redux';
import {
  getCommits,
  getStoredCommits,
  makeManager,
  removeMember,
} from 'api/projects';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent, CardTitle } from '../ui/card';
export default function ProjectCommits({ project }) {
  const user = useSelector((state) => state.auth.userInfo);
  const [value, setValue] = React.useState('one');
  const [commits, setCommits] = useState([]);
  console.log('🚀 ~ file: commits.jsx:42 ~ ProjectCommits ~ commits:', commits);
  console.log('🚀 ~ file: commits.jsx:41 ~ ProjectCommits ~ value:', value);

  useEffect(() => {
    (async () => {
      try {
        const commits = await getStoredCommits(
          localStorage.getItem('token'),
          project.id,
        );
        setCommits(() => commits.data);
      } catch (err) {
        console.log('🚀 ~ file: commits.jsx:53 ~ err:', err);
      }
    })();
  }, [value]);

  return (
    <div className="w-full mt-5">
      <Accordion
        type="single"
        collapsible
        value={value}
        onValueChange={setValue}
      >
        <AccordionItem value="item-1" className="border-b-0">
          <AccordionTrigger className="bg-gray-100 rounded px-3">
            See commit stats
          </AccordionTrigger>
          <AccordionContent>
            {commits.length ? (
              <Carousel>
                <CarouselContent>
                  {commits.map((commit) => {
                    return (
                      <CarouselItem>
                        <Card>
                          <CardTitle>{commit.commitId}</CardTitle>
                          <CardContent>
                            open: {commit.bugs.open.length}
                          </CardContent>
                        </Card>
                      </CarouselItem>
                    );
                  })}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            ) : (
              <span>No commits to show</span>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
