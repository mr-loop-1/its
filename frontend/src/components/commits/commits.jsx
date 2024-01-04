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
import { Card, CardContent, CardDescription, CardTitle } from '../ui/card';
import { getFullDate } from '@/lib/utils';
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
              <Carousel className="mt-5 ml-12 mr-12">
                <CarouselContent>
                  {commits.map((commit) => {
                    return (
                      <CarouselItem className="basis-1/10">
                        <Card className="w-fit max-w-48 md:max-w-96  p-5">
                          <CardTitle className="text-center">
                            <a
                              href={`${project.githubUrl}/commit/${commit.commitId}`}
                              target="_blank"
                              className="text-blue-500"
                            >
                              {commit.commitId}
                            </a>
                          </CardTitle>
                          <CardDescription>
                            <div className="">
                              linked: {commit.bugs.open.length}
                            </div>
                            <div className="break-words">
                              timestamp: {getFullDate(commit.timestamp)}
                            </div>
                          </CardDescription>
                        </Card>
                      </CarouselItem>
                    );
                  })}
                </CarouselContent>
                <CarouselPrevious className="" />
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
