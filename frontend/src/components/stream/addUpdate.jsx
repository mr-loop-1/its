import React from 'react';
import { Textarea } from '../ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '../ui/separator';

function StatusCell({ progress }) {
  return (
    <span className="text-right font-bold ">
      {(progress == 'OPEN' && (
        <span className="bg-slate-400 text-white px-2">{progress}</span>
      )) ||
        (progress == 'TRIAGE' && (
          <span className="bg-red-300 text-red-900 px-2">{progress}</span>
        )) ||
        (progress == 'IN_PROGRESS' && (
          <span className="bg-blue-300 text-blue-900 px-2">IN PROGRESS</span>
        )) ||
        (progress == 'REVIEW_REQUIRED' && (
          <span className="bg-yellow-300 text-orange-900 px-2">
            REVIEW REQUIRED
          </span>
        )) ||
        (progress == 'CLOSED' && (
          <span className="bg-lime-300 text-lime-900 px-2">{progress}</span>
        ))}
    </span>
  );
}

export default function StreamItem({ streamItem }) {
  return (
    <div>
      <Separator
        orientation="vertical"
        className="ml-2 bg-lime-600 h-6 md:h-10"
      />
      {(streamItem.cat == 'ASSIGNED' && (
        <div className="my-5">
          <img
            src={`/profile/${streamItem.value.author.slug}.svg`}
            className="w-8 h-8 inline"
          />
          &nbsp;
          {streamItem.value.author.name} reassigned the bug from&nbsp;
          <img
            src={`/profile/${streamItem.value.prev.slug}.svg`}
            className="w-8 h-8 inline"
          />
          &nbsp;
          {streamItem.value.prev.name} to&nbsp;
          <img
            src={`/profile/${streamItem.value.now.slug}.svg`}
            className="w-8 h-8 inline"
          />
          &nbsp;
          {streamItem.value.now.name}
        </div>
      )) ||
        (streamItem.cat == 'COMMENT' && (
          <div className="flex flex-col">
            <Card className="">
              <CardHeader className="px-4 py-4">
                <CardTitle>
                  <img
                    src={`/profile/${streamItem.value.author.slug}.svg`}
                    className="w-8 h-8 inline"
                  />
                  {streamItem.value.author.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4">
                <Textarea
                  value={streamItem.value.comment}
                  readonly
                  className="resize-none"
                />
              </CardContent>
            </Card>
          </div>
        )) ||
        (streamItem.cat == 'PROGRESS' && (
          <span>
            <img
              src={`/profile/${streamItem.value.author.slug}.svg`}
              className="w-8 h-8 inline"
            />
            {streamItem.value.author.name} changed status of from
            <StatusCell progress={streamItem.value.prev} /> to
            <StatusCell progress={streamItem.value.now} />
          </span>
        ))}
    </div>
  );
}
