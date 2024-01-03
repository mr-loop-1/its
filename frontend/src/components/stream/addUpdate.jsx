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
import { getFullDate } from '@/lib/utils';

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
        className="ml-2 my-2 bg-lime-600 h-6 md:h-10"
      />
      {(streamItem.cat == 'ASSIGNED' && (
        <div className="my-5">
          <img
            src={`/profile/${streamItem.value.author.slug}.svg`}
            className="w-7 h-7 inline"
          />
          <span className="font-medium ml-2">
            {streamItem.value.author.name}
          </span>
          &nbsp; reassigned the bug from
          <img
            src={`/profile/${streamItem.value.prev.slug}.svg`}
            className="w-7 h-7 inline ml-2"
          />
          <span className="font-medium ml-2">{streamItem.value.prev.name}</span>
          &nbsp;to
          <img
            src={`/profile/${streamItem.value.now.slug}.svg`}
            className="w-7 h-7 inline ml-2"
          />
          <span className="font-medium ml-2">{streamItem.value.now.name}</span>
          <span className="ml-2 text-sm text-gray-600">
            at&nbsp;{getFullDate(streamItem.value?.timestamp)}
          </span>
        </div>
      )) ||
        (streamItem.cat == 'COMMENT' && (
          <div className="flex flex-col">
            <Card className="bg-zinc-100">
              <CardHeader className="px-4 py-4">
                <CardTitle>
                  <img
                    src={`/profile/${streamItem.value.author.slug}.svg`}
                    className="w-7 h-7 inline"
                  />
                  <span className="ml-2 font-medium">
                    {streamItem.value.author.name}
                  </span>
                  <span className="ml-2 text-sm font-normal text-gray-600">
                    at&nbsp;{getFullDate(streamItem.value?.timestamp)}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4">
                <Textarea
                  value={streamItem.value.comment}
                  readonly
                  className="resize-none bg-white"
                />
              </CardContent>
            </Card>
          </div>
        )) ||
        (streamItem.cat == 'PROGRESS' && (
          <div className="my-5">
            <img
              src={`/profile/${streamItem.value.author.slug}.svg`}
              className="w-8 h-8 inline"
            />
            <span className="font-medium ml-2">
              {streamItem.value.author.name}
            </span>
            &nbsp;changed status from&nbsp;
            <span
              className={
                'font-semibold px-2 py-1' +
                ' ' +
                streamItem.value.prev.color +
                ' ' +
                streamItem.value.prev.bgColor
              }
            >
              {streamItem.value.prev.title}
            </span>
            &nbsp; to&nbsp;
            <span
              className={
                'font-semibold px-2 py-1' +
                ' ' +
                streamItem.value.now.color +
                ' ' +
                streamItem.value.now.bgColor
              }
            >
              {streamItem.value.now.title}
            </span>
            <span className="ml-2 text-sm text-gray-600">
              at&nbsp;{getFullDate(streamItem.value?.timestamp)}
            </span>
          </div>
        ))}
    </div>
  );
}
